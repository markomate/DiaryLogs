import {getAllLogs, getLogById, addLog, deleteLog, changeLog} from '../utils/logs-utils.js'

export const getLogs = (req, res) => {
  getAllLogs().exec((err, logs) => {
    if (err) {
      res.status(500)
      return res.json({error: err.logs})
    } else {
      res.status(200)
      res.send(logs)
    }
  })
}

export const getLog = (req, res) => {
  getLogById(req.params.id).exec((err, log) => {
    if (err) {
      res.status(500)
      return res.json({error: "Log not found, wrong ID"})
    } else {
      res.status(200)
      res.send(log)
    }
  })
}

export const createLog = (req, res) => {
  addLog(req).save((err, log) => {
    if (err) {
      res.status(500)
      return res.json({error: err.log})
    } else {
      res.status(201)
      res.send(log)
    }
  })
}

export const removeLog = (req, res) => {
  deleteLog(req.params.id).exec((err) => {
    if (err) {
      res.status(404)
      return res.json({error: "Log not found, wrong ID"})
    } else {
      res.status(200)
      return res.json({success: "Log deleted successfuly"})
    }
  })
}

export const updateLog = (req, res) => {
  changeLog(req.params.id, req.body).exec((err, log) => {
    if (err) {
      res.status(404)
      return res.json({error: "Error"})
    } else {
      res.status(200)
      res.send(log)
    }
  })
}