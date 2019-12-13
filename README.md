# Friend Filter
A state of the art personality test and matching sysytem. A must have for any eco-chamber!

## Overview
Revamped version of app from bootcamp at SMU. Allows users to make a profile, choose a avatar and take a personality test.
Once you have taken a personality test you can find other users with the same personality type.

**__Site is deployment ready out of the box__**

## How to use it
Clone repo as local file refrence then copy files into your project. Then on server.js level open terminal and type *npm install* this will install backend dependencies and then it auto switches to client side and installs dependencies.

Once dependencies are installed type *npm start* in termial. This will start the server then swithc to client and boot it. It will open up tab in your default browser.

**Be sure to link DB with mlab or other extension**

### Easy to build on top of
* File structure designed to make large scale projects in organized way.
* index.js files in folders to serve as directory routes for files in folder
* Built in CRUD functions with custom error handeling and front end components as working example to copy and re-use
* Comes with Bootstrap as cdn so it is easy use and replace

### Dependencies 

**Back End**
- Concurrently - Allows package JSON scripts to handle multiple commands
- Nodemon - For when you are in development any save will refresh server to give live update of changes
- Axios - For communicating with front end
- Express - For helping build a server and serving assests
- Mongoose - Helps with orm for mongodb
- Prop-types - Helps react with hanldeing props
- React - To let app work in a react environment
- If-env - Has app check for env
- Dotenv - Allows .env files to be used in app. 
- Bcrypt - For encrypting data
- Jsonwebtoken - For handleing authorization

**Front End**
- Axios - For communicating with back end routes
- React - To let app work in a react environment
- React-bootstrap-sweetalert - For easy to use models
- React-dom - Needed for react to work with DOM
- React-router-dom - Needed for using a react component router
- React-scripts - Needed for react to work
- Reactstrap - Special components made just for react
- Moment - For easy formatting of dates

See a working delpoyed version here: https://mighty-lake-64628.herokuapp.com/