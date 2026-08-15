#!/bin/sh
set -e

mkdir -p "$IMAGES_DIR/uploads"
mkdir -p "$IMAGES_DIR/assets"

chown -R nuxt:nodejs "$IMAGES_DIR"

exec su -s /bin/sh nuxt -c "$*"