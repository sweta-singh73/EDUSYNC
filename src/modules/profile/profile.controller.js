import { insertProfile } from "./profile.service.js";

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
