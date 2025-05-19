import {
  deleteProfileById,
  findProfile,
  insertProfile,
} from "./profile.service.js";

export const createProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const profile_pic = req.file?.path;
    const { phone, state } = req.body;

    const newProfile = await insertProfile({
      user_id: userId,
      profile_pic,
      phone,
      state,
    });

    return res.status(201).json({
      message: "Profile created successfully",
      data: newProfile,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//delete profile
export const deleteProfile = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const profile = await deleteProfileById({ id });
    res.status(200).json({ message: "Profile deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//get profile
export const getProfile = async (req, res) => {
  const userId = req.user.id;

  const id = req.params.id;
  try {
    const profile = await findProfile({ id });
    if (!profile) return res.status(400).json({ error: "Profile not found " });
    res.status(200).json({message: "Profile data fetch successfully!", data: profile});
  } catch (error) {
    return res.status({ error: error.message });
  }
};
