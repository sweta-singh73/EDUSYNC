export default (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",  // Use the table name as string here
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      profilePic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      state: {
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
      tableName: "profiles",
      underscored: true,
      paranoid: true,
    }
  );

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Profile;
};
