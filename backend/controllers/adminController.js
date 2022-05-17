const Logging = require("./../models/adminModel");

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