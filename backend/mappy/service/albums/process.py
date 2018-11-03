from mappy import utils

from dateutil import parser

TRIANGULATE_GEOLOCATION_THRESHOLD_SECONDS = 3 * 60
APPROXIMATE_GEOLOCATION_THRESHOLD_SECONDS = 80


def triangulate(prev_img, next_img):
    prev_lat = prev_img["lat"]
    prev_lng = prev_img["lng"]
    next_lat = next_img["lat"]
    next_lng = next_img["lng"]

    # This is wrong since in we should project the coordinates on a sphere to
    # get an accurate estimation but should do for now.
    return [
        (prev_lat + next_lat) / 2.0,
        (prev_lng + next_lng) / 2.0,
    ]


def augment_geolocation(prev_img, curr_img, next_img):
    curr_img["estimated_location"] = False

    if curr_img["has_geolocation"]:
        return curr_img

    if not prev_img or not next_img:
        return curr_img

    if not prev_img["has_geolocation"] and not next_img["has_geolocation"]:
        return curr_img

    def augment(d, lat, lng):
        d.update({
            "has_geolocation": True,
            "estimated_location": True,
            "lat": lat,
            "lng": lng,
        })

    curr_dt = parser.parse(curr_img["date_time"])
    prev_dt = parser.parse(prev_img["date_time"])
    next_dt = parser.parse(next_img["date_time"])
    if prev_img["has_geolocation"] and next_img["has_geolocation"]:
        # Both prev and next have a geolocation, use the avg point in this case
        time_diff = (next_dt - prev_dt).seconds

        if time_diff < TRIANGULATE_GEOLOCATION_THRESHOLD_SECONDS:
            est_lat, est_lng = triangulate(prev_img, next_img)
            augment(curr_img, est_lat, est_lng)
    elif prev_img["has_geolocation"]:
        # Only the previous image has geolocation data
        time_diff = (curr_dt - prev_dt).seconds

        if time_diff < APPROXIMATE_GEOLOCATION_THRESHOLD_SECONDS:
            augment(curr_img, prev_img["lat"], prev_img["lng"])
    else:
        # Only the next image has geolocation data
        time_diff = (next_dt - curr_dt).seconds

        if time_diff < APPROXIMATE_GEOLOCATION_THRESHOLD_SECONDS:
            augment(curr_img, next_img["lat"], next_img["lng"])

    return curr_img


def process_images(images_list):
    augmented_images = []

    for prev_img, curr_img, next_img in utils.neighborhood(images_list):
        augmented_images.append(
            augment_geolocation(prev_img, curr_img, next_img)
        )

    return augmented_images
