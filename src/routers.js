const express = require("express");
const router = express();
const { createAccount, modifyBalance, makeTransfer, deleteAccount } = require("./functions.js");

router.use(express.json());
router.post("/account", createAccount);
router.put("/account", modifyBalance);
router.post("/transfers", makeTransfer);
router.delete("/transfers", deleteAccount);

module.exports = { router }
