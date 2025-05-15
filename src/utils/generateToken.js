import JWT from "jsonwebtoken";


// ========================  Create Token ========================

const generateToken = async (id) => {
  try {
    let token = JWT.sign({ id: id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    return token;
  } catch (error) {
    return { error: error.message };
  }
};

export default generateToken;
