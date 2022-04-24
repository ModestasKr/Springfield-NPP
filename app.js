const express = require("express");
const cors = require("cors");

const usersRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/", (req,res)=> {
//     res.status(200).send("get metodo rezultatas")
// });

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
//   });

app.use("/api/v1/users", usersRoutes);

module.exports = app;
