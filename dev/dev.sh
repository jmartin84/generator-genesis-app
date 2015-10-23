#!/bin/bash

docker run \
    -ti  \
    -v $(pwd):/src         \
    --entrypoint=/bin/bash \
    -d                     \
    jmartin84/generator-genesis-app

echo 'dev container started'
