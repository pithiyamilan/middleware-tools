const express = require("express");
const auth = express.Router();
import {loginUser} from '../controllers/index';

//difine controller
auth.route("/login").post(loginUser);
auth.route("/logout").post(loginUser);

module.exports = auth;