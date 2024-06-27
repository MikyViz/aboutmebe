import express from 'express';
import ReviewController from '../controllers/ReviewControler.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.post('/add', auth, ReviewController.addReview);

export default router;
