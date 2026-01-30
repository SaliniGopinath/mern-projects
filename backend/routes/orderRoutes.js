import express from 'express'
import addressController, { addOrderController, getAddress, getOrders } from '../app/api/controller/orderController.js';
const router = express.Router();

router.post('/addaddress',addressController);
router.get('/getaddress/:userId',getAddress);
router.post('/addorder',addOrderController);
router.get('/getuser',getOrders);
export default router;