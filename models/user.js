module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return User;
};
