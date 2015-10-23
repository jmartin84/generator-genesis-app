#!/bin/bash

CONTAINER=$(docker run \
                --tty  \
                --entrypoint=/bin/bash \
                -d                     \
                jmartin84/generator-genesis-app)

docker exec -ti $CONTAINER npm test
TESTRESULT=$?
docker rm -v -f $CONTAINER > /dev/null
echo 'container removed'
exit $TESTRESULT
