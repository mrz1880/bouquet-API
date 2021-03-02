const Customer = require('../models/customer');

const customerController = {
  getOneCustomer: async (req, res) => {
    try {
      const customerId = req.params.id;
      const customer = await Customer.findByPk(customerId, {
          //coder les include
        include: {
          association: 'cards',
          include: 'tags',
        },
        order: [['cards', 'position', 'ASC']],
      });
      if (customer) {
        res.json(customer);
      } else {
        res.status(404).json('Cant find list with id ' + customerId);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = customerController;