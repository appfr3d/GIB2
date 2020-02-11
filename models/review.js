module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stars: DataTypes.INTEGER
  }, {});

  Review.associate = (models) => {
    // associations can be defined here
    Review.belongsTo(models.Restaurant, {
      foreignKey: 'restaurantId',
      onDelete: 'CASCADE'
    });
  };

  return Review;
};
