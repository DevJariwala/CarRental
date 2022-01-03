import express from 'express'
import { addCar, deleteCar, getCars } from '../controllers/cars.js'

const router = express.Router()

router.post('/addCar',addCar)
router.get('/getCars',getCars)
router.patch('/deleteCar/:car_id',deleteCar)

export default router