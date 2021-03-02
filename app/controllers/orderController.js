const { Customer, Seller, Order } = require('../models');

const orderController = {
  getOneOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findByPk(orderId, {
          // coder ce includer
        include: {
          association: 'cards',
          include: 'tags',
        },
        order: [['cards', 'position', 'ASC']],
      });
      if (order) {
        res.json(order);
      } else {
        res.status(404).json('Cant find list with id ' + orderId);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // modifier et coder celui là
  getSellerOrders: async (req, res) => {
    try {

    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  
  // modifier et coder celui là
  getCustomerOrders: async (req, res) => {
    try {

    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = orderController;