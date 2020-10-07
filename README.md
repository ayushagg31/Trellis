# Trellis
[![website](https://img.shields.io/badge/website-up-%2338B2AC)](https://trellis-app.herokuapp.com/)
![Hits](https://hitcounter.pythonanywhere.com/count/tag.svg?url=https%3A%2F%2Fgithub.com%2Fayushagg31%2FTrellis)
![repo-size](https://img.shields.io/github/repo-size/ayushagg31/Trellis)
[![LinkedIn](https://img.shields.io/badge/linkedin-connect-blue)](https://www.linkedin.com/in/ayush-aggarwal-b13a92120/)


A Trello Clone - Built with React, Redux, Express, and MongoDB. 

**📢: I'm looking for maintainers, feel free to react out to me on `hello@ayushaggarwal.com` if you're interested.**

First, check our [code of conduct](https://github.com/ayushagg31/Trellis/blob/master/CODE_OF_CONDUCT.md)

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


 ## File structure
 <ul>
 <!-- Root -->
   <li>
     <details>
       <!-- API FOLDER -->
       <summary>📁 api</summary>
         <ul>
          <li>📄 /activityHandler.js</li>
          <li>📄 /boardHandler.js</li>
          <li>📄 /cardHandler.js</li>
          <li>📄 /listHandler.js</li>
          <li>📄 /userHandler.js</li>
         </ul>
       <!-- API FOLDER -->
     </details>
   </li>
 
   <li>
     <details>
      <!-- CLIENT FOLDER BEGGINING-->
       <summary>📁 client</summary>
       <ul>
         <li>
           <details>
            <!-- PUBLIC FOLDER BEGGINING-->
             <summary>📁 public</summary>
             <ul>
               <li>📄 /index.html</li>
             </ul>
            <!-- PUBLIC FOLDER ENDING-->
           </details>
         </li>
         <li>
           <details>
            <!-- SRC FOLDER BEGGINING-->
             <summary>📁 src</summary>
               <ul>
                 <li>
                   <details>
                    <!-- ACTIONS FOLDER BEGGINING-->
                     <summary>📁 actions</summary>
                     <ul>
                       <li>
                         <details>
                          <!-- ACTIONSCREATORS FOLDER BEGGINING-->
                           <summary>📁 actionsCreators</summary>
                           <ul>
                             <li>📄 /activityActions.js</li>
                             <li>📄 /boardActions.js</li>
                             <li>📄 /cardActions.js</li>
                             <li>📄 /imageActions.js</li>
                             <li>📄 /listActions.js</li>
                             <li>📄 /userActions.js</li>
                           </ul>
                          <!-- ACTIONSCREATORS FOLDER ENDING-->
                         </details>
                       </li>
                       <li>📄 /actions.js</li>
                     </ul>
                    <!-- ACTIONS FOLDER ENDING-->
                   </details>
                 </li>
                 <li>
                   <details>
                    <!-- COMPONENTS FOLDER BEGGINING-->
                     <summary>📁 components</summary>
                       <ul>
                         <li>📄 /Activities.js</li>
                         <li>📄 /AddItem.js</li>
                         <li>📄 /Auth.js</li>
                         <li>📄 /Background.js</li>
                         <li>📄 /Board.js</li>
                         <li>📄 /BoardHeader.js</li>
                         <li>📄 /Boards.js</li>
                         <li>📄 /Card.js</li>
                         <li>📄 /Footer.js</li>
                         <li>📄 /Header.js</li>
                         <li>📄 /Hr.js</li>
                         <li>📄 /InputCard.js</li>
                         <li>📄 /List.js</li>
                         <li>📄 /Login.js</li>
                         <li>📄 /MenuHeader.js</li>
                         <li>📄 /NotFound.js</li>
                         <li>📄 /Notice.js</li>
                         <li>📄 /Register.js</li>
                         <li>📄 /SideMenu.js</li>
                       </ul>
                    <!-- COMPONENTS FOLDER ENDING-->
                   </details>
                 </li>
                 <li>
                   <details>
                    <!-- ORDERING FOLDER BEGGINING-->
                     <summary>📁 ordering</summary>
                       <ul>
                         <li>📄 /ordering.js</li>
                       </ul>
                    <!-- ORDERING FOLDER ENDING-->
                   </details>
                 </li>
                 <li>
                   <details>
                    <!-- REDUCERS FOLDER BEGGINING-->
                     <summary>📁 reducers</summary>
                       <ul>
                         <li>📄 /activityReducer.js</li>
                         <li>📄 /boardReducer.js</li>
                         <li>📄 /cardsReducer.js</li>
                         <li>📄 /imageReducer.js</li>
                         <li>📄 /listReducer.js</li>
                         <li>📄 /userReducer.js</li>
                       </ul>
                    <!-- REDUCERS FOLDER ENDING-->
                   </details>
                 </li>
                 <li>
                   <details>
                    <!-- ROUTERS FOLDER BEGGINING-->
                     <summary>📁 routers</summary>
                       <ul>
                         <li>📄 /AppRouter.js</li>
                       </ul>
                    <!-- ROUTERS FOLDER ENDING-->
                   </details>
                 </li>
                 <li>
                   <details>
                    <!-- STORE FOLDER BEGGINING-->
                     <summary>📁 store</summary>
                       <ul>
                         <li>📄 /configureStore.js</li>
                       </ul>
                    <!-- STORE FOLDER ENDING-->
                   </details>
                 </li>
                 <li>📄 /App.js</li>
                 <li>📄 /index.css</li>
                 <li>📄 /index.js</li>
               </ul>
            <!-- SRC FOLDER ENDING -->
           </details>
         </li>
         <li>📄 /.env.sample</li>
         <li>📄 /.gitignore</li>
         <li>📄 /package-lock.json</li>
         <li>📄 /package.json</li>
        </ul> 
      <!-- CLIENT FOLDER ENDING-->
     </details>
   </li>
   <li>
     <details>
      <!-- CONFIG FOLDER BEGGINING-->
       <summary>📁 config</summary>
         <ul>
           <li>📄 /.env.sample</li>
          🖼️
         </ul>
      <!-- CONFIG FOLDER ENDING-->
     </details>
   </li>
   <li>
     <details>
      <!-- IMAGES FOLDER BEGGINING-->
       <summary>📁 images</summary>
         <ul>
           <li>🖼️ /Tellis-Login.png</li>
           <li>🖼️ /Tellis-Register.png</li>
           <li>🖼️ /Tellis-board1.png</li>
           <li>🖼️ /Tellis-board2.png</li>
           <li>🖼️ /Trellis.gif</li>
           <li>🖼️ /Trellis.png</li>
         </ul>
      <!-- IMAGES FOLDER ENDING-->
     </details>
   </li>
   <li>
     <details>
      <!-- MODELS FOLDER BEGGINING-->
       <summary>📁 models</summary>
         <ul>
           <li>📄 /activity.js</li>
           <li>📄 /board.js</li>
           <li>📄 /card.js</li>
           <li>📄 /user.js</li>
           <li>📄 /list.js</li>
         </ul>
      <!-- MODELS FOLDER ENDING-->
     </details>
   </li>
   <li>
     <details>
      <!-- TEST FOLDER BEGGINING-->
       <summary>📁 test</summary>
         <ul>
           <li>
             <details>
              <!-- FIXRURES FOLDER BEGGINING-->
               <summary>📁 fixtures</summary>
                 <ul>
                   <li>📄 /db.js</li>
                 </ul> 
              <!-- FIXTURES FOLDER ENDING-->
            </details>
           </li>
           <li>📄 /activity.test.js</li>
           <li>📄 /board.test.js</li>
           <li>📄 /card.test.js</li>
           <li>📄 /list.test.js</li>
         </ul>
      <!-- TEST FOLDER ENDING-->
     </details>
   </li>
   <li>📄 /.esclintrc.json</li>
   <li>📄 /.gitignore</li>
   <li>📄 /CONTRIBUTING.md</li>
   <li>📄 /LICENCE</li>
   <li>📄 /README.md</li>
   <li>📄 /app.js</li>
   <li>📄 /index.js</li>
   <li>📄 /middleware.js</li>
   <li>📄 /package-lock.json.js</li>
   <li>📄 /package.json</li>
   <li>📄 /CODE_OF_CONDUCT.md</li>
 </ul>
 
 

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
- Show your support by ⭐ the project.
- Submit pull requests and improve the repo overall quality
- Read [Contributors guidelines](https://github.com/ayushagg31/Trellis/blob/master/CONTRIBUTING.md) before submitting a PR or creating a new issue.

