const isAWord = (word) => {
  return true
}

const checkForWords = (letters) => {
    const activeLetter = letters[letters.length - 1]
    if (!activeLetter) { return }

    // find all possible >3 letterwords nearby the active letter
    const horizontalLetters = letters.filter(l => l.y == activeLetter.y).sort((a,b) => (a.x - b.x))
    const verticalLetters = letters.filter(l => l.x == activeLetter.x).sort((a,b) => (a.y - b.y))

    for (let i = 0; i < horizontalLetters.length; i++) {
      const slice = horizontalLetters.slice(i, i+3)
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

    for (let i = 0; i < verticalLetters.length; i++) {
      const slice = verticalLetters.slice(i, i+3)
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

    return {
      newLetters: [],
      foundWord: null
    }

  }

export default checkForWords;
