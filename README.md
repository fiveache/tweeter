# Tweeter

## Project Description.

Tweeter began as a simple, single-page (SPA) Twitter clone to practice HTML, CSS, JS, jQuery and AJAX front-end skills, and Node, Express and MongoDB back-end skills. Lighthouse Labs provided the starter server-side (back-end) code to interface with, so I could focus on the client-side (front-end) code.

## Demo
This app is deployed on [Heroku](https://david-tweeter.herokuapp.com/).

## Features

## Getting Started

This project is configured for deployment on Heroku. It will require some configuration to have it running on your local machine. It also requires running [MongoDB](https://docs.mongodb.com/manual/installation/) on your machine and ensuring that you have [npm](https://docs.npmjs.com/cli/install) installed on your machine.

### installation
Clone this repository to your local disk:
```
git clone https://github.com/fiveache/tweeter.git
```
change into directory `tweeter`
```
cd tweeter
```
Install all Dependencies (using `npm install` command).
```
npm install
```
Create a .env file in the root of the project by running `touch .env`.
```
touch .env
```
Create a variable called `SESSION_SECRET` in your `.env` file. Key will be used by the `express-session` dependency:
```
SESSION_SECRET='<KEY>'
```
For example,
```
SESSION_SECRET='1A2B3C4D5E6F7'
```
in `server/index.js`, configure the value of the variable `MONGODB_URI` to `mongodb://localhost:27017/tweeter`:

```
const MONGODB_URI=mongodb://localhost:27017/tweeter;
```
Boot up your server by running:
```
npm run local
```

## Dependencies

- Express
- Node 5.10.x or above
- bcrypt
- body-parser
- chance
- connect-mongo
- dotenv
- express
- express-session
- md5
- mongodb
- pug

### Dev Dependencies

- node-sass
- nodemon
- sass
- uglify-es

## Skills Demonstrated

- JavaScript in the browser
- DOM Events
- jQuery and AJAX
- Error handling/Validation
- Database Systems (MongoDB)
- SASS
- HTML Data Attributes
- Responsive Design
- User Authentication
- Deploying to Heroku
