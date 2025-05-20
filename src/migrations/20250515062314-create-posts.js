"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("posts", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    tag_ids: {
      type: Sequelize.ARRAY(Sequelize.INTEGER), // array of integers
      allowNull: false,
      // Remove foreign key references here — Postgres doesn’t support FK on arrays
      // references: {
      //   model: "tags",
      //   key: "id",
      // },
      // onDelete: "CASCADE",
      // onUpdate: "CASCADE",
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("posts");
}
