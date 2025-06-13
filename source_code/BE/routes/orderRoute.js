import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderVnpay, vnpayReturn, allOrder, userOrders, updateStatus, verifyStripe, totalRevenue, revenueByDay, revenueByMonth, revenueByProduct, requestReturnOrder, processReturnOrder, getReturnOrders } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter = express.Router();

//Admin Features
orderRouter.post('/list', adminAuth, allOrder);
orderRouter.post('/status', adminAuth, updateStatus);

//Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/vnpay', authUser, placeOrderVnpay);
orderRouter.get("/vnpay_return", vnpayReturn);

//User Features
orderRouter.post('/userorders', authUser, userOrders);

// verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)
//order route
orderRouter.get('/revenue', adminAuth, totalRevenue);
orderRouter.get('/revenue-by-day', adminAuth, revenueByDay);
orderRouter.get('/revenue-by-month', adminAuth, revenueByMonth);
orderRouter.get('/revenue-by-product', adminAuth, revenueByProduct);

// Đổi trả/hoàn tiền
orderRouter.post("/return-request", authUser, requestReturnOrder); // user gửi yêu cầu
orderRouter.post("/process-return", adminAuth, processReturnOrder); // admin xử lý
orderRouter.get("/return-orders", adminAuth, getReturnOrders); // admin lấy danh sách

export default orderRouter;
// 12"35
