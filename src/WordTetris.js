import React from 'react';
import LetterGrid from './LetterGrid';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';

class WordTetris extends React.Component {
  constructor(props) {
    super(props)
    this.state = { letters: [] }
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
     if (lastLetter.active && lastLetter.x > 0) { lastLetter.x-- }
    } else if (event.keyCode == '39') {
      // right arrow
     if (lastLetter.active && lastLetter.x < GAME_WIDTH - 1) { lastLetter.x++ }
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

  moveLetters() {
    const newLetters = this.state.letters.map((letter) => {
      const hasLetterBelow = this.state.letters.find((l) => (l.x == letter.x && l.y == letter.y + 1))
      const isAtBottom = letter.y >= GAME_HEIGHT - 1
      if (isAtBottom || hasLetterBelow) {
        if (letter.active) {
          return {
            char: letter.char,
            x: letter.x,
            y: letter.y,
            active: false
          }
        } else {
          return letter
        }
      } else {
        return {
          char: letter.char,
          x: letter.x,
          y: letter.y + 1,
          active: letter.active
        }
      }
    })
    this.setState({ letters: newLetters })
  }

  addLetter() {
    const newLetter = {
      char: this.randLetter(),
      x: this.randNumber(GAME_WIDTH),
      y: 0,
      active: true
    }

    if (this.state.letters.find(l => (l.x == newLetter.x && l.y == newLetter.y))) {
      alert('you lost!')
      window.clearInterval(this.moveLettersInterval)
      window.clearInterval(this.addLetterInterval)
    }
    this.setState((prevState) => ({ letters: [...prevState.letters, newLetter] }))
  }

  render() {
    return(
      <LetterGrid letters={this.state.letters} />
    )
  }
}

export default WordTetris;
