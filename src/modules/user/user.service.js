import { sequelize } from "../../../config/db.js";

//update user by id
export const updateUserById = async (where, data) => {
  if (!where?.id) {
    throw new Error("User ID is required to update a user");
  }

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

//delete user by id
export const deleteUserById = async (where) => {
  if (!where?.id) {
    throw new Error("User ID is required for deletion");
  }

  const query = `DELETE FROM users WHERE id = :id`;

  await sequelize.query(query, {
    replacements: { id: where.id },
    type: sequelize.QueryTypes.DELETE,
  });

  return true;
};
