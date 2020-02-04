const restaurantsController = require('../controllers').restaurants;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!'
  }));

  app.post('/api/restaurants', restaurantsController.create);
  app.get('/api/restaurants', restaurantsController.list);
};
