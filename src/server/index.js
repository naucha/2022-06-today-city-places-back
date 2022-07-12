const express = require("express");
const morgan = require("morgan");
const locationRouter = require("./routers/locationRouter");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/location", locationRouter);

module.exports = app;
