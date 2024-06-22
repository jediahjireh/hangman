// import react and component from react library
import React, { Component } from "react";

// import Hangman component
import Hangman from "./hangman/Hangman";

// define App class-based component
class App extends Component {
  // render method to render the App component
  render() {
    return (
      <div className="App">
        {/* render the Hangman component */}
        <Hangman />
      </div>
    );
  }
}

// export App component
export default App;
