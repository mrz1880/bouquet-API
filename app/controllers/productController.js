const Product = require('../models/product');

const productController = {
    getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
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
      res.json(products);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId, {
        include: {
          association: 'cards',
          include: 'tags',
        },
        order: [['cards', 'position', 'ASC']],
      });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json('Cant find product with id ' + productId);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // il faut faire celui là aussi
  GetProductsFromSeller: async (req, res) => {
    try {
      
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = productController;
