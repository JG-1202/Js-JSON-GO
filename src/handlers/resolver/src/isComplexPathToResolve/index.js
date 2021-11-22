const isComplexPath = (arrayPath) => arrayPath.some((el) => (el.query || el.wildcard));

module.exports = isComplexPath;
