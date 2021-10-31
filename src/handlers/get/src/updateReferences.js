/**
 * Add the reference to the reference object as Number or String
 */
const addReference = (refObject, reference, resolvedElement) => {
  const references = refObject;
  if (resolvedElement.number !== undefined) {
    references[reference] = Number(resolvedElement.number);
  } else if (resolvedElement.string !== undefined) {
    references[reference] = String(resolvedElement.string);
  } else {
    references[reference] = resolvedElement;
  }
};

/**
 * Update references object whenever resolved and a reference is desired
 * @param {Object} refObject object with all references
 * @param {Object} tempObj current remaining object
 * @param {Object} element element description with string/number/query/reference properties
 * @param {Object} resolvedElement resolved element with string/number properties
 */
const updateReferences = (refObject, tempObj, element, resolvedElement) => {
  if (element.reference && tempObj !== undefined) {
    addReference(refObject, element.reference, resolvedElement);
  }
};

module.exports = updateReferences;
