# This script combines several commands that you'll likely run together anyway

docker build -t people_db ./db
docker run --name pg_db --rm -e POSTGRES_PASSWORD=password -p 5444:5432 -d people_db
sleep 2
docker exec -it pg_db bash ./setup_db.sh

