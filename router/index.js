import express, { Router } from "express";
import { temperaturePost,temperatureGet,temperatureForArduino } from '../controller/temprature.js'

const router = express.Router()

router.post('/post', temperaturePost);
router.get('/', temperatureGet);
router.get('/engine', temperatureForArduino);

export default router