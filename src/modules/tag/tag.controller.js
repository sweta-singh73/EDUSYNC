import { findTagById, findTags, insertTag } from "./tag.service.js";

export const createTag = async (req, res) => {
  console.log("req body", req.body);
  const userId = req.user.id;
  console.log("userId", userId);
  try {
    const { title } = req.body;
    const tag = await insertTag({
      title,
    });
    res.status(200).json({ message: "Tag addedd successfully", data: tag });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTag = async (req, res) => {
  const userId = req.user.id;
  const tagId = req.params.id;
  try {
    const tag = await findTagById({ tagId });
    res.status(200).json({ message: "Tag fetch successfully!", data: tag });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTags = async (req, res) => {
  const userId = req.user.id;
try {
  const tags = await findTags();
  res.status(200).json({message: "tags fetch successfully", data: tags});
} catch (error) {
  res.status(500).json({ error: error.message });
}
}