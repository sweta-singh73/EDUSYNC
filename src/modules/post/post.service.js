import db from "../../models/index.js";
import { QueryTypes } from "sequelize";
const { sequelize } = db;

//insert
export const insertPost = async (data) => {
  const columns = Object.keys(data).join(", ");
  const placeholders = Object.keys(data)
    .map((key) => `:${key}`)
    .join(", ");

  const query = `
    INSERT INTO posts (${columns})
    VALUES (${placeholders})
    RETURNING *;
  `;

  const [result] = await sequelize.query(query, {
    replacements: data,
    type: QueryTypes.INSERT,
  });

  return result;
};

// delete post by id
export const deletePostById = async (where) => {
  const query = `
  UPDATE posts 
  SET deleted_at = NOW(), is_deleted = true 
  WHERE id = :id
`;

  const result = await sequelize.query(query, {
    replacements: {
      id: where.id,
    },
    type: QueryTypes.UPDATE,
  });

  return result;
};

//update by post id
export const updatePostById = async (where, updatedata) => {
  const setClause = Object.keys(updatedata)
    .map((key) => `${key} = :${key}`)
    .join(", ");

  const query = `UPDATE posts SET ${setClause} WHERE id = :id`;

  const replacements = { ...updatedata, id: where.id };

  const result = await sequelize.query(query, {
    replacements,
    type: QueryTypes.UPDATE,
  });

  return result;
};

//find single post
export const findPost = async (where) => {
  const query = `
    SELECT 
      posts.id,
      posts.title,
      posts.content,
      JSON_BUILD_OBJECT(
        'id', tags.id,
        'title', tags.title
      ) AS tag_details
    FROM posts
    JOIN tags ON posts.tag_id = tags.id
    WHERE posts.id = :id
      AND posts.is_deleted = false
      AND tags.is_deleted = false
  `;

  const result = await sequelize.query(query, {
    replacements: { id: where.id },
    type: sequelize.QueryTypes.SELECT,
  });

  return result[0];
};

export const findPosts = async () => {
  const query = `
    SELECT 
      posts.id,
      posts.title,
      posts.content,
      JSON_BUILD_OBJECT(
        'id', tags.id,
        'title', tags.title
      ) AS tag_details
    FROM posts
    JOIN tags ON posts.tag_id = tags.id
    WHERE posts.is_deleted = false
      AND tags.is_deleted = false
  `;

  const result = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
  });

  return result;
};
