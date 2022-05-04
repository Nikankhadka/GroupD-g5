const mod =require("../models/models")
const gt=require("../configs/utils")
const jwt=require("jsonwebtoken")





//signup
exports.signup=async(req,res)=>{
  const main=req.body.formdata;
  console.log(main)
  const modle=await mod.signup(main);
 
  if(modle=="posted"){
    res.send(true)
  }else{
    res.send(false)
  }


}
















//Login
exports.logins=async(req, res)=>{
    
  let user=req.body.userId
  let pass=req.body.password
  const usertype=await mod.login(user,pass)


  if(usertype=="admin" || usertype=="user"){
      //generating the token here since user is already authenticated
        const token=gt.GenerateToken(user,req,res);
        console.log("token bhayo"+token)


        //store token in http only cookie
        if(usertype=="admin"){
          res.status(202).cookie("token",token,{
            maxAge: 90000000,
             httpOnly:true,
            
           }).send("admin")
         
        }else{
          res.status(202).cookie("token",token,{
            maxAge: 90000000,
             httpOnly:true,
            
           }).send("user")
         
        }
      
        
      
      
  }
  else{
      res.send({status:false})
  }
}





//delete cokie in logout
exports.deletecokie=(req,res)=>{
  
  res.status(202).clearCookie("token").send("cleared")
  console.log("clear bhayo")


} 




//authenticate token in each login and other pages make sure it is the correct user that ia acessing the pages 
exports.authtoken=(req,res,next)=>{
  var token;
      if(req.headers.cookie){
                  //will get all the cokies in array and seperate with ;
              const rawCookies = req.headers.cookie.split('; ');
              console.log("rawcokies"+rawCookies)
              //will seperate the cokie and value with =
              const parsedcokie=rawCookies[0].split("=")
              console.log("parsed cookies"+parsedcokie)
              //finally get token in index 1
              token=parsedcokie[1];
              console.log("token"+token)



              if(token==null){
                return res.sendStatus(401)
              }else{
                console.log("token"+token)
                jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
                  if(err){
                    console.log("ya sama chalyo")
                    return res.sendStatus(403)
                  }
                  else{
                    req.user=user
                    console.log(req.user)
                    next()
                  }
                })
              }
      }else{
        res.send("nocokie")
       
      }
 
  
  
  
  
  
 
}



//for authentication in each acess of page where the validation is required

exports.auth=async(req,res)=>{
  if(mod.veruser(req.user.name)){
    res.send(true)
  }else{
    response.sendStatus(404)
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