import bcrypt from "bcrypt";

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    return { error: error.message };
  }
};

export default securePassword;