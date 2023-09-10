docker-compose -f docker/docker-compose.yaml -f docker/docker-compose.test.yaml up -d
docker exec -it test_api bash -c "npm install && npm test"