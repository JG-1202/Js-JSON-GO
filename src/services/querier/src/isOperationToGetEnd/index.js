/**
 * check if operation is to get end of array
 */
const isOperationToGetEnd = (query) => query && query[0] && query[0].custom === 'end';

module.exports = isOperationToGetEnd;
