import { deletePostById, insertPost } from "./post.service.js";

export const createPost = async (req, res) => {
  const userId = req.user.id;
  try {
    const { title, content } = req.body;

    const newPost = await insertPost({
      user_id: userId,
      title,
      content,
    });

    return res.status(201).json({
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//delete post
export const deletePost = async (req, res) => {
  const user_id = req.user.id;
  const id = req.params.id;

  try {
    const result = await deletePostById({ id, user_id });

    if (result === 0) {
      return res.status(404).json({ message: "Post not found or already deleted." });
    }

    return res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

