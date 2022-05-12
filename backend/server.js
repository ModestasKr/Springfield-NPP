const mongoose = require("mongoose");
const app = require("./app");

const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "./process.env"),
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("listening for requests on port 4000");
});
