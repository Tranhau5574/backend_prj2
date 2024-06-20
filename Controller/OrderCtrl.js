const Order = require('../Models/OrderModel');
const User = require('../Models/UserModel');
const nodemailer = require("nodemailer");

const OrderCtrl = {
    getAllOrders: async (req, res) => {
        try {
            const order = await Order.find();
            res.json(order);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    addOrder: async (req, res) => {
        const { userId, cartItems } = req.body; // Lấy dữ liệu từ req.body
        try {
            const productIds = cartItems.map(item => item._id);
            const newOrder = new Order({
                infor: userId, // Đặt userId vào trường infor
                product: productIds // Đặt cartItems vào trường product
            });
            const saveOrder = await newOrder.save();

            res.json({
                success: true,
                message: 'Order created successfully',
                order: saveOrder
            })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    viewOrderByUserId: async (req, res) => {
    try {
        const userId = res.user.id;
        console.log(userId);
         // Get the user ID from the request parameters
        const user = await User.findById(userId); // Find the user by their ID
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        const orders = await Order.find({ infor: userId }); // Find all orders associated with the user
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
},
    updateOrderStatus: async (req, res) => {
        const { orderId, newStatus } = req.body; // Lấy id của đơn hàng và trạng thái mới từ req.body
        try {
            // Tìm đơn hàng cần cập nhật
            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({ msg: "Order not found" });
            }

            // Cập nhật trạng thái mới
            order.status = newStatus;
            await order.save();

            res.json({
                success: true,
                message: "Order status updated successfully",
                order: order
            });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    
    

    sendOrderConfirmationEmail: async(req, res) => {
        const {email} = req.body;
        
        try {
            // Lấy thông tin người dùng từ cơ sở dữ liệu
    
    
            // Chuẩn bị nội dung email
            const emailContent = `
                <h1>Đơn hàng của bạn đã được đặt thành công</h1>
                <p>Thông tin đơn hàng:</p>
                <ul>
                  
                </ul>
                
                <p>Cảm ơn bạn đã mua hàng!</p>
            `;
    
            
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  user: "tranvanhaubg2003@gmail.com",
                  pass: "hwgx ujpa xvue esuf",
                  // ⚠️ Use environment variables set on the server for these values when deploying
                },
              });
           
    
            await transporter.sendMail({
                from: "tranvanhaubg2003@gmail.com",
                to: email,
                subject: 'Xác nhận đơn hàng',
                html: emailContent
            });
    
            console.log('Email sent successfully');
            res.json("order successfully")
        } catch (err) {
            console.error('Error sending email:', err);
        }
    }

};
   

module.exports = OrderCtrl;
