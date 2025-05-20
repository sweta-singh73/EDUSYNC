import db from "../../models/index.js";
import { QueryTypes } from "sequelize";
const { sequelize } = db;


export const insertPost = async (data) => {
  const replacements = {};
  for (const key in data) {
    if (Array.isArray(data[key])) {
      replacements[key] = `{${data[key].join(",")}}`;
    } else {
      replacements[key] = data[key];
    }
  }
  const columns = Object.keys(replacements).join(", ");
  const placeholders = Object.keys(replacements)
    .map((key) => `:${key}`)
    .join(", ");

  const query = `
    INSERT INTO posts (${columns})
    VALUES (${placeholders})
    RETURNING *;
  `;

  const [result] = await sequelize.query(query, {
    replacements,
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

//find all post and find post by id 
export const findPost = async (where = {}) => {
  const { id } = where;
  const query = `
    SELECT 
      p.id AS post_id,
      p.title AS post_title,
      p.content AS post_content,
      JSON_BUILD_OBJECT(
        'id', t.id,
        'title', t.title
      ) AS tag_details
    FROM posts p
    JOIN tags t ON p.tag_id = t.id
    WHERE p.is_deleted = false
      AND t.is_deleted = false
      ${id ? 'AND p.id = :id' : ''}
  `;

  const result = await sequelize.query(query, {
    replacements: id ? { id } : {},
    type: sequelize.QueryTypes.SELECT,
  });

  return id ? result[0] : result;
};
