const { default: mongoose } = require("mongoose");

const mongoURI = process.env.DATABASE;
if (!mongoURI) {
  return console.log("No Mongodb url");
}

mongoose
  .connect(mongoURI, { family: 4 })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
