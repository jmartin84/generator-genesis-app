#!/bin/bash

docker run \
    --tty  \
    --entrypoint=/bin/bash \
    -d                     \
    jmartin84/generator-genesis-app

echo 'dev container started'
