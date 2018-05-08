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

SBPS=$( sudo docker ps | grep $REPO )

IFS=' ' read -ra ADDR <<< "$SBPS"
for i in "${ADDR[@]}"; do
    CID=$i
    break
done

echo "container ID: $CID"
docker logs $CID
