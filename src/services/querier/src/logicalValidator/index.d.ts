export = logicalValidator;
/**
 * Checks value with checkValue depending on operator
 * @param {Array} value - input value to check
 * @param {string} operator - operator
 * @param {any} checkValue - other input value to check agains value
 * @param {any} element - element to be checked
 * @returns {boolean} - true if it complies, false otherwise
 */
declare function logicalValidator(value: any[], operator: string, checkValue: any, element: any): boolean;
