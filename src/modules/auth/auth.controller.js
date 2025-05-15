import bcrypt from "bcrypt";

import { findUser, insertUser } from "./auth.service.js";
import securePassword from "../../utils/bcryptPassword.js";
import generateToken from "../../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await findUser({ email });

    if (existUser)
      return res
        .status(400)
        .json({ message: "User already registered, please login" });

    const hashedPassword = await securePassword(password);

    await insertUser({ name, email, password: hashedPassword });

    return res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUser({ email });

    if (!user) return res.status(400).json({ error: "User does not exist!" });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword)
      return res.status(400).json({ error: "Email or password is invalid!" });

    const token = await generateToken(user.id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
