import logContent from "../models/logContent.js";

export const getLogs = async (req, res) => {
  try {
    const LogContents = await logContent.find();

    console.log(LogContents);

    res.status(200).json(LogContents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createLog = async (req, res) => {
  const log = req.body;

  const newLog = new logContent(log);

  try {
    await newLog.save();

    res.status(201).json(newLog);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
