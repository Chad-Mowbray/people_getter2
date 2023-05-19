
docker rmi people_api -f
docker build -t people_api ./api
docker run --rm -p 8000:8000 -d people_api