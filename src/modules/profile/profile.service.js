import { sequelize } from "../../config/db.js";

export const insertProfile = async (data) => {
  const columns = Object.keys(data).join(", ");
  const placeholders = Object.keys(data)
    .map((key) => `:${key}`)
    .join(", ");

  const query = `
    INSERT INTO profiles (${columns})
    VALUES (${placeholders})
    RETURNING *;
  `;

  const result = await sequelize.query(query, {
    replacements: data,
    type: sequelize.QueryTypes.INSERT,
  });

  return result[0];
};

//delete profile
export const deleteProfileById = async (where) => {
  const query = `
  UPDATE profiles 
  SET deleted_at = NOW(), is_deleted = true 
  WHERE id = :id
`;

  const result = await sequelize.query(query, {
    replacements: { id: where.id },
    type: sequelize.QueryTypes.DELETE,
  });
  return result;
};

//find profile
export const findProfile = async (where) => {
  const query = `SELECT * FROM profiles WHERE id = :id AND is_deleted = false`;
  const result = await sequelize.query(query, {
    replacements: { id: where.id },
  });
  return result[0];
};
