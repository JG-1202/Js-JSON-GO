/**
 * Validate for path (Array) whether the path indicates complexity by means
 * of queries and/or wildcards
 * @param {Array} pat - array representation of path
 * @returns {Boolean} true if complex, false otherwise
 */
const doesPathIndicateComplexity = (path) => path.some((el) => (el.query || el.wildcard));

module.exports = doesPathIndicateComplexity;
