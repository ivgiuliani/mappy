import piexif
import io

from PIL import Image
from datetime import datetime


def raw_exif(path, with_thumbnail=False):
    raw = piexif.load(path)
    if not with_thumbnail:
        raw.pop("thumbnail")

    # Pointless tags, we're better off without this
    if piexif.ExifIFD.MakerNote in raw.get("Exif", {}):
        raw.get("Exif").pop(piexif.ExifIFD.MakerNote)
    if "Interop" in raw:
        raw.pop("Interop")

    return raw


def sanitise_datetime(orig_dt):
    # EXIF format is weird and likes colons everywhere as it's usually something
    # like "2018:10:18 10:01:53" or "2018:10:18
    if len(orig_dt) <= 10:
        return datetime.\
            strptime(orig_dt, "%Y:%m:%d").strftime("%Y-%m-%d")
    else:
        return datetime.\
            strptime(orig_dt, "%Y:%m:%d %H:%M:%S").strftime("%Y-%m-%d %H:%M:%S")


def processed_exif(path, with_thumbnail=False):
    """Return a "processed" dictionary of exif tags.

    This will return a dictionary of exif tags converted to strings rather than
    their raw value."""
    r = raw_exif(path, with_thumbnail=with_thumbnail)

    data_d = {
        "Image": {},
        "Exif": {},
        "GPS": {},
    }

    for tag_id, value in r.get("0th", {}).items():
        tag_name = piexif.TAGS["Image"][tag_id]["name"]
        if "Date" in tag_name:
            value = sanitise_datetime(value)
        data_d["Image"][tag_name] = value

    for tag_id, value in r.get("1st", {}).items():
        tag_name = piexif.TAGS["Image"][tag_id]["name"]
        if "Date" in tag_name:
            value = sanitise_datetime(value)
        data_d["Image"][tag_name] = value

    for tag_id, value in r.get("Exif", {}).items():
        tag_name = piexif.TAGS["Exif"][tag_id]["name"]
        if "Date" in tag_name:
            value = sanitise_datetime(value)
        data_d["Exif"][tag_name] = value

    for tag_id, value in r.get("GPS", {}).items():
        tag_name = piexif.TAGS["GPS"][tag_id]["name"]
        data_d["GPS"][tag_name] = value

    if with_thumbnail:
        data_d["thumbnail"] = r.get("thumbnail")

    return data_d


def geolocation(path):
    """Provides geolocation data for the given image if available.

    Latitude and longitude are returned in decimal degrees."""
    exif = raw_exif(path)
    if not exif or not exif.get("GPS"):
        return None

    gps = exif["GPS"]
    gps_lat = gps[piexif.GPSIFD.GPSLatitude]
    gps_lon = gps[piexif.GPSIFD.GPSLongitude]
    gps_lat_ref = gps[piexif.GPSIFD.GPSLatitudeRef]
    gps_lon_ref = gps[piexif.GPSIFD.GPSLongitudeRef]
    gps_dop = gps.get(piexif.GPSIFD.GPSDOP, None)

    is_north = gps_lat_ref in ["N", "n"]
    is_south = gps_lat_ref in ["S", "s"]
    is_west = gps_lon_ref in ["W", "w"]
    is_east = gps_lon_ref in ["E", "e"]

    # EXIF stores GPS coords as rational64u which is a list of six unsigned
    # whole numbers in the following order:
    #
    # [
    #    degreesNumerator, degreesDenominator,
    #    minutesNumerator, minutesDenominator,
    #    secondsNumerator, secondsDenominator
    # ]
    #
    # To convert to degrees we must first convert the individual items (degrees,
    # minutes and seconds to their rationale representation):
    gps_degree, gps_minutes, gps_seconds = 0, 1, 2
    rational_lat = (
        gps_lat[gps_degree][0] / (1.0 * gps_lat[gps_degree][1]),
        gps_lat[gps_minutes][0] / (1.0 * gps_lat[gps_minutes][1]),
        gps_lat[gps_seconds][0] / (1.0 * gps_lat[gps_seconds][1]),
    )
    rational_lon = (
        gps_lon[gps_degree][0] / (1.0 * gps_lon[gps_degree][1]),
        gps_lon[gps_minutes][0] / (1.0 * gps_lon[gps_minutes][1]),
        gps_lon[gps_seconds][0] / (1.0 * gps_lon[gps_seconds][1]),
    )

    # Then we can convert the rational value to the corresponding decimal by
    # doing the equivalent of Degrees + Minutes/60 + Seconds/3600:
    latitude = (rational_lat[gps_degree] +
                rational_lat[gps_minutes] / 60 +
                rational_lat[gps_seconds] / 3600)
    longitude = (rational_lon[gps_degree] +
                 rational_lon[gps_minutes] / 60 +
                 rational_lon[gps_seconds] / 3600)

    # The direction reference influences the sign
    latitude = 1.0 * latitude if is_north else -1.0 * latitude
    longitude = 1.0 * longitude if is_east else -1.0 * longitude

    precision = 0
    if gps_dop:
        precision = gps_dop[0] / gps_dop[1]

    return {
        "latitude": latitude,
        "longitude": longitude,
        "precision": precision,
    }


def gen_thumbnail(path, size=(250, 250)):
    im = Image.open(path)

    # Honour (EXIF) rotation metadata on thumbnails if present
    if hasattr(im, '_getexif'):  # _getexif is only available for JPG
        exif = im._getexif()
        if exif is not None:
            orientation = dict(exif.items()).get(piexif.ImageIFD.Orientation, None)

            rotation = {
                3: Image.ROTATE_180,
                6: Image.ROTATE_270,
                8: Image.ROTATE_90,
                9: Image.ROTATE_90,
            }.get(orientation, None)

            if rotation:
                im = im.transpose(rotation)

    with io.BytesIO() as output:
        im.thumbnail(size)
        im.save(output, format="JPEG")
        return output.getvalue()
