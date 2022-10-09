export const encodeEmail = (email) => {
  const replaceDot = email.split('.').join('%dot%');
  const encodedEmail = encodeURIComponent(replaceDot);

  return encodedEmail;
};
