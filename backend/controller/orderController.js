import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import { Cashfree } from 'cashfree-pg'

Cashfree.XClientId = process.env.CASHFREE_APP_ID
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX

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

// placing order using Cashfree
const placeOrderOnline = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            status: "Order Placed",
            paymentMethod: "cashfree",
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const user = await userModel.findById(userId)

        const orderRequest = {
            order_id: newOrder._id.toString(),
            order_amount: amount,
            order_currency: "INR",
            customer_details: {
                customer_id: userId,
                customer_name: user.name,
                customer_email: user.email,
                customer_phone: user.phone || "9999999999",
            },
            order_meta: {
                return_url: `${process.env.FRONTEND_URL}/verify-payment?order_id={order_id}`,
            },
        }

        const response = await Cashfree.PGCreateOrder("2023-08-01", orderRequest)

        res.json({
            success: true,
            order_id: newOrder._id,
            payment_session_id: response.data.payment_session_id,
        })

    } catch (error) {
        console.error("Cashfree error:", JSON.stringify(error.response?.data, null, 2))
        res.json({ success: false, message: error.message })
    }
}

// verify Cashfree payment after redirect
const verifyOrderCashfree = async (req, res) => {
    try {
        const { order_id } = req.body

        const response = await Cashfree.PGFetchOrder("2023-08-01", order_id)
        const cashfreeOrder = response.data

        if (cashfreeOrder.order_status === "PAID") {
            await orderModel.findByIdAndUpdate(order_id, { payment: true })
            await userModel.findOneAndUpdate(
                { _id: (await orderModel.findById(order_id)).userId },
                { cartData: {} }
            )
            res.json({ success: true, message: "Payment verified" })
        } else {
            await orderModel.findByIdAndDelete(order_id)
            res.json({ success: false, message: "Payment not completed" })
        }

    } catch (error) {
        console.error("Cashfree error:", JSON.stringify(error.response?.data, null, 2))
        res.json({ success: false, message: error.message })
    }
}

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

export { placeOrder, placeOrderOnline, verifyOrderCashfree, allOrders, userOrders, updateOrderStatus };