const handleQuotes = (obj, char) => {
  const temp = obj;
  if (temp.isString === char) {
    temp.isString = '';
  } else if (!temp.isString) {
    temp.isString = char;
  }
};

const startingPlaceholder = (obj, char) => {
  const temp = obj;
  if (char === '(') {
    temp.placeholder += char;
  } else if (char !== '=') {
    temp.placeholder = '';
  }
};

const startNewPlaceholder = (temp, char) => !temp.isString && !temp.placeholder && char === '=';

const handlePlaceholder = (obj, char) => {
  const temp = obj;
  if (!temp.isString && char === ')') {
    temp.placeholder += char;
    temp.placeholders.push(temp.placeholder);
    temp.placeholder = '';
  } else {
    temp.placeholder += char;
  }
};

/**
 * Get all placeholders that are not (part of) a string
 * @param {string} string
 * @returns {string[]} all =(X) that are not strings
 */
const getPlaceholders = (string) => {
  const temp = {
    isString: '',
    placeholder: '',
    placeholders: [],
  };
  const characters = string.split('');
  characters.forEach((char) => {
    if (['"', "'"].indexOf(char) > -1) {
      handleQuotes(temp, char);
    }
    if (startNewPlaceholder(temp, char)) {
      temp.placeholder = char;
    } else if (temp.placeholder === '=') {
      startingPlaceholder(temp, char);
    } else if (temp.placeholder) {
      handlePlaceholder(temp, char);
    }
  });
  return temp.placeholders;
};

module.exports = getPlaceholders;
