import piexif


def raw_exif(path, with_thumbnail=False):
    raw = piexif.load(path)
    if not with_thumbnail:
        raw.pop("thumbnail")

    # Pointless tags, we're better off without this
    if raw.get("Exif", {}).has_key(piexif.ExifIFD.MakerNote):
        raw.get("Exif").pop(piexif.ExifIFD.MakerNote)
    if raw.has_key("Interop"):
        raw.pop("Interop")

    return raw


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
        data_d["Image"][tag_name] = value

    for tag_id, value in r.get("1st", {}).items():
        tag_name = piexif.TAGS["Image"][tag_id]["name"]
        data_d["Image"][tag_name] = value

    for tag_id, value in r.get("Exif", {}).items():
        tag_name = piexif.TAGS["Exif"][tag_id]["name"]
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

    return {
        "latitude": latitude,
        "longitude": longitude,
    }