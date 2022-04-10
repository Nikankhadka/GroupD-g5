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


 //admin crops meeting 
 router.post("/crops/:category",await controllers.postcrop);
 router.delete("/crops/:category/:id",await controllers.deletecrop);
 router.patch("/crops/:category",await controllers.updatecrop);





   app.use("/api/v1", router);
};