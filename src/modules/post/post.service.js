import { sequelize } from "../../config/db.js";

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
    type: sequelize.QueryTypes.INSERT,
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
    type: sequelize.QueryTypes.UPDATE,
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
    type: sequelize.QueryTypes.UPDATE,
  });
  
  return result;
};

//find single post 
export const findPost = async (where) => {
  const query = `SELECT * FROM posts WHERE id = :id AND is_deleted = false`;
const result = await sequelize.query(query, {
  replacements: {id: where.id},
  type: sequelize.QueryTypes.SELECT
});
return result[0];
}

//find all post 
export const findPosts = async (where) => {
  const query = `
    SELECT * FROM posts 
    WHERE user_id = :user_id AND is_deleted = false
  `;
const result = await sequelize.query(query, {
  replacements: {user_id: where.user_id},
  type: sequelize.QueryTypes.SELECT
});
return result;
}