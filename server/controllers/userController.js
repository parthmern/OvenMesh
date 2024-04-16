const User = require("../models/User");

const bcrypt = require("bcryptjs");

async function hashingPass(pass) {
    try {
        const hashedPass = await bcrypt.hash(pass, 10);
        console.log("hashedPass => ", hashedPass);
        return hashedPass;
    } catch (error) {
        console.log("🚫 Error in password hashing =>", error);
        return false;
    }
}

const signupController = async (req, res) =>{
    try{
        
        const {name, email, password} = req.body ;
        console.log("name,email,password=>", name, email, password);

        const findingUser = await User.findOne({email : email});

        if(findingUser){
            console.log("🚫 user already exist");
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "user already exist",
                    }
                )
            )
        }

        const hashedPass = await hashingPass(password);

        if(!hashedPass){
            console.log("🚫 Password hashing failed");
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "Password hashing failed",
                    }
                )
            )
        }

        const createdUser = await User.create(
            { 
                name,
                email,
                password : hashedPass,
            }
        );

        console.log("✅ user created successfully=>", createdUser);

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "Signup successful",
                    createdUser ,
                }
            )
        )

    }
    catch(error){

        console.log("🚫 user not created=>", error);
        return(
            res.status(500).json(
                {
                    success : false ,
                    message : "Signup successful",
                    error : error ,
                }
            )
        )
    }

}


module.exports = {signupController} ;