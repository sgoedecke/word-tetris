import React from 'react';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';
console.log(GAME_HEIGHT, GAME_WIDTH)

const Tile = ({ letter }) => {
  if (letter) {
    return(<div className={letter.active ? "activeTile" : undefined}>{ letter.char }</div>)
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
                    { <Tile letter={letters.find((l) => (l.x == wi && l.y == hi))} /> }
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
