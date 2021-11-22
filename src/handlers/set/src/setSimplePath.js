const setElement = require('./setElement');

const setSimplePath = (obj, path, val) => {
  let tempObject = obj;
  path.forEach((element, index) => {
    tempObject = setElement(
      element, tempObject, path[index + 1], path.length - 1 === index, val,
    );
  });
};

module.exports = setSimplePath;
