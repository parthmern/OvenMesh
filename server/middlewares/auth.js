const jwt = require("jsonwebtoken");

const auth = async (req, res, next) =>{
    try{
        const token = req.cookies.token 
                    || req.body.token 
                    || req.header("Authorization").replace("Bearer ", "");

        console.log("req.cookies.token->", req.cookies.token);
        console.log("req.body.token  ->", req.body.token );
        console.log("req.header->", req.header("Authorization").replace("Bearer ", ""));

        if(!token){
            console.log("🚫 Token is not available");
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "Token is not available" ,
                    }
                )
            )
        }

        // decoding token
        try{
            // Todo : secret key to dot env
            const decode = await jwt.verify(token, "parthmern");

            console.log("decode==>", decode);
            req.user = decode;

        }
        catch(error){
            console.log("🚫 Token verification error / invalid token->", error);
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "Token is invalid",
                        error ,
                    }
                )
            )
        }

        next();



    }
    catch(error){
        console.log("🚫 Error in auth middleware->", error);

        return(
            res.status(500).json(
                {
                    success : false, 
                    message : "Auth middleware error", 
                    error
                }
            )
        )
    }
}

module.exports =  {auth} ;