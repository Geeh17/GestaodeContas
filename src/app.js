const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("./config/passport");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const contaRoutes = require("./routes/contaRoutes");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "seusegredoaqui",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/contas", contaRoutes);
app.get("/dashboard", (req, res) => {
    res.send("Bem-vindo ao Dashboard!");
  });
  

module.exports = app;
