# Contributing

Welcome to Trellis, a simplified Trello clone built with React, Redux, Node, Express and MongoDB. The following guidelines will give you a short overview of how we handle issues and PRs in this repository.

We appreciate all valuable contributions - bug reports, documentation and design enhancements, issues as well as Pull Requests to make Trellis more convenient, functional and bug free.

To begin contributing have a look at the open issues [here](https://github.com/ayushagg31/Trellis/issues).

## Development Setup  
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

 ## Creating Issues
 - Provide detailed description about the issue and mark it with the relevant labels.
 - If it's a bug, provide steps to reproduce the bug. If possible suggest the ways to resolve it.
 - If it's a feature request, share your thoughts about the final outcome.
 - Don't create duplicate issues, checkout the issue section before reporting it.
 
 ## Submitting Pull Requests
 - Request assignment to the issue before working
 - Provide the reference to the issue, for which pull request is created
 - Provide detailed description about the changes you have made and the expected outcome, feel free to share images/gif for the outcome.
 - Don't submit independent PR's. First create issue, once approved, submit your PR.
  
## Assigning issues
- Only start working on issues, once assigned by the maintainers.
- Don't request assignment on more than one issue at a time.
- Issues will be unassigned, if there's no action/updates from the assignee.

 ## Priority Issues
 Issues which needs to be resolved on priority basis

 - [ ] [Setup the eslint for whole project](https://github.com/ayushagg31/Trellis/issues/26)
 - [ ] [Improve Readme and add file structure information to make it more open-source friendly](https://github.com/ayushagg31/Trellis/issues/9)
 
 
