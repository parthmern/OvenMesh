const jwt = require("jsonwebtoken");

const auth = async (req, res, next) =>{
    try{

        console.log("=============================");
        console.log("checked all cookies", req.cookies);
        console.log("cokkie", req.cookies ? req.cookies.token : null);
        console.log("body", req.body ? req.body.token : null);

        const headerToken = req.header("Authorization");
        console.log("headerToken => ", headerToken);
        const token = req.body?.token || req.cookies?.token?.token || (headerToken ? headerToken.replace("Bearer ", "") : null);

        console.log("Fetching token=>", token);
        

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
            req.body.user = decode;

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