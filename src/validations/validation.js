export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // Example: Password should have at least 6 characters, one number, one uppercase letter, and one special character
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(password);
};

export const validateName = (name) => {
  const regex = /^[a-zA-Z\s]{3,30}$/; // Name should be between 3-30 characters, only alphabets and spaces
  return regex.test(name);
};
