const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const CookieParser = require("cookie-parser");
const authRouter = require("../routes/authRouter");
const userRouter = require("../routes/userRouter");
const adminRouter = require("../routes/adminRouter");
const organiserRouter = require("../routes/organiserRouter");
const paymentRoutes = require("../routes/paymentRoutes");
const passRouter = require("../routes/passRouter");
const app = express();

app.use(express.json());
app.use(CookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "https://fluffy-cajeta-78a763.netlify.app",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/user", userRouter);

app.use("/api/v1/admin", adminRouter);

app.use("/api/v1/organiser", organiserRouter);

app.use("/api/v1/payment", paymentRoutes);

// app.use("/api/v1/pass", passRouter);

module.exports = app;
