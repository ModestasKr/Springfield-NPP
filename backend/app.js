const express = require("express");
const cors = require("cors");

const usersRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", usersRoutes);

module.exports = app;
