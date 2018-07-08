import React from 'react';
import LetterGrid from './LetterGrid';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';
import checkForWords from './wordcheck';
import FoundWords from './FoundWords'

class WordTetris extends React.Component {
  constructor(props) {
    super(props)
    this.state = { letters: [], foundWords: [], animations: [], gameOver: false }
  }

  componentDidMount() {
    this.addLetter()
    this.moveLettersInterval = window.setInterval(this.moveLetters.bind(this), 1000)
    document.addEventListener('keydown', this.handleKeys.bind(this))
  }

  componentWillUnmount() {
    window.clearInterval(this.moveLettersInterval)
  }

  handleKeys(event) {
    if (this.state.gameOver) { return }
    const oldLetters = JSON.parse(JSON.stringify(this.state.letters))
    const lastLetter = oldLetters[oldLetters.length - 1]

    if (event.keyCode == '37') {
      // left arrow
      if (lastLetter.x > 0) { lastLetter.x-- }
    } else if (event.keyCode == '39') {
      // right arrow
      if (lastLetter.x < GAME_WIDTH - 1) { lastLetter.x++ }
    } else if (event.keyCode == '40') {
      // down arrow
      const hasLetterBelow = oldLetters.find((l) => (l.x == lastLetter.x && l.y == lastLetter.y + 1))
      const isAtBottom = lastLetter.y >= GAME_HEIGHT - 1
      if (!hasLetterBelow && !isAtBottom) { lastLetter.y++ }
    }
    if (oldLetters.slice(0, oldLetters.length - 1).find((l) => (l.x == lastLetter.x && l.y == lastLetter.y))) {
      return
    } else {
      this.setState({ letters: oldLetters })
    }
  }

  randLetter() {
    const list = "ABCDEFGHIJKLMNPQRSTUVWXYZAEIOUE"; // list of all letters, biased towards vowels
    return list.charAt(this.randNumber(list.length));
  }

  randNumber(len) {
    return Math.floor(Math.random() * len)
  }

  checkForWords() {
    const letters = JSON.parse(JSON.stringify(this.state.letters))
    let result = checkForWords(letters)
    if (!result) { return false }
    if (result.foundWord) {
      this.setState({
        letters: result.newLetters,
        foundWords: [...this.state.foundWords, result.foundWord]
      })
      return true
    }
  }

  addExplosionAnimation(x, y) {
    const explosionSize = 3
    const explosionTiles = []
    for(let i = -1; i < 2; i++) {
      for(let j = -1; j < 2; j++) {
        explosionTiles.push({
          x: x+i,
          y: y+j,
          type: "bomb"
        })
      }
    }
    this.setState({ animations: explosionTiles })
  }

  clearAnimations() {
    this.setState({ animations: [] })
  }

  moveLetters() {
    if (this.state.gameOver) { return }
    this.clearAnimations() // clear animations first

    let letterReleased = false
    const letters = JSON.parse(JSON.stringify(this.state.letters))
    const newLetters = letters.map((letter) => {
      const hasLetterBelow = this.state.letters.find((l) => (l.x == letter.x && l.y == letter.y + 1))
      const isAtBottom = letter.y >= GAME_HEIGHT - 1
      if (isAtBottom || hasLetterBelow) { // don't move letter
        if (letters.indexOf(letter) == letters.length - 1) {
          letterReleased = letter
        } 
        return letter
      } else { // move letter
        return {
          char: letter.char,
          x: letter.x,
          y: letter.y + 1,
        }
      }
    })
    this.setState({ letters: newLetters })

    // check if a letter was put down and handle consequences
    if (letterReleased) {
      if (letterReleased.char == '!') { // letter is bomb
        this.detonateBomb(letterReleased)
        this.addLetter()
      } else {
        if (this.checkForWords()) { // only check for new words when you put a letter down
          this.addBomb()
        } else {
          this.addLetter()
        }
      }
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
    }
    this.setState({ letters: [...this.state.letters, newLetter] })
  }

  addBomb() {
    this.setState({ letters: [...this.state.letters, { char: '!', x: this.randNumber(GAME_WIDTH), y: 0 }] });
  }

  detonateBomb(bomb) {
    const newLetters = JSON.parse(JSON.stringify(this.state.letters))
    const victims = newLetters.filter(l => (Math.abs(l.x - bomb.x) < 2 && Math.abs(l.y - bomb.y) < 2))

    victims.forEach(l => {
      newLetters.splice(newLetters.indexOf(l), 1)
    })

    this.addExplosionAnimation(bomb.x, bomb.y)
    this.setState({ letters: newLetters })
  }

  render() {
    return(
      <div>
        Word Tetris ({ this.state.foundWords.length } words made)
      <div className='wordTetris'>
        { this.state.gameOver && <div className='gameOverModal'>Game over!</div> }
        <LetterGrid letters={this.state.letters} animations={this.state.animations} />
        <FoundWords words={this.state.foundWords} />
      </div>
    </div>
    )
  }
}

export default WordTetris;
