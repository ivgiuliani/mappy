# Mappy API server

## Build the docker image

```
docker build -t mappy-backend .
```

## Run the docker container

```
docker run -p 8000:8000 --env ALBUMS_ROOT=/albums \
  -v /path/to/albums:/albums \
  -t mappy-backend
```
