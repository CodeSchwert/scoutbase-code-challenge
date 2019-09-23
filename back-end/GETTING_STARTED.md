# Getting Started

The back-end server uses datasets from the https://annexare.github.io/Countries/ and https://datasets.imdbws.com/. This data needs to be loaded onto the SQL and Node server before serving the GraphQL interface. 

Steps to get the back-end server started for the first time:

* Clone the Git repo.
* Install dependencies.
* Start the PostgreSQL Docker container.
* Download (or use the provided movie datasets) and load IMDB movie datasets into SQL instance.
* Start the back-end server:
  * As a local dev instance.
  * Or Docker container.
* Connect to the GraphQL interface (or query using GraphiQL).

```shell
# Clone the Git repo
git clone git@github.com:CodeSchwert/scoutbase-code-challenge.git

# Install dependencies & setup environment variables
cd scoutbase-code-challenge/back-end
npm install
touch .db.env
vim .db.env
# add the following variables and appropriate values for the Postgres Server
# POSTGRES_PASSWORD=password
# POSTGRES_USER=superuser
# POSTGRES_DB=scoutbase
# POSTGRES_HOST=database
# POSTGRES_PORT=5432

# Start the PostgreSQL Docker container
cd ..
docker-compose up -d database
```

**NOTE**: *the **POSTGRES_HOST** value needs to equal the docker-compose service name for the database.*

```shell
# Download (or use the provided movie datasets) and load IMDB movie datasets into SQL instance
docker-compose up -d server

# (optional downlad) BE WARNED: this will download large movie datasets!! (millions of records per file)
docker-compose exec -w /scoutbase/code-challenge/movie-data server node ./download-movie-data

# (alternatively, just used the provided smaller datasets)
docker-compose exec -w /scoutbase/code-challenge/movie-data server sh ./process-data.sh

# Connect to the GraphQL interface (or query using GraphiQL)
```

## GraphQL Interface

**GraphiQL should be available via web browser on http://localhost:5000/api/v0/graphql/graphiql**

## Rest Interface

The countries dataset can be accessed via a rest interface as well as the GraphQL interface.

The endpoints are:

* http://localhost:5000/api/v0/graphql/continents
  * ```shell
    # returns
    {
      "continents": {
        "AF": "Africa",
        "AN": "Antarctica",
        "AS": "Asia",
        "EU": "Europe",
        "NA": "North America",
        "OC": "Oceania",
        "SA": "South America"
      }
    }
    ```
* http://localhost:5000/api/v0/graphql/countries
  * ```shell
    # returns
    {
      "countries": {
        "AD": {
          "name": "Andorra",
          "native": "Andorra",
          "phone": "376",
          "continent": "EU",
          "capital": "Andorra la Vella",
          "currency": "EUR",
          "languages": [
            "ca"
          ],
          "emoji": "🇦🇩",
          "emojiU": "U+1F1E6 U+1F1E9"
        },
        "AE": { ... },
      }
    }
    ```
* http://localhost:5000/api/v0/graphql/languages
  * ```shell
    {
      "languages": {
        "af": {
          "name": "Afrikaans",
          "native": "Afrikaans",
          "code": "af"
        },
        "am": { ... },
        "ar": { ... },
      }
    }
    ```

## Movies Database

The movie datasets in `/back-end/movie-data/` have been truncated from the original sizes to save time loading the data when setting up the stack. The original datasets have a few millions records PER dataset, these truncated datasets have roughly 500,000 records per set, and less records once loaded into the database as only movie related records are loaded (non-movie records are ignored).

## Clean Up

To clean up the stack of Docker containers and networks:

```shell
cd scoutbase-code-challenge/
docker-compose down
```
