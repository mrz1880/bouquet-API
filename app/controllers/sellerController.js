const Seller = require('../models/seller');

const sellerController = {
    getAllSellers: async (req, res) => {
    try {
      const sellers = await Seller.findAll({
          //il faut faire les include dans les deux fonctions(celle là et ligne 28)
        include: {
          association: 'cards',
          include: 'tags',
        },
        order: [
          ['position', 'ASC'],
          ['cards', 'position', 'ASC'],
        ],
      });
      res.json(sellers);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneSeller: async (req, res) => {
    try {
      const sellerId = req.params.id;
      const seller = await Seller.findByPk(sellerId, {
        include: {
          association: 'cards',
          include: 'tags',
        },
        order: [['cards', 'position', 'ASC']],
      });
      if (seller) {
        res.json(seller);
      } else {
        res.status(404).json('Cant find seller with id ' + sellerId);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = sellerController;