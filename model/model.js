const mongoose = require("mongoose");

const schemaAccount = new mongoose.Schema({ name: String, surname: String, email: String, balance: Number})

const modelAccount = new mongoose.model("Account", schemaAccount);

module.exports = {modelAccount}


