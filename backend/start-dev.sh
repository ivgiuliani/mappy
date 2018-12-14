#!/bin/bash

FLASK_DEBUG=1
FLASK_APP="mappy.service.web:create_app('mappy')"

env \
  LC_ALL=C.UTF-8 \
  LANG=C.UTF-8 \
  FLASK_DEBUG=$FLASK_DEBUG \
  FLASK_APP=$FLASK_APP \
  flask run

