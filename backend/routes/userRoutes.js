import express from 'express'
const router = express.Router();
import signupController, {deleteUser, getUserById, getUsers, loginController} from '../app/api/controller/userController.js';
router.post('/signup',signupController);
router.post('/login',loginController);
router.get('/getuser',getUsers);
router.get('/getuserbyid/:userId',getUserById);
router.delete('/deleteuser/:id',deleteUser);
export default router;