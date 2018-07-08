import words from './words'

const isAWord = (word) => {
  return words.indexOf(word.toLowerCase()) != -1 
}

const checkForWordsInSlice = (letters, letterSlice, wordLength) => {
    for (let i = 0; i < letterSlice.length; i++) {
      const slice = letterSlice.slice(i, i + wordLength)
      if (slice.length < wordLength) { continue }
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

  result = checkForWordsInSlice(letters, horizontalLetters, 4)
  if (result) { return result }

  result = checkForWordsInSlice(letters, horizontalLetters, 3)
  if (result) { return result }

  const verticalLetters = letters.filter(l => l.x == activeLetter.x).sort((a,b) => (a.y - b.y))

  result = checkForWordsInSlice(letters, horizontalLetters, 4)
  if (result) { return result }

  result = checkForWordsInSlice(letters, verticalLetters, 3)
  if (result) { return result }
}

export default checkForWords;
