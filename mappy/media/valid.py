IMAGE_VALID_SUFFIX = (".jpg", ".jpeg")
VIDEO_VALID_SUFFIX = (".mp4", ".webm")


def image(path):
    # TODO: add non-shallow check where we try to load the image
    return path.lower().endswith(IMAGE_VALID_SUFFIX)


def video(path):
    # TODO: add non-shallow check where we load metadata
    return path.lower().endswith(VIDEO_VALID_SUFFIX)
