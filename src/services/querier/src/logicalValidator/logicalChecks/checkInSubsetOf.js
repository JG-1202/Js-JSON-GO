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
 * @param {any} variableA variable to check
 * @param {any} variableB variable to check against
 * @param {string} operator operator (check for  ∈, @, ∉, and !@)
 * @returns {boolean} indicator whether logical check for  ∈, @, ∉, and !@ suffices
 */
const checkInSubsetOf = (variableA, variableB, operator) => {
  if (doesOperatorIndicateInSubsetOf(operator)) {
    return variableB !== undefined && variableB.indexOf(variableA) > -1;
  }
  if (doesOperatorIndicateNotInSubsetOf(operator)) {
    return variableB !== undefined && variableB.indexOf(variableA) === -1;
  }
  return null;
};

module.exports = checkInSubsetOf;
