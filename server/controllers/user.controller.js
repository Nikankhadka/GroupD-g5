const mod =require("../models/models")

//get category info
exports.category=async(req, res)=>{
   
    res.send(await mod.catinfo())
}


//get farme rinfo
exports.farmer=async(req, res)=>{
   
  res.send(await mod.farmerinfo())
}


//get all crops info
exports.cropinfo=async(req, res)=>{
    //using route paramets toa accept a single cat
    const par=req.params.cropcat;
    console.log(par)
    const det=await mod.cropsinfo(par)
    res.send(det)
}



