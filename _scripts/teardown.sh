#!/bin/bash

# Stop and remove all containers
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

# Remove all volumes
docker volume rm $(docker volume ls -q)

# Remove all networks

docker network prune

echo "All Docker containers, networks and volumes have been deleted."
