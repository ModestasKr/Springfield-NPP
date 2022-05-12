const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rqxd5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { autoIndex: false }
);

app.listen(4000, () => {
  console.log("listening for requests on port 4000");
});
