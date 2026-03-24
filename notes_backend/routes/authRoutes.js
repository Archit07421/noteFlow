const express = require('express');

const routes = express.Router();

const {signup} = require('../controllers/authController');
const {postLogin}=require('../controllers/authController');

routes.post('/signup',signup);
routes.post('/login',postLogin);

module.exports = routes;