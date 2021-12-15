const chopArray = (toChop, chopSize) => {
  const result = [];
  for (let i = 0; i < toChop.length; i += chopSize) {
    result.push(toChop.slice(i, i + chopSize));
  }
  return result;
};

module.exports = chopArray;
