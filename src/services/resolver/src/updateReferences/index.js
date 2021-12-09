const updateReferences = ({
  currentReference, resolvedElement, refObject,
}) => {
  const references = refObject;
  if (currentReference && resolvedElement) {
    if (resolvedElement.number !== undefined) {
      references[currentReference] = Number(resolvedElement.number);
    } else {
      references[currentReference] = String(resolvedElement.string);
    }
  }
};

module.exports = updateReferences;
