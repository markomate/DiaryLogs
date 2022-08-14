import {getLogs, getLog, createLog, removeLog, updateLog} from '../controllers/logs-controller.js'
import express from "express"
import { loginRequired } from '../controllers/auth-controller.js'
const router = express.Router()

router.get("/logs", getLogs)

router.get("/logs/_id", getLog)

router.use(loginRequired)

router.post("/logs", createLog)

router.delete("/logs/_id", removeLog)

router.put("/logs/_id", updateLog)

export default router