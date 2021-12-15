export = setElement;
/**
  * Set tempObject to deeper level, create if non-existent
  * @param {Object} element - input element with number, string or query key
  * @param {Object} object - tempObject containing the element at current location (from path)
  * @param {Object} nextElement - element of next iteration
  * @param {boolean} isFinalElement - boolean to indicate whether it is the last element of path
  * @param {any} val - value to be set at path
  * @returns {Object} tempObject with new element
  */
declare function setElement(element: any, object: any, nextElement: any, isFinalElement: boolean, val: any): any;
