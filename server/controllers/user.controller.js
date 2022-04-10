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




//now for admin category settings

//request handler for adding new crop category
exports.newcategory=async(req, res)=>{
  //using route paramets toa accept a single cat
  const mbody=req.params.name;
const check= await mod.newcategory(mbody)
if(check=="match"){
    res.send("category exist")
}else{
  res.status(200).send("posted");
 
}
 
}



//handler for deletecategory by admin
exports.delcategory=async(req, res)=>{
  //using route paramets toa accept a single cat
  const mbody=req.params.name;
const check= await mod.delcategory(mbody)
if(check=="nocat"){
    res.send("category not available")
}else{
  res.status(200).send("deleted");
 
}
 
}