export = checkInSubsetOf;
/**
 * Logical check for operators ∈, @, ∉, and !@
 * @param {any} variableA variable to check
 * @param {any} variableB variable to check against
 * @param {string} operator operator (check for  ∈, @, ∉, and !@)
 * @returns {boolean} indicator whether logical check for  ∈, @, ∉, and !@ suffices
 */
declare function checkInSubsetOf(variableA: any, variableB: any, operator: string): boolean;
