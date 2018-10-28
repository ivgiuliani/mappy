#!/bin/bash
# Usage: script/start.sh
# Starts the project’s development server.
set -e

# Set all of the default parameters
NODE_ENV=${NODE_ENV:=development}
GIT_REVISION=${GIT_REVISION:=$(git rev-parse HEAD)}
MAPPY_API_HOST="http://localhost:5000"
WEBPACK_CONFIG_PATH="webpack/config.js"

env \
  NODE_ENV=${NODE_ENV} \
  GIT_REVISION=${GIT_REVISION} \
  MAPPY_API_HOST=${MAPPY_API_HOST} \
  ./node_modules/.bin/webpack-dev-server \
    --hot \
    --config ${WEBPACK_CONFIG_PATH} \
    --display-error-details \
    --devtool eval
