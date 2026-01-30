import express from 'express'
const router = express.Router();
import cartController, { deleteCart, editCart, getCart } from '../app/api/controller/cartController.js';
router.post('/addtocart',cartController);
router.get('/getcart/:userId',getCart);
router.put('/editcart',editCart);
router.delete('/deletecart/:userId',deleteCart);
export default router;