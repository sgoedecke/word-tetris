import React from 'react';
import LetterGrid from './LetterGrid';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';
import checkForWords from './wordcheck';

class WordTetris extends React.Component {
  constructor(props) {
    super(props)
    this.state = { letters: [], foundWords: [], gameOver: false }
  }

  componentDidMount() {
    this.addLetter()
    this.moveLettersInterval = window.setInterval(this.moveLetters.bind(this), 1000)
    this.addLetterInterval = window.setInterval(this.addLetter.bind(this), 5000)
    document.addEventListener('keydown', this.handleKeys.bind(this))
  }

  componentWillUnmount() {
    window.clearInterval(this.moveLettersInterval)
    window.clearInterval(this.addLetterInterval)
  }

  handleKeys(event) {
    const oldLetters = JSON.parse(JSON.stringify(this.state.letters))
    const lastLetter = oldLetters[oldLetters.length - 1]

    if (event.keyCode == '37') {
      // left arrow
      if (lastLetter.x > 0) { lastLetter.x-- }
    } else if (event.keyCode == '39') {
      // right arrow
      if (lastLetter.x < GAME_WIDTH - 1) { lastLetter.x++ }
    }
    if (oldLetters.slice(0, oldLetters.length - 1).find((l) => (l.x == lastLetter.x && l.y == lastLetter.y))) {
      return
    } else {
      this.setState({ letters: oldLetters })
    }
  }

  randLetter() {
    const list = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
    return list.charAt(this.randNumber(list.length));
  }

  randNumber(len) {
    return Math.floor(Math.random() * len)
  }

  checkForWords() {
    const letters = JSON.parse(JSON.stringify(this.state.letters))
    let result = checkForWords(letters)
    if (!result) { return }
    if (result.foundWord) {
      this.setState({
        letters: result.newLetters,
        foundWords: [...this.state.foundWords, result.foundWord]
      })
    }
  }

  moveLetters() {
    let letterReleased = false
    const letters = JSON.parse(JSON.stringify(this.state.letters))
    const newLetters = letters.map((letter) => {
      const hasLetterBelow = this.state.letters.find((l) => (l.x == letter.x && l.y == letter.y + 1))
      const isAtBottom = letter.y >= GAME_HEIGHT - 1
      if (isAtBottom || hasLetterBelow) {
        if (letters.indexOf(letter) == letters.length - 1) {
          letterReleased = letter
        } 
        return letter
      } else {
        return {
          char: letter.char,
          x: letter.x,
          y: letter.y + 1,
        }
      }
    })
    this.setState({ letters: newLetters })
    if (letterReleased) {
      this.checkForWords() // only check for new words when you put a letter down
    }
  }

  addLetter() {
    const newLetter = {
      char: this.randLetter(),
      x: this.randNumber(GAME_WIDTH),
      y: 0,
    }

    if (this.state.letters.find(l => (l.x == newLetter.x && l.y == newLetter.y))) {
      this.setState({ gameOver: true})
      window.clearInterval(this.moveLettersInterval)
      window.clearInterval(this.addLetterInterval)
    }
    this.setState((prevState) => ({ letters: [...prevState.letters, newLetter] }))
  }

  render() {
    return(
      <div>
        { this.state.gameOver && <div>Game over!</div> }
        <LetterGrid letters={this.state.letters} />
        { 
          this.state.foundWords.map((w, i) => (
            <div key={i}>{ w }</div>
          ))
        }
      </div>
    )
  }
}

export default WordTetris;
