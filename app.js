const express = require("express");

// require("./src/db/mongoose.js");
const mongoose = require("mongoose");
const noteRouter = require("./src/routers/note-routers.js");
const userRouter = require("./src/routers/user-routers.js");

const app = express();

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");
  res.set("Access-Control-Allow-Methods", "*");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

//database
const dbConnect = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbConnect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database is connected successfully!");
  } catch (err) {}
};

app.use(express.json());

app.use(noteRouter);
app.use(userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectDB();
  console.log(`app running on port ${port}`);
});
