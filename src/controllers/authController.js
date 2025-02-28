const passport = require("passport");

exports.googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

exports.googleCallback = passport.authenticate("google", { failureRedirect: "/login" }), 
  (req, res) => {
    res.redirect("/dashboard");
  };
