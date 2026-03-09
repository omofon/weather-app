/**
 * This function trims an input from a user
 * and replace " " between words with "+"
 * for easy url integration
 * @param {string} input
 * @returns {string}
 */
function formatInput(input) {
  if (typeof input !== "string")
    throw new TypeError("input must be a string");
  return input.trim().replaceAll(" ", "+");
}

export default formatInput;