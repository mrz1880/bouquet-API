const { Image } = require('../models');

const imageController = {
  editOneImage: async (request, response) => {
    try {
      const imageId = request.params.id;

      const image = await Image.findOne({
        where: {
          id: imageId,
        },
      });
      if (!image) {
        return console.log("Pas d'image avec id :", imageId);
      }

      const { url, product_id } = request.body;

      if (url) {
        image.url = url;
      }
      if (product_id) {
        image.product_id = product_id;
      }

      await image.save();

      response.status(200).json('Success');
    } catch (error) {
      console.log('Erreur');
    }
  },
};

module.exports = imageController;
