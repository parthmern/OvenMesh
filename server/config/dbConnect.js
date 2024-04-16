const mongoose = require("mongoose");

const dbConnect = async () =>{ 

    require("dotenv").config();
    const dbUrl = process.env.dbUrl ;

    try{
        const res = await mongoose.connect(dbUrl);
        console.log("dbConnect successfully =>", res?.connection?.name);

    }
    catch(error){
        console.log("dbConnect error =>", error);
    }

}

module.exports = dbConnect;