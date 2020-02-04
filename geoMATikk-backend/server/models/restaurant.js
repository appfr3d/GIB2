module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    price_class: DataTypes.INTEGER,
    food_type: DataTypes.STRING,
    website: DataTypes.STRING
  }, {});

  Restaurant.associate = (models) => {
    // associations can be defined here
    Restaurant.hasMany(models.Review, {
      foreignKey: 'restaurantId',
      as: 'Review'
    });
  };

  return Restaurant;
};
