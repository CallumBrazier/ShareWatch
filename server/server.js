const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const dotenv = require("dotenv");
const routesUrls = require("./routes/userRouter");
const stockRouteUrls = require("./routes/stockRouter");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(
  process.env.DB_Connection,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) throw err;
    console.log("Database connected successfully!");
  }
);

app.use(express.json()); //activated bodyparser in our application.
app.use(cors()); //Allows information be sent cross platform.
app.use("/users", routesUrls); //appends route names to /app in url e.g. homepage/app/signin.
app.use("/stocks", stockRouteUrls);

app.listen(port, (err) => {
  err
    ? console.log(`ERROR ${console.log(err)}`)
    : console.log(`running server on port ${port}`);
});
