/** referenced https://codesandbox.io/p/sandbox/react-hangman-exercise-hboin?file=%2Fsrc%2FHangman.js%3A1%2C1-122%2C1
    resource referenced for guidance on coding a Hangman App using ReactJS */

// import react and component from react library
import React, { Component } from "react";

// import random words function from dictionary file
import { randomWord } from "./ice-cream-flavour-words.js";

// import CSS styles from local file
import "./hangman.css";

/** “Writing on black board1” sound effect by pixabay.com on Pixabay:
 * https://pixabay.com/sound-effects/writing-on-black-board1-86724/ */

// import chalk swish sound from local file
import chalkGlide from "./sounds/draw-with-chalk-on-chalkboard.mp3";

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
  /* set defaults */
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

    // set default states
    this.state = {
      // number of incorrect guesses
      nIncorrect: 0,
      // set to track guessed letters
      guessed: new Set(),
      // select a random word as the answer
      answer: randomWord(),
      // set chalk on chalkboard audio
      audio: new Audio(chalkGlide),
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
      // restart chalkboard audio
      audio: new Audio(chalkGlide),
    });
  }

  /* function to show current-state of word while being guessed for */
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

  /* function to play the audio when called */
  playAudio(duration) {
    // destructure audio from state
    const { audio } = this.state;

    // check if the audio is paused and not at the beginning
    if (audio.paused && audio.currentTime > 0) {
      // save the current time position before pausing
      let currentTime = audio.currentTime;

      // pause the audio
      audio.pause();

      // play audio from the saved position
      audio.currentTime = currentTime;
      audio.play();
    } else {
      // play audio from the start if not paused
      audio.currentTime = 0;
      audio.play();
    }

    // pause the audio after specified duration
    setTimeout(() => {
      audio.pause();
    }, duration);
  }

  /* function to handle a guessed letter */
  handleGuess(event) {
    // get the guessed letter from the button's value
    let alphabet = event.target.value;

    // check if the guessed letter is in the answer
    let isCorrect = this.state.answer.includes(alphabet);

    // set the duration for audio playback
    let duration = isCorrect ? 250 : 500;

    // update the component state with the guessed letter
    this.setState((prevState) => ({
      // add guessed letter to guessed set
      guessed: prevState.guessed.add(alphabet),
    }));

    // if letter is not in answer
    if (!isCorrect) {
      // delay incrementing incorrect guesses until after chalk audio stops
      setTimeout(() => {
        this.setState((prevState) => ({
          // increment incorrect guess count
          nIncorrect: prevState.nIncorrect + 1,
        }));
      }, 500);
    }

    // play the audio with the calculated duration
    this.playAudio(duration);
  }

  /* function to return array of letter buttons to render */
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
        // apply a specific class to vowel buttons
        className={`hangman ${"aeiou".includes(alphabet) ? "vowel" : ""}`}
      >
        {/* display letter on the button */}
        {alphabet}
      </button>
    ));
  }

  /* function to display game rules in an alert */
  showRules() {
    alert(
      "Rules:\n" +
        "• Try to guess the word by selecting letters.\n" +
        "• Each incorrect guess adds a part to the stick figure.\n" +
        "• You win if you guess the word before the hangman is fully drawn.\n" +
        "• You lose if the hangman is fully drawn before you guess the word.\n\n" +
        "Instructions:\n" +
        "• Click 'Reset' to start a new game.\n" +
        "• 'Sound On' for full experience."
    );
  }

  /* render: render game */
  render() {
    // destructure nIncorrect and answer from state
    const { nIncorrect, answer } = this.state;
    // destructure images and maxIncorrect from props
    const { images, maxIncorrect } = this.props;

    // hold JSX content based on game state
    let gameContent = null;

    // alternate text for image alt attribute
    let alternateText = `${this.state.nIncorrect} Incorrect guesses`;

    // determine what content to display based on game state
    if (answer === this.guessedWord().join("")) {
      // player wins screen display
      gameContent = (
        <div>
          <p>
            The correct word is: <u>{answer}</u>
            <br /> <br />
            <b>You WIN</b>
          </p>
        </div>
      );
    } else if (nIncorrect === maxIncorrect) {
      // player loses screen display
      gameContent = (
        <div>
          <p>
            <b>YOU LOSE</b>
            <br /> <br />
            The correct word was: <u>{answer}</u>
          </p>
        </div>
      );
    } else {
      // show game interface if game is still in progress
      gameContent = (
        <div>
          <p>Total Incorrect: {nIncorrect}</p>
          {/* guessed letters or underscores for unguessed letters */}
          <p className="hangman-word">{this.guessedWord()}</p>
          {/* keyboard of letters */}
          <p className="hangman-buttons">{this.generateButtons()}</p>
        </div>
      );
    }

    // return the main Hangman game interface with conditional content
    return (
      // hangman game container
      <div className="hangman">
        {/* help button */}
        <button
          className="rounded-circle"
          id="help-button"
          onClick={this.showRules}
        >
          ?
        </button>
        {/* game title */}
        <h1>
          Hangman: <br />
          Ice-cream flavour edition
        </h1>
        {/* hangman image */}
        <img src={images[nIncorrect]} alt={alternateText} />
        <br />
        {/* display either game content or outcome message */}
        {gameContent}
        {/* reset button */}
        <button id="reset-button" onClick={this.resetGame}>
          Reset
        </button>
      </div>
    );
  }
}

// export Hangman component
export default Hangman;
