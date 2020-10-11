# Trellis
[![website](https://img.shields.io/badge/website-up-%2338B2AC)](https://trellis-app.herokuapp.com/)
![Hits](https://hitcounter.pythonanywhere.com/count/tag.svg?url=https%3A%2F%2Fgithub.com%2Fayushagg31%2FTrellis)
![repo-size](https://img.shields.io/github/repo-size/ayushagg31/Trellis)
[![LinkedIn](https://img.shields.io/badge/linkedin-connect-blue)](https://www.linkedin.com/in/ayush-aggarwal-b13a92120/)


A Trello Clone - Built with React, Redux, Express, and MongoDB. 

**📢: I'm looking for maintainers, feel free to reach out to me on `hello@ayushaggarwal.com` if you're interested.**


## Demo
[Trellis-app](https://trellis-app.herokuapp.com/)  

**Demo Account Credentials** <br/>
**Username** - *gozmit* <br/>
**Password** - *gozmit*

## 📷 Screenshots
<details>
<summary>View Screenshots</summary>
 
**Login**
![Login](../master/images/Trellis-Login.png)
**Register**
![Register](../master/images/Trellis-Register.png)
**Home**
![Home](../master/images/Trellis-board1.png)
**Create Board**
![Create Board](../master/images/Trellis-board2.png)
**Trellis**
![Trellis Board](../master/images/Trellis.png)
 
</details>

 ## GIF
![Trellis-gif](../master/images/Trellis.gif)

[**Demo Video**](https://drive.google.com/file/d/1eP41BKh8LLL7ScSnhGlSd3FJRKXazva3/view)


## ⚡ Features
- Create, Modify and Delete boards
- Create, Modify and Delete cards
- Create, Modify and Delete lists
- Move card items within lists
- Move card items across lists
- Ordering of list items
- Activity log with active timestamps for each user events
- Customize background images or color for individual boards
- User Authentication

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
4. Create dev.env for **development** and **test.env** for testing purpose  
```
cd ../config
(
echo PORT=1313
echo DATABASE_URL="MongoDB Connection String"
echo JWT_SECRET="YOUR JWT TOKEN"
echo NODE_ENV=development
) > dev.env
```
5. Go into ```client/package.json``` and replace **proxy** with your server port 
```
"proxy": "http://localhost:1313"
```
6. Run the project
```
npm run trellis
```

## ER Diagram
![Trellis-ERD](../master/ERD.png)


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
- Show your support by ⭐ the project.
- Submit pull requests and improve the repo overall quality
- Read [Contributors guidelines](https://github.com/ayushagg31/Trellis/blob/master/CONTRIBUTING.md) before submitting a PR or creating a new issue.

