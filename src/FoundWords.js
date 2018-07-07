import React from 'react';
import { GAME_HEIGHT } from './constants';

const FoundWords = ({ words }) => (
  <table className='foundWords' height={`${GAME_HEIGHT * 42}px`}>
    <tbody>
        { 
          words.map((w, i) => (
            <tr key={i}><td>{ w }</td></tr>
          ))
        }
      </tbody>
  </table>
)

export default FoundWords;
