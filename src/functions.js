const mongoose = require("mongoose");
const { modelAccount } = require("../model/model");

async function createAccount(req, res) {
    try {
        const nAccount = new modelAccount({ name: req.body.name, surname: req.body.surname, email: req.body.email, balance: req.body.balance });
        await nAccount.save();
        res.status(200).json(`The account of ${nAccount.name} ${nAccount.surname} has been created successfully`);
    } catch (error) {
        console.log(error);
    }
}

async function modifyBalance(req, res) {
    try {
        const mBalance = await modelAccount.findOne({ email: req.body.email }).exec();
        mBalance.balance += req.body.amount;
        mBalance.save();
        return res.status(200).json(`Your balance is ${mBalance.balance}`);
    } catch (error) {
        console.log(error);
    }
}

async function deleteAccount(req, res) {
    try {
        await modelAccount.deleteOne({ email: req.headers.email });
        res.status(200).json(`The account has been deleted`);
    } catch (error) {
        console.log(error);
    }
}

async function makeTransfer(req, res) {
    try {
        const db = mongoose.connection;
        const session = await db.startSession();
        session.startTransaction();
        const originAccount = await modelAccount.findOne({ email: req.body.emailOrigin }).exec();
        const destinyAccount = await modelAccount.findOne({ email: req.body.emailDestiny }).exec();
        if (originAccount.balance >= req.body.amount) {
            originAccount.balance -= req.body.amount;
            destinyAccount.balance += req.body.amount;
            originAccount.save();
            destinyAccount.save();
            await session.commitTransaction();
            res.status(200).json(`Transfer successful`);
        } else {
            await session.abortTransaction();
            res.status(400).json(`Insufficient amount`);
        }
        session.endSession();
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createAccount, modifyBalance, makeTransfer, deleteAccount }
