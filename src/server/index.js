const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const cors = require("cors");
const locationRouter = require("./routers/locationRouter");
const { corsOptions } = require("../utils/cors");

const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use("/locations", locationRouter);

module.exports = app;
