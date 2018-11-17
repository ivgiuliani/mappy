FROM alpine:3.8
MAINTAINER Ivan Giuliani <giuliani.v@gmail.com>

ENV APK_PACKAGES build-base \
                 tzdata \
                 python3 \
                 python3-dev \
                 zlib-dev \
                 jpeg-dev \
                 gcc \
                 musl-dev

RUN apk update && \
    apk upgrade && \
    apk add $APK_PACKAGES && \
    rm -fr /var/cache/apk/*

RUN pip3 install pip==18.1

RUN mkdir /app
WORKDIR /app

COPY requirements.txt /app/

RUN pip3 install -r requirements.txt
COPY . /app

CMD ["gunicorn", "-w 4", "-b 0.0.0.0", "mappy.service.web:create_app('mappy')"]
