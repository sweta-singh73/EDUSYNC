import { sequelize } from "../../config/db.js";

export const insertPost = async (data) => {
  const columns = Object.keys(data).join(", ");
  const placeholders = Object.keys(data).map((key) => `:${key}`).join(", ");

  const query = `
    INSERT INTO posts (${columns})
    VALUES (${placeholders})
    RETURNING *;
  `;

  const [result] = await sequelize.query(query, {
    replacements: data,
    type: sequelize.QueryTypes.INSERT,
  });

  return result;
};

// delete post by id 
export const deletePostById = async (where) => {
  const query = `
    UPDATE posts
    SET deleted_at = NOW()
    WHERE id = :id AND user_id = :user_id AND deleted_at IS NULL
  `;

  const [result] = await sequelize.query(query, {
    replacements: {
      id: where.id,
      user_id: where.user_id,
    },
    type: sequelize.QueryTypes.UPDATE,
  });

  return result;
};
