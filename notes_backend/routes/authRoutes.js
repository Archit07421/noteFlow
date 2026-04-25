const express = require('express');
const passport = require("passport");
const jwt = require("jsonwebtoken");

const routes = express.Router();

const {signup} = require('../controllers/authController');
const {postLogin}=require('../controllers/authController');

routes.post('/signup',signup);
routes.post('/login',postLogin);

// GOOGLE OAUTH

routes.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  );
  
  routes.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      session: false,
    }),
    (req, res) => {
      const user = req.user;
  
      const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
    }
  );

module.exports = routes;