const {Product, Image, Seller } = require('../models');

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll({ 
        order: [['id', 'ASC']],       
        include : ['category', 'images', {
          model: Seller,
          as: 'seller',
          attributes: { exclude: ['password'] }
        }]
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
          include : ['category', 'images', {
            model: Seller,
            as: 'seller',
            attributes: { exclude: ['password'] }
          }]
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
        include : ['category', 'images', {
          model: Seller,
          as: 'seller',
          attributes: { exclude: ['password'] }
        }],
        order: [
          ['id', 'ASC'],
        ],
        }) 
      if (products) {
        res.status(200).json(products)
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  addNewProduct: async (request, response) => {
    try {
      sellerId = request.params.id;
      
      if (sellerId != request.user.userId || request.user.role !== 'seller') {
        return response.status(401).json('You have no right to make this action');
      }

      const {reference , name , description , stock , price , seller_id , category_id , images} = request.body;
      
      // images must be an array
      if(reference && name && description && stock && price && seller_id && category_id && images) {
        await Product.create({
          reference: reference,
          name: name,
          description: description,
          stock: stock,
          price: price,
          seller_id: seller_id,
          category_id: category_id
        });

        let number;
        await Product.count().then(num => {
          number = num
        })

        
        for (const image of images) {
          await Image.create({
            url: image,
            product_id: number
          })         
        }
        
        response.status(200).json('success');
      } else {
        response.status(400).json('Donn??es manquantes')
      }
      
    } catch (error) {
      console.trace(error);
      response.status(500).json(error.toString());
    }
  },

  // editOneProduct : async (request, response) => {
  //   try {
  //     const sellerId = request.params.Sid;
  //     const productId = request.params.Pid;

  //     // const product = await Product.findOne({
  //     //   where : {
  //     //     id: productID
  //     //   }
  //     // })

  //     // { url, product_id}
      
  //     // if (firstname) {
  //     //     product.url = url;
  //     // }
  //     // if (lastname) {
  //     //     customer.lastname = lastname;
  //     // }
  //     //await customer.save();



  //   } catch (error) {
  //     console.log('Erreur')
  //   }
  // }
};

module.exports = productController;
