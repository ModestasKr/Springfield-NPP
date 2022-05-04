const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const usersRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/users", authRoutes);

module.exports = app;
