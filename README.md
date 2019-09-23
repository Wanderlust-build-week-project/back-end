# Backend

This repository serves as the backend for Lambda School's Wanderlust Build Week group of September 2019.

## Documentation

For a full description of endpoints with examples, please see [Postman Documentation](https://documenter.getpostman.com/view/8893649/SVmySJBg?version=latest).

## Dependencies

- knex
- knex-cleaner
- bcryptjs
- cors
- express
- helmet
- jsonwebtoken
- jest (testing)
- supertest (testing)
- Local Server: SQLite3
- Deployed Server: PostgreSQL

## Getting Started

Follow these steps to get setup on this server:

- [ ] Fork this repository
- [ ] Navigate into the back-end directory
- [ ] `npm install` to install depdencies
- [ ] `npx knex migrate:latest` to create local tables
- [ ] _OPTIONAL_ `npx knex seed:run to create seed records`
- [ ] `npm run server` to run server on local host (uses SQLite3)
- [ ] `npm run test` to run tests
