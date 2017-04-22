/**
 * Check if a string is an alphabetical character
 */
function isAlphabetical(str) {
  if (str.match(/[a-z]/i)) {
    return true;
  }
  return false;
}

/**
 * Create an array of empty underscores according to
 * the album name letters.
 */
function createHiddenArray(name) {
   let hiddenArray = name.map(letter => {
     if (isAlphabetical(letter)) {
       return '_'
     }
     return letter;
   })

   return hiddenArray;
 }

 export { isAlphabetical, createHiddenArray }
