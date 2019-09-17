# Getting Started

The back-end server uses datasets from the https://annexare.github.io/Countries/ and https://datasets.imdbws.com/. This data needs to be loaded onto the SQL and Node server before serving the GraphQL interface. 

Steps to get the back-end server started for the first time:

* Clone the Git repo.
* Start the PostgreSQL Docker container.
* Install dependencies.
* Download (or use the provided movie datasets) and load IMDB movie datasets into SQL instance.
* Start the back-end server:
  * As a local dev instance.
  * Or Docker container.
* Connect to the GraphQL interface (or query using GraphiQL).

```shell
# Clone the Git repo
git clone git@github.com:CodeSchwert/scoutbase-code-challenge.git

# Start the PostgreSQL Docker container
cd scoutbase-code-challenge
docker-compose up database

# Install dependencies & setup environment variables
cd back-end
npm install
touch .db.env
vim .db.env
# add the following variables and appropriate values for the Postgres Server
# PG_PASSWORD=password
# PG_USER=user
# PG_DB=scoutbase
# PG_HOST=database
# PG_PORT=5432
```

**NOTE**: *the **PG_HOST** value needs to equal the docker-compose service name for the database.*

```shell
# Download (or use the provided movie datasets) and load IMDB movie datasets into SQL instance
cd movie-data
# (optional) BE WARNED: this will download very large movie datasets!! (millions of records per file)
node dawnload-movie-data
# (alternatively, just used the provided smaller datasets)
./process-data.sh

# Start the back-end server
# (As a local dev instance)
cd ..
npm run dev
# (Or Docker container)
cd ../..
docker-compose up server

# Connect to the GraphQL interface (or query using GraphiQL)
```

## GraphQL Interface

**GraphiQL should be available via web browser on http://localhost:5000/api/v0/graphql/graphiql**

## Rest Interface

## Movies Database