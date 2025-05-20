import {
  deletePostById,
  findPost,
  insertPost,
  updatePostById,
} from "./post.service.js";

//create post
export const createPost = async (req, res) => {
  const userId = req.user.id;
  try {
    let { tagIds, title, content } = req.body;

    const newPost = await insertPost({
      user_id: userId,
      tag_ids: tagIds,
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
    const result = await deletePostById({ id });

    if (result === 0) {
      return res
        .status(404)
        .json({ message: "Post not found or already deleted." });
    }

    return res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//update post
export const updatePost = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const updateData = {
      title: req.body.title,
      content: req.body.content,
    };
    const post = await updatePostById({ id }, updateData);
    res.status(200).json({ message: "User data update successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//get post
export const getPost = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const post = await findPost({ id });

    if (!post) return res.status(400).json({ error: "Post not found!" });
    res.status(200).json({ message: "Post fetch successfully", data: post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//get All posts
export const getPosts = async (req, res) => {
  const user_id = req.user.id;
  try {
    const posts = await findPost();
    if (!posts) {
      return res.status(400).json({ error: "Posts not found!" });
    }
    res
      .status(200)
      .json({ message: "Posts fetched successfully", data: posts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
