import React from 'react';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';

const Tile = ({ letters, x, y, animation }) => {
  const letter = letters.find((l) => (l.x == x && l.y == y))
  const active = letters.indexOf(letter) == letters.length - 1
  const animationType = animation ? animation.type : undefined 

  if (letter && letter.char == '!') {
    return(<td className={"bombTile"}>🔥</td>)
  } else if (letter) {
    return(<td className={(active ? "activeTile" : "letterTile")}>{ letter.char }</td>)
  } else {
    return(<td className={animationType}> </td>)
  }
}

const LetterGrid = ({ letters, animations }) => {
  return(
    <div>
      <table>
        <tbody>
        {
          [...Array(GAME_HEIGHT)].map((_, hi) => (
            <tr key={hi}>
              {
                [...Array(GAME_WIDTH)].map((_, wi) => (
                  <Tile key={wi} letters={letters} x={wi} y={hi} animation={animations.find(i => (i.x == wi && i.y == hi))} />
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
