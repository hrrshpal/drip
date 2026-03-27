import express from 'express'
import { allOrders, placeOrder, placeOrderRazorpay, updateOrderStatus, userOrders } from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//Admin features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateOrderStatus)

//Payment features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

//User feature
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter