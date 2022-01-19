const setElement = require('../setElement');

const setSimplePath = (obj, path, val) => {
  let startObject = obj;
  if (startObject === undefined && path.length > 0) {
    startObject = path[0].number !== undefined ? [] : {};
  }
  let tempObject = startObject;
  path.forEach((element, index) => {
    tempObject = setElement(
      element, tempObject, path[index + 1], path.length - 1 === index, val,
    );
  });
  return startObject;
};

module.exports = setSimplePath;
