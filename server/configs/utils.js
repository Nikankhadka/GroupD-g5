//for json webtoken 
const jwt=require("jsonwebtoken")
require("dotenv").config()



const GenerateToken=(username,req,res)=>{
        console.log("token generate hudai")

        //creting an object wit username to pass 
        const user={name:username}
    //in the first phase dont add expiration as we dont have referesh
       const token=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    //we can pass expiry date in third para as obj and also callback function in foruth to do after token generation

    return token
}

module.exports={GenerateToken};