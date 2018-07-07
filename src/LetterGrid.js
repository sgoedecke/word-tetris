import React from 'react';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';
console.log(GAME_HEIGHT, GAME_WIDTH)

const Tile = ({ letters, x, y}) => {
  const letter = letters.find((l) => (l.x == x && l.y == y))
  const active = letters.indexOf(letter) == letters.length - 1
  if (letter && letter.char == '!') {
    return(<td className={"bombTile"}>🔥</td>)
  } else if (letter) {
    return(<td className={active ? "activeTile" : "letterTile"}>{ letter.char }</td>)
  } else {
    return(<td> </td>)
  }
}

const LetterGrid = ({ letters }) => {
  return(
    <div>
      <table>
        <tbody>
        {
          [...Array(GAME_HEIGHT)].map((_, hi) => (
            <tr key={hi}>
              {
                [...Array(GAME_WIDTH)].map((_, wi) => (
                  <Tile key={wi} letters={letters} x={wi} y={hi} />
                ))
              }
            </tr>
          ))
        }
      </tbody>
      </table>
    </div>
  )
}

export default LetterGrid;
