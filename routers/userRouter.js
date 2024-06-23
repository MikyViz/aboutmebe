import express from 'express';
import UserController from '../controllers/userControler.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

// User routes
router.post('/signUp', UserController.createUser);
// router.get('/getUser', auth, UserController.getUser);
// router.post('/logIn', UserController.logIn);
// router.put('/updateUser', auth, UserController.updateUser);
// router.delete('/deleteUser', auth, UserController.deleteUser);

export default router;
