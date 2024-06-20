const Product = require('../Models/ProductModel');


const ProductCtrl = {


    addProduct: async (req, res) => {
        const { name, description, price, image } = req.body;

        try {
            // Check if the product already exists
            const existingProduct = await Product.findOne({ name });
            if (existingProduct) return res.status(400).json({ msg: 'Product already exists' });

            // Create a new product
            const newProduct = new Product({
                name,
                description,
                price,
                image
            });

            await newProduct.save();

         
            res.json({ msg: 'Product added successfully' });

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    updateProduct: async (req,res) =>{
        try {
            const { title, price, description,  images } = req.body; 
      
          await Product.findOneAndUpdate({_id: req.params.id},{
            title, price, description,  images
          })
          return res.json({msg:"Updated the Product"})
        } catch (err) {
            return res.status(500).json({msg : err.message})
        }
    },
    deleteProduct: async (req, res) => {
            try {
                await Product.findByIdAndDelete(req.params.id);
                res.json({msg: 'Deleted Product'});
            } catch (err) {
                res.status(500).json({ msg: err.message });
            }
    },

    viewProduct: async (req, res) => {
        try {

            const { id } = req.params;

            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({ msg: 'Product not found' });
            }
            return res.json(product);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    searchProducts: async (req, res) => {
        try {
            const { nameproducts } = req.params;
            // const products = await Product.find({ name: { $regex: nameproduct, $options: 'i' } });
            const products = await Product.find({ name: { $regex: nameproducts, $options: 'i' } });
            res.json(products);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
    
}
module.exports = ProductCtrl;