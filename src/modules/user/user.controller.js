import { findUser } from "../auth/auth.service.js";
import {
  deleteUserById,
  findUserInfoById,
  findUsers,
  updateUserById,
} from "./user.service.js";

// Get current logged-in user details
export const getUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await findUser({ id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update current logged-in user
export const updateUser = async (req, res) => {
  const userId = req.user.id;
  const updateData = req.body;

  try {
    await updateUserById({ id: userId }, updateData);

    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete current logged-in user
export const deleteUser = async (req, res) => {
  const userId = req.user.id;

  try {
    await deleteUserById({ id: userId });

    return res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all users (admin access assumed)
export const getUsers = async (req, res) => {
  try {
    const users = await findUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found!" });
    }

    return res.status(200).json({
      message: "Users fetched successfully!",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//get api to fetch user details , post details and profile details

export const getAllData = async (req, res) => {
  const userId = req.user.id;
  try {
    const userAllDetails = await findUserInfoById({ userId });
    res
      .status(200)
      .json({ message: "details fetch successfully", data: userAllDetails });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
