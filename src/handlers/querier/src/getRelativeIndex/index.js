/**
 * Get index of relativeDepth and check whether it is valid
 * (non-existing index <0 is considered invalid)
 */
const getRelativeIndex = (index, relativeDepth) => {
  if (index + relativeDepth >= 0 && relativeDepth <= 0) {
    return index + relativeDepth;
  }
  throw new Error(`Relative depth (${index}+${relativeDepth}) of query is invalid.`);
};

module.exports = getRelativeIndex;
