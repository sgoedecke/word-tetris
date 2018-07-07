import React from 'react'
import { render } from 'react-dom'
import WordTetris from './WordTetris.js'

const App = () => (
  <div>
    <div>Word Tetris</div>
    <WordTetris />
  </div>
)

render(<App />, document.getElementById('app'))
