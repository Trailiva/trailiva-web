export const extractTwoCharacter = (str) => {
  return str.charAt(0).concat(str.charAt(1));
};

export const extractErrorMessage = (error) => {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
};
