const User = require("../models/User");


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

        const createdUser = await User.create(
            { 
                name,
                email,
                password,
            }
        );

        console.log("✅ user created successfully=>", createdUser);

        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "user created successfully",
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
                    message : "🚫 user not created",
                    error : error ,
                }
            )
        )
    }

}


module.exports = {signupController} ;