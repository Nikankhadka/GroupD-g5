const mod =require("../models/models")

//Login
exports.logins=async(req, res)=>{
  console.log("anc")  //   
  let user=req.body.username
  let pass=req.body.password
 console.log(user,pass)
  if(await mod.login(user,pass)){
      res.send({status:true})
  }
  else{
      res.send({status:false})
  }
}

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



//handler for update category
exports.upcategory=async(req, res)=>{
  //using route paramets toa accept a single cat
 const mbody=req.body

const check= await mod.updateCategory( req.params.name,mbody.name1)
if(check=="nocat"){
    res.send("category not available")
}else{
  res.status(200).send("updated");
 
}
}
 




//for crops posting updating and deleting 
exports.postcrop=async(req, res)=>{
  //using route paramets toa accept a single
 const mbody=req.body.update
  console.log(mbody)
  console.log(req.params.category)
const check= await mod.postcrop( req.params.category,mbody)
if(check=="alposted"){
    res.send("already exist")
}else{
  res.status(200).send("posted");
 
}
}




//for delete crops 
exports.deletecrop=async(req,res)=>{

  
  const category=req.params.category
  console.log(category)
  console.log(req.params.id)
  const check=await mod.deletecrop(category,req.params.id)
  if(check=="deleted"){
    res.send("deleted")
  }else{
    res.send("notdeleted")
  }
}


//update crop
exports.updatecrop=async(req, res)=>{
  //using route paramets toa accept a single
 const mbody=req.body.update
  console.log(mbody)
  console.log(req.params.category)
const check= await mod.updatecrop( req.params.category,mbody)
if(check=="notmatched"){
    res.send("enter valid category and with valid crop and farmer id")
}else{
  res.status(200).send("updated");
 
}
}








//update farnmer info
exports.updatefarmer=async(req,res)=>{
  const mbody=req.body.data1
  console.log(mbody )
  const check= await mod.updatefarmer(mbody)
  if(check=="notupdated"){
    res.send("famer information not updated")
}
else{
  res.status(200).send("updated")
}
}