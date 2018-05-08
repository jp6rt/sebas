#! /bin/bash

REPO="jp6rt/sebas"
LPORT=3000
IPORT=3000
CID=""

# build docker image
sudo docker build -t $REPO .

# run docker
docker run -p $LPORT:$IPORT -d $REPO

# print resuls

docker ps
# docker logs <CID> - get container Id and print logs





