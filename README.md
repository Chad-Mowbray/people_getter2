# PeopleGetter

## High-level usage
1. Start up the backend service containers (a Python API and a Postgres database)
```bash
./start_all.sh
```
2. Use the live server extension to open `frontend/index.html`

## The start_all.sh script
The `start_all.sh` script does three things:
1. Runs the `db/start_db.sh` script
2. Dynamically gets the db container's IP address and writes it to `api/db_ip_addr` so the api container can pick it up
3. Runs the `api/start_api.sh` script


### The Database
The `db` folder contains everything needed to run a containerized Postgres database with a pre-loaded `Person` table. The `start_db.sh` script will build the image from the `Dockerfile`, then run it as a background process.  After a few seconds, it will exec into the running container and execute the `setup_db.sh` script that creates the `Person` table and inserts records.

This service needs to be running before the Python API, because the Python API will need to have access to the database's IP address, which is assigned by Docker when the container starts.

### The API
The `api` folder contains everything you need to run a Flask API (Python).  Because Flask is a 3rd-party module, we have to make sure that the container has the necessary dependencies installed (listed in `requirements.txt`).

The server will listen for requests on port 8000 (this is configurable).  When a request comes in to either `/all` or `/<id>` (i.e `/3`, `/973`, etc.), psycopg2 will create a connection to the database container and fetch results.  These results will then be converted to JSON and sent as an HTTP response.

The tricky part with this service is that it can't know what the database container's `HOST` is until after the database container is running.  Because of that, the `HOST` must be configured dynamically.

That configuration is handled by the `db_ip_addr` file.  the `db_ip_addr` file is created during the execution of the `start_all.sh` script from this command:
```bash
docker inspect  -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' pg_db > api/db_ip_addr
```
That's quite a mouthful, but it's just parsing through the results of `docker inspect pg_db`, which as you can see if you execute it while the database container is running, is a bunch of JSON describing the running container.  We just need one little piece of information from that: the IPAddress.

The database container's IP address is then written to the `db_ip_addr` file.  That file is then copied into the api container when it's built.  Then when `python server.py` is executed, the contents of the `db_ip_addr` are read in and made available to the server.


## The frontend
The `frontend` folder contains everything you need for a web server.  It uses the [Alpine Nginx image](https://hub.docker.com/_/nginx).  Configuring a web server can get complicated, but fortunately all the default configuration will serve our purposes now.  All we have to do is copy our html/css/js files to `/usr/share/nginx/html/` in the container.  This is just how Nginx works, it has nothing to do with Docker.


