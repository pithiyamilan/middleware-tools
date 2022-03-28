const express = require("express");
const auth = express.Router();
import {fetchCibilData1, loginUser,makeRequest} from '../controllers/index';

//difine controller
auth.route("/login").post(loginUser);
auth.route("/logout").post(loginUser);
auth.route("/fetch-cibil").post(fetchCibilData1);
auth.route("/test-cibil").get(makeRequest);

module.exports = auth;