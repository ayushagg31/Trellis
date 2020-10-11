# Project Structure

All the files in this folder are simply for the frontend, and very straightforward

| File or Folder | Description|
|----------------|------------|
| `src/index.js` | The driver file, where we provide definition for Provider and render AppRouter into the root DOM node |
| `src/App.js` | All parent components are rendered in this file |
| `src/components` | All the react components are located here |
| `src/routers` | Includes main application routes, components to keep UI in sync with the URL | 
| `src/ordering` | Contains the logic for ordering of different items within board | 
| `src/store` | Contains the information about whole state tree of the application  |
| `src/reducers` | Contains all the reducers which determines changes to an application's state | 
| `src/actions.js` | Contains information about all the action types used by actionCreators |
| `src/actionsCreators` | Contains all the actions which carries payload of information for the store |
