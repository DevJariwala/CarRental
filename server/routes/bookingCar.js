import express from 'express'
import { bookcar, getMyBookings } from '../controllers/bookCar.js';

const router = express.Router();

router.post('/bookcar',bookcar)
router.post('/myBookings/:user_id',getMyBookings)

export default router