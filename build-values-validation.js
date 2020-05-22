exports.throwIfNotFilledString = (input, errorMessage) => {
  if (
    !(
      // ACCEPTANCE CRITERIA
      // MUST BE A STRING
      (
        typeof input === 'string' &&
        // FIRST LETTER IS NOT EMPTY
        input[0] !== ' ' &&
        // LAST LETTER IS NOT EMPTY
        input[input.length - 1] !== ' '
      )
    )
  )
    throw new Error(
      typeof message === 'undefined'
        ? undefined
        : typeof message === 'string'
        ? message
        : '[Invalid errorMessage argument]'
    );
  else return input;
};
