import React from 'react';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';
console.log(GAME_HEIGHT, GAME_WIDTH)

const Tile = ({ letters, x, y}) => {
  const letter = letters.find((l) => (l.x == x && l.y == y))
  const active = letters.indexOf(letter) == letters.length - 1
  if (letter) {
    return(<div className={active ? "activeTile" : undefined}>{ letter.char }</div>)
  } else {
    return(<div> </div>)
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
                  <td key={wi}>
                    { <Tile letters={letters} x={wi} y={hi} /> }
                  </td>
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
