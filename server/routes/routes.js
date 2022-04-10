const { Router } = require("express");
const controllers = require("../controllers/user.controller.js");

module.exports = async(app) => {
  var router = Router();


  

 

  //category info and crops of specific cat
  router.get("/category",await controllers.category);
  router.get("/cropinfo/:cropcat",await controllers.cropinfo);
 

  
  //admin category settings
  router.post("/category/:name",await controllers.newcategory);
  router.delete("/category/:name",await controllers.delcategory);
  router.patch("/category/:name",await controllers.upcategory);

   app.use("/api/v1", router);
};