import express, { Router } from "express";
import { signUp, signIn } from '../controller/user.js'

const router = express.Router()

router.post('/Up', signUp);
router.post('/In', signIn);

export default router