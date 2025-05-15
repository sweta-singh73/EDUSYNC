import {
  validateEmail,
  validateName,
  validatePassword,
} from "../validations/validation.js";

export const validateRequest = (schema) => (req, res, next) => {
  const { name, email, password } = req.body;

  let errors = [];

  // Validate Name
  if (name && !validateName(name)) {
    errors.push(
      "Name should be between 3 to 30 characters and contain only alphabets."
    );
  }

  // Validate Email
  if (email && !validateEmail(email)) {
    errors.push("Invalid email format.");
  }

  // Validate Password
  if (password && !validatePassword(password)) {
    errors.push(
      "Password must have at least 6 characters, one uppercase, one number, and one special character."
    );
  }

  if (errors.length) {
    return res.status(400).json({ error: errors });
  }

  next();
};
