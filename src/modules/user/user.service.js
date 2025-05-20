import db from "../../models/index.js";
import { QueryTypes } from "sequelize";
const { sequelize } = db;

// Update user by ID
export const updateUserById = async (where, data) => {
  const setClause = Object.keys(data)
    .map((key) => `${key} = :${key}`)
    .join(", ");

  const query = `UPDATE users SET ${setClause} WHERE id = :id`;

  const replacements = { ...data, id: where.id };

  const [result] = await sequelize.query(query, {
    replacements,
    type: QueryTypes.UPDATE,
  });

  return result;
};

// Delete user by ID
export const deleteUserById = async (where) => {
  const query = `DELETE FROM users WHERE id = :id`;

  await sequelize.query(query, {
    replacements: { id: where.id },
    type: QueryTypes.DELETE,
  });

  return true;
};

// Find all users excluding password field
export const findUsers = async () => {
  const query = `SELECT  id, name, email FROM users`;
  const result = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  return result;
};

// //find user info by id
export const findUserInfoById = async ({ userId } = {}) => {
  let condition = "";
  let replacements = {};

  if (userId) {
    condition = ` WHERE u.id = :userId`;
    replacements.userId = userId;
  }

  const query = `
    SELECT
      u.id AS user_id,
      u.name AS user_name,
      u.email AS user_email,
      json_build_object(
        'id', pd.id,
        'user_id', pd.user_id,
        'phone', pd.phone
      ) AS profile_details,
      COALESCE(
        json_agg(
          json_build_object(
            'id', p.id,
            'user_id', p.user_id,
            'title', p.title
          )
        ) FILTER (WHERE p.id IS NOT NULL), '[]'::json
      ) AS posts
    FROM users u
    LEFT JOIN profiles pd ON u.id = pd.user_id
    LEFT JOIN posts p ON u.id = p.user_id AND p.is_deleted = false
    ${condition}
    GROUP BY u.id, pd.id;
  `;

  const result = await sequelize.query(query, {
    replacements,
    type: QueryTypes.SELECT,
    logging: console.log,
  });

  return {
    message: "Details fetched successfully",
    data: result.length > 0 ? result : null,
  };
};

//find all user info
export const userAllInfo = async () => {};
