const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { router } = require("./routers.js");

function main() {
    dotenv.config();
    const port = process.env.PORT;
    const url = process.env.DB;
    const server = express();
    
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res)=> {
        
        if (err) throw error
        console.log('Connection to the database')
        
    })
    server.use(router);
    server.listen(port, () => console.log(`server listening on port ${port}`));
}

main();
