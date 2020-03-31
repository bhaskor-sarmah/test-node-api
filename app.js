require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./src/router/user_router");
const { init } = require("./src/config/database_initializer");

const dbInit = init();

app.use(express.json());
app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started at port - " + process.env.PORT);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Resource Not Found");
  err.status = 404;
  res.status(404).json({
    success: 0,
    message: err.message
  });
});

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.status(500).json({
    success: 0,
    message: err.message
  });
});

// To get client IP address
// app.use(function(req, res, next) {
//   var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
//   console.log("Client IP:", ip);
//   next();
// });
