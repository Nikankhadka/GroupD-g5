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
  
    






