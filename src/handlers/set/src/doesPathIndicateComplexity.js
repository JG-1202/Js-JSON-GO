const isComplexQuery = (query) => query && !(query[0] && query[0].custom === 'append');

/**
 * Validate for path (Array) whether the path indicates complexity by means
 * of queries and/or wildcards
 * @param {Array} pat - array representation of path
 * @returns {Object} with isComplex and complexIndex properties
 */
const doesPathIndicateComplexity = (path) => {
  let complexIndex = -1;
  let isComplex = false;
  path.forEach((el, index) => {
    const isComplexElement = isComplexQuery(el.query) || el.wildcard;
    if (isComplexElement) {
      complexIndex = index + 1;
      isComplex = true;
    }
    return isComplexElement;
  });
  return { isComplex, complexIndex };
};

module.exports = doesPathIndicateComplexity;
