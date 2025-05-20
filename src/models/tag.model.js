export default (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      tableName: "tags",
      underscored: true,
      paranoid: true,
    }
  );

  Tag.associate = (models) => {
    // Example association, uncomment and adjust if needed:
    // Tag.hasMany(models.Post, { foreignKey: "tagId" });
  };

  return Tag;
};
