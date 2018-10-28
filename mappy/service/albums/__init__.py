import os
import json

from mappy import config
from mappy import media


class Album(object):
    @staticmethod
    def exists(aid):
        path = os.path.join(config.Images.ALBUMS_ROOT, aid)
        return os.path.exists(path) and os.path.isdir(path)

    @staticmethod
    def load(aid):
        if not Album.exists(aid):
            raise RuntimeError("Invalid album ID")
        return Album(aid)

    def __init__(self, aid):
        self.aid = aid
        self.path = os.path.join(config.Images.ALBUMS_ROOT, aid)

    def _raw_metadata(self):
        m_path = os.path.join(config.Images.ALBUMS_ROOT, self.aid, "metadata.json")

        if not os.path.exists(m_path):
            return {}

        with open(m_path) as f:
            return json.load(f)

    def get_name(self):
        return self._raw_metadata().get("name", self.aid)

    def images(self):
        all_images = [
            img for img in os.listdir(self.path)
            if media.valid.image(os.path.join(self.path, img))
        ]

        return [self.image(iid) for iid in all_images]

    def videos(self):
        return [
            img for img in os.listdir(self.path)
            if media.valid.video(os.path.join(self.path, img))
        ]

    def image(self, iid):
        path = os.path.join(self.path, iid)
        if not os.path.exists(path) or not os.path.isfile(path):
            return None

        geo = media.images.geolocation(path)
        has_geolocation = geo is not None

        data = {
            "name": iid,
            "has_geolocation": has_geolocation,
        }
        if has_geolocation:
            data["lat"] = geo["latitude"],
            data["lng"] = geo["longitude"],

        return data

    def image_preview(self, iid):
        path = os.path.join(self.path, iid)
        if not os.path.exists(path) or not os.path.isfile(path):
            return None

        exif = media.images.raw_exif(path, with_thumbnail=True)
        if "thumbnail" in exif:
            return exif["thumbnail"]

        # TODO: fallback to PIL rather than the full size image
        with open(path, "rb") as f:
            return f.read()

    name = property(get_name)


def all_albums():
    return [
        Album(aid) for aid in os.listdir(config.Images.ALBUMS_ROOT)
        if os.path.isdir(os.path.join(config.Images.ALBUMS_ROOT, aid))
    ]
