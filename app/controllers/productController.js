const Product = require('../models/product');

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll({        
        include : 'category'
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
            include : 'category'
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

  getProductsFromSeller: async (req, res) => {
    try {
      sellerId = req.params.id;
      const products = await Product.findAll({
        where : {
          seller_id : sellerId
        },
        include : 'category'
        }) 
      if (products) {
        res.status(200).json(products)
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  addNewProduct: async (req, res) => {
    try {
      sellerId = req.params.id;

      if (sellerId != req.user.userId || req.user.role !== 'seller') {
        return res.status(401).json('You have no right to make this action');
      }
      const products = await Product.findAll({
        where : {
          seller_id : sellerId
        },
        include : 'category'
      }) 
      if (products) {
        res.status(200).json(products)
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = productController;
