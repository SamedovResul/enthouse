import express, { Router } from "express";
import { temperaturePost,temperatureGet } from '../controller/temprature.js'

const router = express.Router()

router.post('/post', temperaturePost);
router.get('/', temperatureGet);

export default router