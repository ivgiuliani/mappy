import os
import json

from mappy import config
from mappy import media


class Album(object):
    @staticmethod
    def load(aid):
        path = os.path.join(config.Images.ALBUMS_ROOT, aid)
        if not os.path.exists(path) and not os.path.isdir(path):
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

        lst = []
        for image in all_images:
            geo = media.images.geolocation(os.path.join(self.path, image))
            has_geolocation = geo is not None

            d = {
                "name": image,
                "has_geolocation": has_geolocation,
            }
            if has_geolocation:
                d["lat"] = geo["latitude"],
                d["lng"] = geo["longitude"],

            lst.append(d)

        return lst

    def videos(self):
        return [
            img for img in os.listdir(self.path)
            if media.valid.video(os.path.join(self.path, img))
        ]

    name = property(get_name)


def all_albums():
    return [
        Album(aid) for aid in os.listdir(config.Images.ALBUMS_ROOT)
        if os.path.isdir(os.path.join(config.Images.ALBUMS_ROOT, aid))
    ]
