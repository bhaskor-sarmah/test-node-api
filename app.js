require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./src/router/user_router");

app.use(express.json());
app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started at port - " + process.env.PORT);
});
