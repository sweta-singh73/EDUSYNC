import { findUser } from "../auth/auth.service.js";
import { deleteUserById, updateUserById } from "./user.service.js";

export const getUser = async (req, res) => {
  try {
    console.log("req.user:", req.user);

    const userId = req.user?.id;
    console.log("userId:", userId);

    if (!userId) {
      return res.status(400).json({ error: "User ID not found in request" });
    }

    const user = await findUser({ id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//update user
export const updateUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const updateData = req.body;

    await updateUserById({ id: userId }, updateData);

    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    await deleteUserById({ id: userId });
    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//get all user

const getUsers = async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}
