export const isEmpty = (strEmpty: string) => {
  return strEmpty.trim() === '';
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  const isEmailValid =
    !emailRegex.test(String(email).toLowerCase()) || isEmpty(email);
  return isEmailValid;
};

export const isValidMobileNumber = (number: string) => {
  const mobileRegex = /^-?([0-9]{10})?$/;
  const isMobileNumberValid = !mobileRegex.test(number) || isEmpty(number);
  return isMobileNumberValid;
};

const validations = {
  isValidEmail,
  isValidMobileNumber,
  isEmpty,
};

export default validations;
