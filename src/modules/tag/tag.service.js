import db from "../../models/index.js";
import { QueryTypes } from "sequelize";
const { sequelize } = db;

//find tag by Id

//insert tag
export const insertTag = async (data) => {
  const columns = Object.keys(data).join(", ");
  const placeholders = Object.keys(data)
    .map((key) => `:${key}`)
    .join(", ");

  const query = `
    INSERT INTO tags (${columns})
    VALUES (${placeholders})
    RETURNING *;
  `;

  const [result] = await sequelize.query(query, {
    replacements: data,
    type: QueryTypes.INSERT,
  });

  return result;
};

//Find Tag By ID
export const findTagById = async (where) => {
  const query = `SELECT * FROM tags WHERE id = :tagId is_deleted = false `;
  const result = await sequelize.query(query, {
    replacements: { tagId: where.tagId },
    type: QueryTypes.SELECT,
  });
  return result[0];
};

//Find tags
export const findTags = async () => {
  const query = `SELECT * FROM tags WHERE is_deleted = false`;
  const result = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  return result;
};
