const Log = require("./../models/adminModel");

exports.addLog = async (req, res) => {
  try {
    const newLog = await Log.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        log: newLog,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// GET all logs
exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json({
      status: "success",
      results: logs.length,
      data: {
        logs: logs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
