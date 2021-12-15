export = chop;
/**
 * Chops an array or object into smaller pieces
 * @param {(Object|Array)} value - object or array
 * @param {number} chopSize - size of pieces.
 * @returns {(Array[]|Object[])} array of chopped pieces.
 */
declare function chop(object: any, chopSize: number): (any[][] | any[]);
