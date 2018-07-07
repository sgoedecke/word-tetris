import words from './words'

const isAWord = (word) => {
  return words.indexOf(word.toLowerCase()) != -1 
}

const checkForWordsInSlice = (letters, letterSlice) => {
    for (let i = 0; i < letterSlice.length; i++) {
      const slice = letterSlice.slice(i, i+3)
      if (slice.length < 3) { continue }
      const potentialWord = slice.map(l => l.char).join('')

      if (isAWord(potentialWord)) {
        // remove letters from array
        slice.forEach(l => {
          const index = letters.indexOf(l)
          letters.splice(index, 1)
        })
        return {
          newLetters: letters, 
          foundWord: potentialWord 
        }
      }
    }
}

const checkForWords = (letters) => {
  const activeLetter = letters[letters.length - 1]
  if (!activeLetter) { return }

  // find all possible >3 letterwords nearby the active letter
  let result
  const horizontalLetters = letters.filter(l => l.y == activeLetter.y).sort((a,b) => (a.x - b.x))
  result = checkForWordsInSlice(letters, horizontalLetters)
  if (result) { return result }

  const verticalLetters = letters.filter(l => l.x == activeLetter.x).sort((a,b) => (a.y - b.y))
  result = checkForWordsInSlice(letters, verticalLetters)
  if (result) { return result }
}

export default checkForWords;
