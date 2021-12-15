const removeFirstChar = (el) => el.substr(1);

const validatePath = (path) => {
  if (!path) {
    throw new Error('Query element is invalid.');
  }
};

const getRelativeDepthAndPath = (oldPath) => {
  let path = oldPath;
  let relativeDepth = 0;
  path = removeFirstChar(path);
  while (path.charAt(0) === '.') {
    relativeDepth += -1;
    path = removeFirstChar(path);
  }
  validatePath(path);
  return { relativePath: path, relativeDepth };
};

const transformPaths = (part) => {
  if (part.charAt(0) === '$') {
    const path = removeFirstChar(part);
    if (path.charAt(0) === '.') {
      return getRelativeDepthAndPath(path);
    }
    validatePath(path);
    return { absolutePath: path };
  }
  return undefined;
};

module.exports = transformPaths;
