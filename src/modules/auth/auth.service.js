import { sequelize } from "../../../config/db.js";

export const findUser = async (where) => {
  let query = `SELECT * FROM users`;
  let replacements = {};

  if (where.email) {
    query += ` WHERE email = :email`;
    replacements.email = where.email;
  } else if (where.id) {
    query += ` WHERE id = :id`;
    replacements.id = where.id;
  } else {
    throw new Error("Either email or id is required to find user");
  }

  const result = await sequelize.query(query, {
    replacements,
    type: sequelize.QueryTypes.SELECT,
  });

  return result[0] || null;
};

export const insertUser = async (data) => {
  const now = new Date();

  const query = `
    INSERT INTO users (name, email, password, created_at, updated_at)
    VALUES (:name, :email, :password, :created_at, :updated_at)
  `;

  const result = await sequelize.query(query, {
    replacements: {
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: now,
      updated_at: now,
    },
    type: sequelize.QueryTypes.INSERT,
  });
  return result;
};
