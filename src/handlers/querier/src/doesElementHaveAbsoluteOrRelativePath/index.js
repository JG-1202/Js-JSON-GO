/**
 * checks if either absolutePath or relativePath is present
 */
const doesElementHaveAbsoluteOrRelativePath = (element) => {
  if (element) {
    return (element.absolutePath || element.relativePath);
  }
  return false;
};

module.exports = doesElementHaveAbsoluteOrRelativePath;
