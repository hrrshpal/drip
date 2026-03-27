import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'


// placing orders using COD 
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            status: "Order Placed",
            paymentMethod: "cod",
            payment: false,
            date: Date.now(),
        };
        
        const newOrder = new orderModel(orderData)
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} } );

        res.json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// placing order using Razorpay
const placeOrderRazorpay = async (req, res) => {};

// All orders data for admin panel 
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});

        res.json({success: true, orders})
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// user order data for frontend 
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success: true, orders})
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// update order status for admin panel
const updateOrderStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body

        await orderModel.findByIdAndUpdate(orderId, {status})

        res.json({success: true, message: "Order status updated successfully"})
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus };