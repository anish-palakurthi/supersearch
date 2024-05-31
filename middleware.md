## Middleware overview
- backend and frontend are separated for ease of use right now
- this is a next.js project, so to run both the server and client, cd into `frontend` and then run `npm run dev`
- the app is rendered from the code in `frontend/src` but the code in `frontend/main/main.js` is what establishes the websocket and starts the backend server
- the websocket acts as open two way connection between the server and client
    - the server code for handling websockets is entirely in `backend/server.js`, this is what we can use to send and listen to info back and forth
- the app code uses the websocket context to render this information
- ignore routes and controllers for now, they are just examples of how more complex routes can be handled
- we can use native fetch or axios to make the http requests from the frontend