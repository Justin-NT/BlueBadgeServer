module.exports = (sequelize, DataTypes) => {
  const GameLog = sequelize.define("gameLog", {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    backgroundImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: true
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: true
    },
    releaseDate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    owner: {
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return GameLog;
};
