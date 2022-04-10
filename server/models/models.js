var mixarray=[];
const conn = require("./db");


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
  const [rows, fields] = await connection.query("SELECT " + category + ".farmer_id," + category + ".crop_id," + category + ".crop_name," + category + ".farmers_rate," + category + ".market_rate," + category + ".crop_details," + category + ".image,farmer.name,farmer.posting,farmer.province,farmer.ward,farmer.family  FROM " + category + " inner join farmer on " + category + ".farmer_id=farmer.farmer_id  ")
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
        await connection.query("CREATE TABLE "+category+"("+"farmer_id VARCHAR(100),"+"crop_id VARCHAR(100),"+"crop_name VARCHAR(100),"+"farmers_rate INTEGER(10),"+"market_rate INTEGER(10),"+"crop_details VARCHAR(500),"+"image VARCHAR(1000))")
        

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
     await connection.query("insert into "+category+" VALUES ('"+ci.farmer_id+"','"+pid+"','"+ci.crop_name+"','"+ci.farmers_rate+"','"+ci.market_rate+"','"+ci.crop_details+"','"+ci.image+"') ")
  
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
    await connection.query("delete from `farmer` where farmer_id='"+farmer_id+"'")
    console.log("deleted the farmer information 0 posting")
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
const [rows, fields] = await connection.query("SELECT * FROM "+category+" where farmer_id='"+ci.farmer_id+"' and crop_name='"+ci.crop_name+"' ")
if(typeof rows[0]=='object'){
  console.log("category farmerid and cropname matched")

  await connection.query("update "+category+" set farmers_rate='"+ci.farmers_rate+"',market_rate='"+ci.farmers_rate+"',crop_details='"+ci.crop_details+"',image='"+ci.image+"' where farmer_id='"+ci.farmer_id+"' and crop_name='"+ci.crop_name+"'")

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
exports.updatefarmer=async(ci)=>{

  connection=await conn()

  await connection.query("update `farmer` set name='"+ci.name+"',province='"+ci.province+"',ward='"+ci.ward+"',family='"+ci.family+"' where farmer_id='"+ci.farmer_id+"' ")

  console.log("farmer info update bhayo")
  return "updated"
}
