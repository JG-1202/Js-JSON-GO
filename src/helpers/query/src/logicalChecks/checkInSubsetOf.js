/**
 * check whether operator is ∈ or @
 */
const doesOperatorIndicateInSubsetOf = (operator) => (operator === '∈' || operator === '@');

/**
 * check whether operator is ∉ or !@
 */
const doesOperatorIndicateNotInSubsetOf = (operator) => (operator === '∉' || operator === '!@');

/**
 * Logical check for operators ∈, @, ∉, and !@
 * @param {Any} variableA variable to check
 * @param {Any} variableB variable to check against
 * @param {String} operator operator (check for  ∈, @, ∉, and !@)
 * @returns {Boolean} indicator whether logical check for  ∈, @, ∉, and !@ suffices
 */
const checkInSubsetOf = (variableA, variableB, operator) => {
  if (doesOperatorIndicateInSubsetOf(operator)) {
    return { stop: true, result: (variableB.indexOf(variableA) > -1) };
  }
  if (doesOperatorIndicateNotInSubsetOf(operator)) {
    return { stop: true, result: (variableB.indexOf(variableA) === -1) };
  }
  return { stop: false };
};

module.exports = checkInSubsetOf;
