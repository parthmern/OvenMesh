const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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

// =====================================================================
// signupController

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

// =====================================================================
// loginController

const loginController = async (req, res) =>{
    try{

        const {email, password} = req.body ;
        console.log("name,email,password=>", email, password);

        const findingUser = await User.findOne({email : email});

        if(!findingUser){
            console.log("🚫 user not available");
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "User not available",
                    }
                )
            )
        }

        const passMatch = await bcrypt.compare(password, findingUser.password );
        if(!passMatch){
            console.log('🚫 Password not matched');
            return(
                res.status(400).json(
                    {
                        success : false,
                        message : "Password not matched",
                    }
                )
            )
        }

        const tokenData = {
            id : findingUser?._id, 
            name : findingUser?.name,
            email : findingUser?.email
        }

        const jwtSecret = "parthmern"; 

        const options = {
            expiresIn: "24h",
        };

        const jwtToken = await jwt.sign(
            tokenData,
            jwtSecret,
            options,
        );

        const cookies = {
            token : jwtToken,
        };

        const cookiesOptions = {
            maxAge: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires after 24 hours
            httpOnly: false,
            sameSite: "none",
            secure: true,
            path : "/"
        };

        console.log("✅ loginUser success=>", findingUser, cookies);

        return(
            res.cookie("token", cookies, cookiesOptions).status(200).json(
                {
                    success : true, 
                    message : "User login success",
                    findingUser ,
                    cookies,
                }
            )
        )


    }
    catch(error){
        console.log("🚫 Login Failed=>", error);
        return(
            res.status(500).json(
                {
                    success : false ,
                    message : "Login Failed",
                    error : error ,
                }
            )
        )
    }
}


module.exports = {signupController, loginController} ;