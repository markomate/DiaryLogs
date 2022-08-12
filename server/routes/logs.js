import express from "express";
import { getLogs, createLog } from "../controllers/logs.js";

const router = express.Router();

router.get('/', getLogs);
router.post('/', createLog);

export default router;
