
const conn = require("./db");

var usercropsarray=[];



//signup model
exports.signup=async(data)=>{
  console.log(data)
  connection=await conn();
const posting=0;
  //check whether the user exist or not
  const[rows,fields]=await connection.query("SELECT * from `users` Where user_id='"+data.userId+"'");
  if(rows[0]){
    return "userexist"
  }else{
    //now insert user data into usertable and farmer table
    await connection.query("INSERT INTO `users` VALUES('"+data.userId+"','"+data.user_name+"','"+data.password+"')")
    console.log("data inserted into users table hai ")

    await connection.query("INSERT INTO `farmer` VALUES('"+data.userId+"','"+data.user_name+"','"+posting+"','"+data.province+"','"+data.ward+"','"+data.family+"')")
    console.log("data inserted into farmer table")
    return ("posted")
  }

}












//for login category
exports.login=async(username,password)=>{
  connection =await conn()

  const [rows, fields] = await connection.query("SELECT * FROM `users` where user_id='"+username+"'AND password='"+password+"'")
  
  if(rows[0]){
          if ( rows[0].user_id=="admin"){
            return("admin")
        }else{
          return("user")
        }
  }else{
    return(false)
  }
}


//will get user and veridy whether the user info is in databse or not
exports.veruser=async(userid)=>{
  connection =await conn()
  
  const [rows, fields] = await connection.query("SELECT * FROM `users` where user_id='"+userid+"'")
  if(rows[0]){
    console.log("rowma ")
    console.log(rows[0].user_id)
    return (rows[0].user_id)
  }else{
    console.log("eklse ma ")
    return (false)
  }

}





//get all category infor from databse
exports.catinfo=async()=>{
  //extablish connection with the database
  connection=await conn()



  

  //creating an empty array
  var category=[];
  const [rows, fields] = await connection.query("SELECT * FROM `crops_category`")

  //looping through object inside array returned form db query and appending the data into the created array
  for(let i=0;i<rows.length;i++){
    category.push(rows[i].category);
  }

  return(category)
}






//get crops info of specific category
exports.cropsinfo=async(category)=>{
  console.log("model bhitra"+category)
  var nikarray
  connection=await conn()
  //crops of specific category
  const [rows, fields] = await connection.query("SELECT " + category + ".farmer_id," + category + ".crop_id," + category + ".crop_name," + category + ".farmers_rate," + category + ".market_rate," + category + ".crop_details," + category + ".image,imagename,farmer.name,farmer.posting,farmer.province,farmer.ward,farmer.family  FROM " + category + " inner join farmer on " + category + ".farmer_id=farmer.farmer_id  ")
  console.log("yo chai after hai")
  console.log(rows)
  return rows;

}
  
    

    //for admin category settings

    //model for adding new category by admin
    exports.newcategory=async(category)=>{
      connection=await conn()
      
      var exist=0;


      //checking if category already exist
      const [rows, fields] = await connection.query("SELECT * FROM `crops_category` ")
      rows.forEach(e=>{
        if(e.category==category){
          exist=1;
        }
        else{
          console.log("new cat matched so not post")
        }
      })

      if(exist==1){
        return "match"
      }else{
        //this will insertt new catgeroy
        await connection.query("INSERT INTO `crops_category` VALUES('"+category+"')")
        await connection.query("CREATE TABLE "+category+"("+"farmer_id VARCHAR(100),"+"crop_id VARCHAR(100),"+"crop_name VARCHAR(100),"+"farmers_rate INTEGER(10),"+"market_rate INTEGER(10),"+"crop_details VARCHAR(500),"+"image VARCHAR(1000),"+"imagename VARCHAR(100))")
        

        console.log("new crop catreogry added also created its test table")
        
 }}




    
   //model for delete the exiting category
      exports.delcategory=async(category)=>{
        connection=await conn()
        
        var exist=0;
  
  
        //checking  exist
        const [rows, fields] = await connection.query("SELECT * FROM `crops_category` ")
        rows.forEach(e=>{
          if(e.category==category){
            exist=1;
            console.log("match bhayo")
          
          }
          else{
            
            console.log("match bhayena")
          }
        })
  
        //if category exist then ececute the query below
        if(exist==1){
          //this will insertt new catgeroy
          await connection.query("delete from `crops_category` where category='"+category+"'")
         await connection.query("DROP TABLE "+category+"")
          
  
          console.log("crop category remo")
          
        }else{
          return "nocat"
          
}}
  

  //  //for updating the category
  exports.updateCategory=async(category,ncategory)=>{
    connection=await conn()
    
    var exist=0;


    //checking if category already exist
    const [rows, fields] = await connection.query("SELECT * FROM `crops_category` ")
    rows.forEach(e=>{
      if(e.category==category){
        exist=1;
        console.log("match bhayo")
      
      }
      else{
        
        console.log("match bhayena")
      }
    })

    //if category exist then ececute the query below
    if(exist==1){
      //this will insertt new catgeroy
       await connection.query("update `crops_category` set category='"+ncategory+"' where category='"+category+"'")
      await connection.query("ALTER TABLE "+category+" RENAME To "+ncategory+"")
      

      console.log("crop category updated")
      
    }else{
      return "nocat"
      
}}





//admin crops posting settings 

  //crops posting model
  exports.postcrop=async(category,ci)=>{
    connection=await conn()
    
    var exist=0;

  //check if that specific user has already posted the same crops detail already
  const [rows, fields] = await connection.query("SELECT * FROM "+category+" ")
  rows.forEach(e=>{
    if(e.farmer_id==ci.farmer_id && e.crop_name==ci.crop_name){
      exist=1
      console.log("farmer reposted the same information")
    }
    else{
      console.log("crop posting not repeated")
    }
  })

  if(exist){
    console.log("same crop info from same farmer")
    return "alposted"
  }else{
    //generate unique id for crop
    let pid=Date.now();

    //insert crop details into crop specific category table
     await connection.query("insert into "+category+" VALUES ('"+ci.farmer_id+"','"+pid+"','"+ci.crop_name+"','"+ci.farmers_rate+"','"+ci.market_rate+"','"+ci.crop_details+"','"+ci.image+"','"+ci.imagename+"') ")
  
    //now take the farmer id and check if that farmer exist in info if then dont insert just update if not inser new data 

  const [rows2, fields] = await connection.query("SELECT * FROM `farmer` WHERE farmer_id='"+ci.farmer_id+"' ")
  if(typeof rows2[0]=='object'){
    console.log("farmer details exist")
    let post=rows2[0].posting+1;
     await connection.query("update `farmer` set posting='"+post+"' where farmer_id='"+ci.farmer_id+"'")
    console.log("updated farmer posting ")
  }
  else{
    let pp=1;
    await connection.query("insert into `farmer` VALUES ('"+ci.farmer_id+"','"+ci.name+"','"+pp+"','"+ci.province+"','"+ci.ward+"','"+ci.family+"') ")
    console.log("crops finally posted with new information updated positng")
    return "posted"
  }
  
  
  }

  
      
}





//model for deleting crops 
exports.deletecrop=async(category,id)=>{
 
  connection=await conn()

  const[rows,feilds]=await connection.query("SELECT * FROM "+category+" WHERE crop_id='"+id+"'")
  let farmer_id=rows[0].farmer_id;
  console.log("got farmer id")

  //delete row of crop info
  await connection.query("delete from "+category+" where crop_id='"+id+"'")
  console.log("deleted row of crop info")

  //now use above farmer id to change info in farmer table 
  const[rows1,feilds1]=await connection.query("SELECT * FROM `farmer` WHERE farmer_id='"+farmer_id+"'")
  var posting=rows1[0].posting-1
  if(posting==0){
    console.log("farmer posting is 0 make sure to input atleast one crop")
  }else{
    await connection.query("update `farmer` set posting='"+posting+"' where farmer_id='"+farmer_id+"'")
    console.log("farmer posting updated")
  }

  return "deleted"


}
    
    




//for updating crop info


exports.updatecrop=async(category,ci)=>{
  connection=await conn()
  
  

//check if that specific user has already posted the same crops detail already
const [rows, fields] = await connection.query("SELECT * FROM "+category+" where crop_id='"+ci.crop_id+"' ")

if(typeof rows[0]=='object'){
  let farmer_id=rows[0].farmer_id
  console.log("crop id matched now ready to update")

  await connection.query("update "+category+" set crop_name='"+ci.crop_name+"',farmers_rate='"+ci.farmers_rate+"',market_rate='"+ci.market_rate+"',crop_details='"+ci.crop_details+"',image='"+ci.image+"',imagename='"+ci.imagename+"' where crop_id='"+ci.crop_id+"'")

  console.log("details update bhayo")
  return "updated"



}
else{
  return "notmatched"
}


}





/////famer info



//for getting farmers liist
exports.farmerinfo=async()=>{
  //extablish connection with the database
  connection=await conn()



  const [rows, fields] = await connection.query("SELECT * FROM `farmer`")
  console.log(rows)

  return(rows)
}






//update farmers info
exports.updatefarmer=async(farmer,ci)=>{

  connection=await conn()
  await connection.query("update `users` set user_name='"+ci.user_name+"',password='"+ci.password+"' where user_id='"+farmer+"' ")
  console.log("user table name pass updated")
  await connection.query("update `farmer` set name='"+ci.user_name+"',province='"+ci.province+"',ward='"+ci.ward+"',family='"+ci.family+"' where farmer_id='"+farmer+"' ")

  console.log("farmer info update bhayo")
  return "updated"
}




//usercrops 
exports.usercrops=async(user_id)=>{
  
  //clear array and new object data in each calll
  usercropsarray.pop();
  connection=await conn()
  const[rows1,fields]=await connection.query("SELECT * FROM `crops_category`")
  
  //run loop for each category checking with user id to get his crop info
  for(let i=0;i<rows1.length;i++){
    
    const[rows2,fields]=await connection.query("SELECT * FROM "+rows1[i].category+" where farmer_id='"+user_id+"' ")
    
    //loop through each array get objects and push it
    rows2.forEach(e=>{
      usercropsarray.push(e);
    } )

  }

  return (usercropsarray)
  

}


//crops posting model for user
exports.userpost=async(main,user,category)=>{
  connection=await conn()
  
  var exist=0;

//check if that specific user has already posted the same crops detail already
const [rows, fields] = await connection.query("SELECT * FROM "+category+" ")
rows.forEach(e=>{
  if(e.farmer_id==user && e.crop_name==main.crop_name){
    exist=1
    console.log("farmer reposted the same information")
  }
  else{
    console.log("crop posting not repeated")
  }
})

if(exist){
  console.log("same crop info from same farmer")
  return "alposted"
}else{
  //generate unique id for crop
  let pid=Date.now();

  //insert crop details into crop specific category table
   await connection.query("insert into "+category+" VALUES ('"+user+"','"+pid+"','"+main.crop_name+"','"+main.farmers_rate+"','"+main.market_rate+"','"+main.crop_details+"','"+main.image+"','"+main.imagename+"') ")

  //now take the farmer id and check if that farmer exist in info if then dont insert just update if not inser new data 

const [rows2, fields] = await connection.query("SELECT * FROM `farmer` WHERE farmer_id='"+user+"' ")
if(typeof rows2[0]=='object'){
  console.log("farmer details exist")
  let post=rows2[0].posting+1;
   await connection.query("update `farmer` set posting='"+post+"' where farmer_id='"+user+"'")
  console.log("updated farmer posting ")
  return (true)
}
else{
 
  return (false)
}

}}



//model for deleting crops 
exports.userdelete=async (id)=>{
 
  connection=await conn()
  const[rows5,feilds0]=await connection.query("SELECT * FROM `crops_category` ")
  console.log(rows5);
    for( let i=0;i<rows5.length;i++){
      console.log("yo chai obj ho hai"+rows5[i])
      const[rows,feilds]= await connection.query("SELECT * FROM "+rows5[i].category+" WHERE crop_id='"+id+"'")

      if(rows[0]){
        let farmer_id=rows[0].farmer_id;
        console.log("got farmer id")

        //delete row of crop info
     await connection.query("delete from "+rows5[i].category+" where crop_id='"+id+"'")
    console.log("deleted row of crop info")
        //now use above farmer id to change info in farmer table 
    const[rows1,feilds1]= await connection.query("SELECT * FROM `farmer` WHERE farmer_id='"+farmer_id+"'")
    var posting=rows1[0].posting-1
    if(posting==0){
      console.log("farmer posting is 0 make sure to input atleast one crop")
      return (true)
    
    }else{
       await connection.query("update `farmer` set posting='"+posting+"' where farmer_id='"+farmer_id+"'")
      console.log("farmer posting updated")
      return (true)
     
    }

      
      }
      console.log("crop not matched")
    
  }
}




  

  


//for updating crop info


exports.userupdate=async(cropid,ci)=>{
  connection=await conn()
  
  const[rows5,feilds0]=await connection.query("SELECT * FROM `crops_category` ")
  console.log(rows5);
    for( let i=0;i<rows5.length;i++){
      console.log("yo chai obj ho hai"+rows5[i])
      const[rows,feilds]= await connection.query("SELECT * FROM "+rows5[i].category+" WHERE crop_id='"+cropid+"'")

      
if(typeof rows[0]=='object'){
  let farmer_id=rows[0].farmer_id
  console.log("crop id matched now ready to update")

  await connection.query("update "+rows5[i].category+" set crop_name='"+ci.crop_name+"',farmers_rate='"+ci.farmers_rate+"',market_rate='"+ci.market_rate+"',crop_details='"+ci.crop_details+"',image='"+ci.image+"',imagename='"+ci.imagename+"' where crop_id='"+cropid+"'")

  console.log("details update bhayo")
  return "updated"
 

}else{
  console.log("not matched")
}

}



}
