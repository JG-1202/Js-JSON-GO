/**
 * Check an array of functions until some is successful
 * @param {Array} functionArray array of functions
 * @param {Any} functionInput input to the function
 * @param {Any} defaultResponse default response in case no function returns successResponse
 * @returns result of first function that is successful
 */
const checkFunctions = (functionArray, functionInput, defaultResponse) => {
  let result = defaultResponse;
  functionArray.some((functionToCheck) => {
    const functionResult = functionToCheck(functionInput);
    if (functionResult.success) {
      result = functionResult.result;
      return functionResult.success;
    }
    return false;
  });
  return result;
};

module.exports = checkFunctions;
