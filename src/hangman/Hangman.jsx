/** referenced https://codesandbox.io/p/sandbox/react-hangman-exercise-hboin?file=%2Fsrc%2FHangman.js%3A1%2C1-122%2C1
    resource referenced for guidance on coding a Hangman App using ReactJS */

// import react and component from react library
import React, { Component } from "react";

// import random words function from dictionary file
import { randomWord } from "./ice-cream-flavour-words.js";

// import CSS styles from Hangman.css
import "./hangman.css";

// import images for Hangman stages
import img1 from "./images/state1.gif";
import img10 from "./images/state10.gif";
import img11 from "./images/state11.gif";
import img2 from "./images/state2.gif";
import img3 from "./images/state3.gif";
import img4 from "./images/state4.gif";
import img5 from "./images/state5.gif";
import img6 from "./images/state6.gif";
import img7 from "./images/state7.gif";
import img8 from "./images/state8.gif";
import img9 from "./images/state9.gif";

class Hangman extends Component {
  /** set defaults */
  static defaultProps = {
    // maximum number of incorrect guesses allowed
    maxIncorrect: 10,
    // array of hangman images for each stage
    images: [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
    ],
  };

  // initialise variables in constructor
  constructor(props) {
    super(props);

    this.state = {
      // number of incorrect guesses
      nIncorrect: 0,
      // set to track guessed letters
      guessed: new Set(),
      // select a random word as the answer
      answer: randomWord(),
    };

    // bind handleGuess method to this instance
    this.handleGuess = this.handleGuess.bind(this);
    // bind resetGame method to this instance
    this.resetGame = this.resetGame.bind(this);
  }

  // reset the game and put things in default
  resetGame() {
    this.setState({
      // reset number of incorrect guesses
      nIncorrect: 0,
      // clear guessed letters set
      guessed: new Set(),
      // get a new random word for the answer
      answer: randomWord(),
    });
  }

  /** function to show current-state of word while being guessed for */
  guessedWord() {
    // destructure answer and guessed from state
    const { answer, guessed } = this.state;

    return (
      answer
        // split answer into array of characters
        .split("")
        // map each character to display if guessed or "_" if not
        .map((alphabet) => (guessed.has(alphabet) ? alphabet : "_"))
    );
  }

  /** function to handle a guessed letter */
  handleGuess(event) {
    // get guessed letter from event
    let alphabet = event.target.value;

    this.setState((set) => ({
      // add guessed letter to guessed set
      guessed: set.guessed.add(alphabet),
      // increase incorrect guess count if letter not in answer
      nIncorrect: set.nIncorrect + (set.answer.includes(alphabet) ? 0 : 1),
    }));
  }

  /** function to return array of letter buttons to render */
  generateButtons() {
    // destructure handleGuess method
    const { handleGuess } = this;
    // destructure guessed from state
    const { guessed } = this.state;

    // return alphabet keyboard for user letter guess selection
    return "abcdefghijklmnopqrstuvwxyz".split("").map((alphabet, index) => (
      <button
        // unique key for each button
        key={index}
        // value of the button (letter)
        value={alphabet}
        // click handler
        onClick={handleGuess}
        // disable button if letter is guessed
        disabled={guessed.has(alphabet)}
      >
        {/* display letter on the button */}
        {alphabet}
      </button>
    ));
  }

  /** render: render game */
  render() {
    // destructure nIncorrect and answer from state
    const { nIncorrect, answer } = this.state;
    // destructure images and maxIncorrect from props
    const { images, maxIncorrect } = this.props;

    // alternate text for image alt attribute
    let alternateText = `${this.state.nIncorrect} Incorrect guesses`;

    return (
      // hangman game container
      <div className="Hangman">
        {/* game title */}
        <h1>
          Hangman: <br />
          Ice-cream flavour edition
        </h1>
        {/* hangman image */}
        <img src={images[nIncorrect]} alt={alternateText} />
        <br />
        {/* conditional rendering based on game outcome */}
        {answer === this.guessedWord().join("") ? (
          // notify user of their win if they guess the correct word
          <p>
            Correct! <br /> <br />
            <b>You WIN</b>
          </p>
        ) : nIncorrect === maxIncorrect ? (
          // notify user if max number of incorrect guesses reached
          <div>
            {/* display the correct word */}
            <p>
              {" "}
              <b>YOU LOSE</b>
              <br /> <br />
              The correct word was: <u>{answer}</u>
            </p>
          </div>
        ) : (
          <div>
            {/* display number of incorrect guesses */}
            <p>Number Incorrect: {nIncorrect}</p>
            {/* display guessed word with underscores underlining each letter */}
            <p className="Hangman-word">{this.guessedWord()}</p>{" "}
            {/* display letter buttons */}
            <p className="Hangman-buttons">{this.generateButtons()}</p>{" "}
          </div>
        )}
        {/* reset game button */}
        <button id="reset" onClick={this.resetGame}>
          Reset
        </button>{" "}
      </div>
    );
  }
}

// export Hangman component
export default Hangman;
