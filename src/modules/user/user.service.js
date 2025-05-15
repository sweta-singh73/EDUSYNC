import { sequelize } from "../../config/db.js";

// Update user by ID
export const updateUserById = async (where, data) => {
  const setClause = Object.keys(data)
    .map((key) => `${key} = :${key}`)
    .join(", ");

  const query = `UPDATE users SET ${setClause} WHERE id = :id`;

  const replacements = { ...data, id: where.id };

  const [result] = await sequelize.query(query, {
    replacements,
    type: sequelize.QueryTypes.UPDATE,
  });

  return result;
};

// Delete user by ID
export const deleteUserById = async (where) => {
  const query = `DELETE FROM users WHERE id = :id`;

  await sequelize.query(query, {
    replacements: { id: where.id },
    type: sequelize.QueryTypes.DELETE,
  });

  return true;
};

// Find all users excluding password field
export const findUsers = async () => {
  const columnsResult = await sequelize.query(
    `SELECT column_name FROM information_schema.columns 
     WHERE table_name = 'users' AND column_name != 'password'`,
    { type: sequelize.QueryTypes.SELECT }
  );

  const columns = columnsResult.map((col) => `"${col.column_name}"`).join(", ");

  const query = `SELECT ${columns} FROM users`;

  const result = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
  });

  return result;
};
