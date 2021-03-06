import os
import json
from pathlib import Path

from mappy import media
from mappy import config

from . import process


class Album(object):
    @staticmethod
    def exists(aid: str) -> bool:
        path = Path(os.path.join(config.Images.ALBUMS_ROOT, aid))
        return path.exists() and path.is_dir()

    @staticmethod
    def load(aid):
        if not Album.exists(aid):
            raise RuntimeError("Invalid album ID")
        return Album(aid)

    def __init__(self, aid):
        self.aid = aid
        self.path = os.path.join(config.Images.ALBUMS_ROOT, aid)
        self.index_path = os.path.join(self.path, "index.json")

    def _raw_metadata(self):
        m_path = os.path.join(config.Images.ALBUMS_ROOT, self.aid, "metadata.json")

        if not os.path.exists(m_path):
            return {}

        with open(m_path) as f:
            return json.load(f)

    def index(self, reindex=False):
        index_exists = os.path.exists(self.index_path)

        if index_exists and not reindex:
            with open(self.index_path, "r") as f_index:
                return json.loads(f_index.read())

        all_images = [
            img for img in os.listdir(self.path)
            if media.valid.image(os.path.join(self.path, img))
        ]

        all_images = [self.image(iid) for iid in all_images]
        all_images.sort(key=lambda img: img["date_time"])

        with open(self.index_path,  "w") as f_index:
            processed = process.process_images(all_images)
            f_index.write(json.dumps(processed))
            f_index.flush()

        return processed

    def get_name(self):
        return self._raw_metadata().get("name", self.aid)

    def images(self):
        all_images = [
            img for img in os.listdir(self.path)
            if media.valid.image(os.path.join(self.path, img))
        ]

        all_images = [self.image(iid) for iid in all_images]
        all_images.sort(key=lambda img: img["date_time"])
        return process.process_images(all_images)

    def image(self, iid):
        path = os.path.join(self.path, iid)
        if not os.path.exists(path) or not os.path.isfile(path):
            return None

        exif = media.images.processed_exif(path)
        date_time = exif["Exif"].get("DateTimeOriginal", None)

        geo = media.images.geolocation(path)
        has_geolocation = geo is not None

        data = {
            "name": iid,
            "has_geolocation": has_geolocation,
            "date_time": date_time,
        }
        if has_geolocation:
            data["lat"] = geo["latitude"]
            data["lng"] = geo["longitude"]
            data["gps_precision"] = geo["precision"]

        return data

    def image_preview(self, iid):
        path = os.path.join(self.path, iid)
        if not os.path.exists(path) or not os.path.isfile(path):
            return None

        exif = media.images.raw_exif(path, with_thumbnail=True)
        if "thumbnail" in exif and exif["thumbnail"] is not None:
            return exif["thumbnail"]

        return media.images.gen_thumbnail(path)

    name = property(get_name)
