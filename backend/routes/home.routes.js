import express from "express";
import { getAnswer, getMessages } from "../controllers/home.controller.js";

const router = express.Router();

router.post('/getAnswer', getAnswer);
router.get('/', getMessages);

export default router;