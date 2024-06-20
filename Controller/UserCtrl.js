const User = require('../Models/UserModel');
const Product = require('../Models/ProductModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserCtrl = {
    signup: async (req, res) => {
        try {

            const { username, password, email } = req.body;
            const checkuser = await User.findOne({ username });
            if (checkuser) return res.status(400).json({ msg: 'User existed' });

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: hashPassword
            });

            await newUser.save();
            return res.json({ msg: 'Signup successful' })
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username })
            if (!user) return res.status(400).json({ msg: 'user doe not exist' })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return alert.json({ msg: 'incorrect password' })
            const token = jwt.sign({ id: user._id }, process.env.TOKEN, { expiresIn: '1h' });

            return res.json({ token });
        } catch (err) {
            res.status(500).json({ msg: err.message });

        }



    },
    logout: async (req, res) => {
        try {
            res.clearCookie('token');
            res.json({ msg: 'Logged out successfully' });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findById(res.user.id).select('-password');
            if (!user) return res.status(400).json({ msg: "User not found" });
            return res.json(user);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    addToCart: async (req, res) => {
        try {
            const { productId } = req.body;

            const userId = res.user.id;

            const product = await Product.findById(productId);
            if (!product) return res.status(404).json({ msg: 'Product not found' });

            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ msg: 'User not found' });


            user.cart.push(product._id);
            await user.save();

            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    deleteFromCart: async (req, res) => {
        try {
            const { productId } = req.body;

            const userId = res.user.id;

            const product = await Product.findById(productId);
            if (!product) return res.status(404).json({ msg: 'Product not found' });

            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ msg: 'User not found' });
            user.cart = user.cart.filter(cartItem => cartItem.toString() !== product._id.toString());
            await user.save();

            res.json({ success: true });

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    deleteAllCart: async (req, res) => {
        try {
            const userId = res.user.id;

            const user =await User.findById(userId);
            if (!user) return res.status(404).json("user not found");
            user.cart = [];
            await user.save();
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getCart: async (req, res) => {
        try {
            const userId = res.user.id;
            const user = await User.findById(userId).populate('cart'); // Lấy danh sách sản phẩm trong giỏ hàng

            res.json(user.cart);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    

}

module.exports = UserCtrl;