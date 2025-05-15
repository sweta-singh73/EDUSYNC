import { sequelize } from "../../config/db.js";

//Find User
export const findUser = async (where) => {
  const query = `SELECT * FROM users WHERE (:email IS NULL OR email = :email) AND (:id IS NULL OR id = :id)`;

  const result = await sequelize.query(query, {
    replacements: {
      email: where.email ?? null,
      id: where.id ?? null,
    },
    type: sequelize.QueryTypes.SELECT,
  });

  return result[0] || null;
};

//Insert New User
export const insertUser = async (data) => {
  const now = new Date();
  data.created_at = now;
  data.updated_at = now;

  const keys = Object.keys(data);
  const columns = keys.join(", ");
  const placeholders = keys.map((key) => `:${key}`).join(", ");

  const query = `INSERT INTO users (${columns}) VALUES (${placeholders})`;

  const result = await sequelize.query(query, {
    replacements: data,
    type: sequelize.QueryTypes.INSERT,
  });

  return result;
};
