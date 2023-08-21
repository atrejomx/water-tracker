export const validateInput = (
  inputName: keyof typeof patternLibrary,
  value: string
): boolean => {
  if (!value) {
    return true;
  }

  if (!patternLibrary[inputName]) {
    return true;
  }

  return patternLibrary[inputName].test(value);
};

export const patternLibrary: { [inputName: string]: RegExp } = {
  weight: /[0-9]{1,3}/g,
};
