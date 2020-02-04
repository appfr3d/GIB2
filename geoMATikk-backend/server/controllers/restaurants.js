const Restaurant = require('../models').Restaurant;

module.exports = {
  create (req, res) {
    const { name, longitude, latitude, price_class, food_type, website } = req.body;
    return Restaurant
      .create({
        name,
        longitude,
        latitude,
        price_class: (price_class === undefined) ? null : price_class,
        food_type: (food_type === undefined) ? null : food_type,
        website: (website === undefined) ? null : website
      })
      .then(restaurant => res.status(201).send(restaurant))
      .catch(error => res.status(400).send(error));
  },

  list (req, res) {
    return Restaurant
      .findAll()
      .then(restaurants => res.status(200).send(restaurants))
      .catch(error => res.status(400).send(error));
  }
};
