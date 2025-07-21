# Phonebook

This is a demo project done for Fullstackopen course in Part 3 (https://fullstackopen.com/en/part3). The project has been extended to support GitHub Actions in Part 11 (https://fullstackopen.com/en/part11) and Docker containers in Part 12 (https://fullstackopen.com/en/part12).

## Notes

Frontend has been migrated from react-app to vite-app and other dependencies has been upgraded. The project includes simple frontend component and e2e tests which relies on backend too. MongoDB database is still required for the project backend as environment variable MONGODB_URL though running the project on localhost. However Docker container includes local mongoDB.

## How to

### Run online

To run Phonebook online visit https://phonebook-jgkw.onrender.com. Note that there may be start up time period.

### Run on localhost

To run Phonebook on localhost run `npm install` first in root of the project. To run frontend in development mode run `npm run dev:frontend` or run frontend in production mode by building frontend `npm run build:frontend` first and then run `npm run preview:frontend`. To run backend define MONGODB_URL in .env first. Backend may serve also frontend build by defining SERVE_FRONTEND_STATIC=true in .env. Then to run backend in development mode run `npm run dev:backend` or in production mode run `npm run start:backend`. Frontend and backend can be run simultaneously in development mode by running `npm run dev` or in production mode by running `npm run start`.

### Run on Docker containers locally

To run Phonebook on Docker containers in development mode run `docker compose -f docker-compose.dev.yml up` or in production mode `docker compose -f docker-compose.yml up`.
