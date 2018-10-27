#!/bin/bash
# Usage: script/start.sh
# Starts the project’s development server.
set -e

# Set all of the default parameters
NODE_ENV=${NODE_ENV:=development}
GIT_REVISION=${GIT_REVISION:=$(git rev-parse HEAD)}
MAPPY_API_HOST="http://localhost:8080"
WEBPACK_CONFIG_PATH="webpack/config.js"

env \
  NODE_ENV=${NODE_ENV} \
  GIT_REVISION=${GIT_REVISION} \
  MAPPY_API_HOST=${MAPPY_API_HOST} \
  ./node_modules/.bin/webpack-dev-server \
    --config ${WEBPACK_CONFIG_PATH} \
    --devtool eval
