#!/bin/sh
set -e

mkdir -p "$NUXT_IPX_FS_DIR/uploads"
mkdir -p "$NUXT_IPX_FS_DIR/assets"

chown -R nuxt:nodejs "$NUXT_IPX_FS_DIR"

exec su -s /bin/sh nuxt -c "$*"