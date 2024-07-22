const mongoose = require("mongoose");

require("dotenv").config();

const URL = process.env.URL_MONGODB_ATLAS;

const database_connection = () => {
  mongoose
    .connect(URL, {})
    .then(() => {
      console.log("connection successfuly to mongodb atlas");
    })
    .catch(() => {
      console.log("connection failed to mongodb atlas");
    });
};

module.exports = database_connection;
