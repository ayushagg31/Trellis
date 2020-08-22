# Trellis

A Trello Clone 

## Demo
[Trellis-app](https://trellis-app.herokuapp.com/)  **[Desktop Only]**

## Features
- 

## Installing
1. Clone the repository
```
git clone https://github.com/ayushagg31/Trellis.git
cd Trellis
```
2. Install dependencies
```
npm i && cd client && npm i
```
3. Create .env file 
```
REACT_APP_CLIENT_KEY="YOUR API KEY" // Unsplash API Key
```
4. Create dev.env for development and test.env for testing purpose  
```
cd ../config
mkdir dev.env 
========================================
PORT=1313
DATABASE_URL="MongoDB Connection String"
JWT_SECRET="YOUR JWT TOKEN"
NODE_ENV=development
```
5. Go into ```client/package.json``` and replace **proxy** with your server port 
```
"proxy": "http://localhost:1313"
```
6. Run the project
```
npm run trellis
```


## Built With
#### Frontend 
- [React](https://reactjs.org/) -  A JavaScript library for building user interfaces
- [Redux](https://redux.js.org/) - State management
- [Material UI](https://material-ui.com/) - UI
- [React-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) - Accessible drag and drop for lists
- [React Router](https://reactrouter.com/) - Routing library for react
- [Moment](https://momentjs.com/) - Library for manipulating dates and time 
- [lodash](https://lodash.com/) - JavaScript utility library for modularity, performance, etc.
#### Backend 
- [NodeJs](https://nodejs.org/en/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - Mongodb object modeling for node.js
- [Express](https://expressjs.com/) -  Node.js web application framework
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [Jsonwebtoken](https://jwt.io/) - Decode, verify and generate JWT.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Password hashing algorithm library
- [Supertest](https://www.npmjs.com/package/supertest) - HTTP APIs Testing library
- [Jest](https://jestjs.io/) - JavaScript Testing Framework
- [sinon](https://sinonjs.org/) - Standalone test fakes, spies, stubs and mocks library

## Contribute
Show your support by ⭐ the project.


