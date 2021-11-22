const updateReferences = ({
  currentReference, resolvedElement, refObject,
}) => {
  const references = refObject;
  if (currentReference && resolvedElement) {
    if (resolvedElement.number !== undefined) {
      references[currentReference] = Number(resolvedElement.number);
    } else if (resolvedElement.string !== undefined) {
      references[currentReference] = String(resolvedElement.string);
    } else {
      references[currentReference] = resolvedElement;
    }
  }
};

module.exports = updateReferences;
