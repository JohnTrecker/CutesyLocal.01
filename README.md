# Cutesy Local

This repo contains the Cutesy Local API built with Node, Express, and MongoDB. This API allows users to perform CRUD operations on dog-friendly venues and patrons within San Francisco, and power the front-end app.

## How to start this app

* `npm install`
* `npm start`

## Improvements

Pull requests are welcome and greatly appreciated! The priority for this project is to build out app functionality in the following order, checking off the remaining boxes [ ] as we go:

- Back-end
- Front-end
- Middleware
- Testing

### Back-end

> **Pro tip:** Install and use [Postman](https://www.getpostman.com/) to test the API routes for this section

Using the existing code provided in `server/`, follow the steps below to build out a Pokémon API:

|      URL             | HTTP Verb | Request Body |                         Result                                           |
|:--------------------:|:---------:|:------------:|:------------------------------------------------------------------------:|
| /api/venue           |    GET    |    empty     |                                                Return JSON of all venues |
| /api/venue           |    POST   |     JSON     |                        Create new venue and return JSON of created venue |
| /api/venue           |   DELETE  |    empty     |                   Delete all venues in and return JSON of deleted venues |
| /api/venue/:number   |    GET    |    empty     |                              Return JSON of venue with matching `number` |
| /api/venue/:number   |    PUT    |     JSON     |     Update venue with matching `number` and return JSON of updated venue |
| /api/venue/:number   |   DELETE  |    empty     |     Delete venue with matching `number` and return JSON of deleted venue |
| /api/user            |    GET    |    empty     |                                                 Return JSON of all users |
| /api/user            |    POST   |     JSON     |                          Create new user and return JSON of created user |
| /api/user            |   DELETE  |    empty     |                     Delete all users in and return JSON of deleted users |
| /api/user/:number    |    GET    |    empty     |                               Return JSON of user with matching `number` |
| /api/user/:number    |    PUT    |     JSON     |       Update user with matching `number` and return JSON of updated user |
| /api/user/:number    |   DELETE  |    empty     |       Delete user with matching `number` and return JSON of deleted user |


- [ ] Save mongoose to `package.json`
- [ ] Connect Mongoose to your local Mongo database in `db/index.js`
- [ ] Create two models in `resources/api/api.js` and register it with Mongoose as the `Venues` & `Users` collections
- [ ] Populate your Mongo database with the venues and users found in `data/`
- [ ] Create a controller in `resources/api/kapiController.js` that interacts with your Venues and Users models
- [ ] Create a router in `resources/api/apiRouter.js` that utilizes each of your controller's methods. Be sure to handle errors appropriately.
- [ ] Import `apiRouter` into `server.js` and assign it to the correct route
- [ ] Write at least two tests in `test/api-spec.js` that will help assure future developers that the API is working as intended

### Front-end

> **Escape hatch:** Mock out any server bugs with [json-server](https://github.com/typicode/json-server).

Inside of `client/`, implement a single page front end to interact with this API using either Angular, Backbone, or React. If you want to use Webpack as your build system, feel free to use the annotated config file `webpack.config.js`.

Your front end should be served from Express and should allow the user to:
- [ ] Display all venues (with their images)
- [ ] Add new users
- [ ] Add new venues
- [ ] Filter venues based on their type

### Middleware

> **Suggestion:** Complete all of the steps in [back-end](#back-end) before implementing middleware.

Inside of `server/middleware/rateLimiter.js`, create a custom middleware function in which you implement rate limiting for your API with the following guidelines.

- [ ] Require each request to `/api/api` to include a `user` property in the header
- [ ] Only allow a single user to make 100 requests per hour
- [ ] Mount your middleware in an appropriate location in `server/server.js`
- [ ] Update your front-end to send `user` property with each request

Inside of `server/middleware/rateLimiter.js`, create a custom middleware function in which you implement rate limiting for your API with the following guidelines.

- [ ] Require each request to `/api/api` to include a `user` property in the header
- [ ] Only allow a single user to make 100 requests per hour
- [ ] Mount your middleware in an appropriate location in `server/server.js`
- [ ] Update your front-end to send `user` property with each request

