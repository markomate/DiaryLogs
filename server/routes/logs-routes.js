import express from "express"
import { loginRequired } from "../controllers/auth-controller.js"
import {getLogs, getLog, createLog, removeLog, updateLog} from '../controllers/logs-controller.js'

const router = express.Router()

router.use(loginRequired)

router.get("/logs", getLogs)

router.post("/logs", createLog)

router.get("/logs/:id", getLog)

router.delete("/logs/:id", removeLog)

router.put("/logs/:id", updateLog)

export default router