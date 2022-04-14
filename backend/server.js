const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(
  "mongodb+srv://Homerr:vlk2ZmmqVTs3FXP4@cluster0.rqxd5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

app.listen(4000, () => {
  console.log("listening for requests on port 4000");
});
