import {Log} from '../models/log.js'

export const getAllLogs = () => Log.find()

export const getLogById = (id) => Log.findById(id)

export const addLog = (req) => {
  let date = Date.now()
  req.body.posted = date
  req.body.username = req.user.username
  return Log(req.body)
}

export const deleteLog = (id) => Log.findByIdAndRemove(id)

export const changeLog = (id, body) => {
  let date = Date.now()
  body.posted = date
  return Log.findByIdAndUpdate(id, body, {new: true})
}