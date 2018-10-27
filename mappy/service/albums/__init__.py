import os
import json

from mappy import config


class Album(object):
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
        return [
            img for img in os.listdir(self.path)
            if media.valid.image(os.path.join(self.path, img))
        ]

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
