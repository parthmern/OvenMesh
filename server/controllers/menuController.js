const Pizza = require("../models/Pizza");

const cloudinary = require("cloudinary").v2;
async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };

    if (quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

const pizzaAddingController = async (req, res) =>{

    try{

        console.log("pizzaAddingController=>", req.body);
        const {name, price, size} = req.body ;
        console.log("name, price, size=>", name, price, size);

        const file = req.files.imageFile;

        if(!file){
            return(
                res.status(400).json(
                    {
                        success : false, 
                        message : "Image file is mandatory",
                    }
                )
            )
        }

        const uploaded = await uploadFileToCloudinary(file, "OvenMesh");

        if(! uploaded.secure_url){
            return(
                res.status(400).json(
                    {
                        success : false, 
                        message : "Image url not genrated",
                    }
                )
            )
        }
        
        console.log("uploaded==>", uploaded.secure_url);

        const addedPizza = await Pizza.create({
            name,
            size,
            img : uploaded.secure_url ,
            price,
        })

        console.log("✅ Pizza added successfully=>", addedPizza);
        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "Pizza added successfully",
                    addedPizza ,
                }
            )
        )




    }
    catch(error){
        console.log("🚫 Pizza adding failed=>", error);
        return(
            res.status(500).json(
                {
                    success : false ,
                    message : "Pizza adding failed" ,
                    error ,
                }
            )
        )
    }

}

module.exports = pizzaAddingController ;

