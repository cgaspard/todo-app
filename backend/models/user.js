const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  return sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      facebookId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    { underscored: true }
  );
}

module.exports = User;
