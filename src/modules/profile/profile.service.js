
import { sequelize } from "../../config/db.js";

export const insertProfile = async (data) => {
  const columns = Object.keys(data).join(", ");
  const placeholders = Object.keys(data).map(key => `:${key}`).join(", ");

  const fullColumns = `${columns}, created_at, updated_at`;
  const fullPlaceholders = `${placeholders}, NOW(), NOW()`;

  const query = `
    INSERT INTO profiles (${fullColumns})
    VALUES (${fullPlaceholders})
    RETURNING *;
  `;

  const [result] = await sequelize.query(query, {
    replacements: data,
    type: sequelize.QueryTypes.INSERT,
  });

  return result;
};
