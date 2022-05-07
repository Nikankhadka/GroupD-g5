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
                console.log("nul token")
                return res.send(false);
              }else{
                console.log("token"+token)
                jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
                  if(err){
                    console.log("ya sama chalyo")
                    return res.sendStatus(403)
                  }
                  else{
                    //assigninig user into req.user
                    req.user=user
                    console.log(req.user)
                    next()
                  }
                })
              }
      }else{
        res.send(false)
       
      }
 
  
  
  
  
  
 
}



//for authentication in each acess of page where the validation is required

exports.auth=async(req,res)=>{
  //using the user id we get from the token stored in cookie
  const login=await mod.veruser(req.user.name)
  if(!login){
    console.log("no user")
    res.send(false);
  }else if(login=="admin"){
    res.send("admin")
  }else{
    res.send(login);
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










//user crops details 
exports.usercrops=async(req,res)=>{
  //passing user name that we get cookie through auth middleware
  
  const usercropdetails=await mod.usercrops(req.user.name);

  if(usercropdetails){
    console.log(usercropdetails)
    res.send(usercropdetails);
    console.log("array ko response gayo hai")
  }else{
    res.send(false);
  }

}



///user crops posting 

exports.userpost=async(req,res)=>{
  const main=req.body.update;
  const user=req.user.name;
  const category=req.params.category
  if(await mod.userpost(main,user,category)){
    res.send(true);
  }else{
    res.send(false)
  }
}


//user delete

exports.userdelete=async(req,res)=>{
  const cropid=req.params.cropid;
  if(await mod.userdelete(cropid)){
    res.send(true);
  }else{
    res.send(false)
  }
}




//update crop
exports.userupdate=async(req, res)=>{
  //using route paramets toa accept a single
 const mbody=req.body.update
  console.log(mbody)
  console.log(req.params.cropid)
const check= await mod.userupdate( req.params.cropid,mbody)
if(check=="updated"){
  res.status(200).send("updated");
}else{
 
  res.send("enter valid category and with valid crop and farmer id")
 
}}


//update farnmer info
exports.updatefarmer=async(req,res)=>{
  const farmer=req.user.name;
  const mbody=req.body.data1
  console.log(mbody )
  const check= await mod.updatefarmer(farmer,mbody)
  if(check=="notupdated"){
    res.send("famer information not updated")
}
else{
  res.status(200).send("updated")
}
}