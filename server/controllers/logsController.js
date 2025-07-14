import {getAllLogs, getLogById, addLog, deleteLog, changeLog} from '../utils/logsUtils.js'

export const getLogs = async (req, res) => {
  try {
    const logs = await getAllLogs().exec();
    res.status(200)
    res.send(logs)
  } catch (err) {
    res.status(500)
    return res.json({error: err.logs})
  }
}

export const getLog = async (req, res) => {
  try {
    const log = await getLogById(req.params.id).exec()
    res.status(200)
    res.send(log)
  } catch (err) {
    res.status(500)
    return res.json({error: "Log not found, wrong ID"})
  }
}

export const createLog = async (req, res) => {
  try {
    const log = await addLog(req).save();
    res.status(201)
    res.send(log)
  } catch (err) {
    res.status(500)
    return res.json({error: err.log})
  }
}

export const removeLog = async (req, res) => {
  try {
    await deleteLog(req.params.id).exec();
    res.status(200)
    return res.json({success: "Log deleted successfuly"})
  } catch (err) {
    res.status(404)
    return res.json({error: "Log not found, wrong ID"})
  }
}

export const updateLog = async (req, res) => {
  try {
    const log = await changeLog(req.params.id, req.body).exec();
    res.status(200)
    res.send(log)
  } catch (err) {
    res.status(404)
    return res.json({error: "Error"})
  }
}