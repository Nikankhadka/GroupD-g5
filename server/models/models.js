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






