import express from 'express'
const router = express.Router();
import addproductController, { addadminController, addcategoryController, deleteAdmin, getAdmin, getCategories, getProducts } from '../app/api/controller/adminController.js';
router.post('/addproduct',addproductController);
router.get('/getproducts',getProducts);
router.post('/addadmin',addadminController);
router.get('/getadmin',getAdmin);
router.delete('/deleteadmin/:id',deleteAdmin);
router.post('/addcategory',addcategoryController);
router.get('/getcategory',getCategories);
export default router;