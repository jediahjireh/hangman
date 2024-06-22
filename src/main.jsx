/** Reminder:
 * Navigate to project directory and run "npm run dev" in terminal
 * once the project dependencies in the node_modules folder
 * are installed (provided you have already installed Node.js).
 */

// import react from react library
import React from "react";
// import react-dom to render the component
import ReactDOM from "react-dom/client";

// import App component from respective file
import App from "./App";

// import Bootstrap CSS for styling
import "bootstrap/dist/css/bootstrap.min.css";

// import custom CSS file
import "./custom.css";

// obtain root container
const root = ReactDOM.createRoot(document.getElementById("root"));

// render App component inside root container
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
