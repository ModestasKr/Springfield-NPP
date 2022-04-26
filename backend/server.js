const mongoose = require("mongoose");
const app = require("./app");

const DB =
  "mongodb+srv://Homerr:vlk2ZmmqVTs3FXP4@cluster0.rqxd5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Prisijungta prie DB...:)");
  });

  const port = 4000;
  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
