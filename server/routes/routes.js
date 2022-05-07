const { Router } = require("express");
const controllers = require("../controllers/user.controller.js");

module.exports = async(app) => {
  var router = Router();



  //signup
  router.post("/signup",controllers.signup);



   //login route and logout
  router.post("/login",await controllers.logins);
  //authentication for pages
  router.get("/login",controllers.authtoken,await controllers.auth);
  router.delete("/login",await controllers.deletecokie)

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

//farmer  info and update farmer info
router.get("/farmer",await controllers.farmer);
//use middle ware to get user id tro updte the farmer info
router.patch("/farmer",controllers.authtoken,await controllers.updatefarmer);


//get farmers crop information
//using authtoken middle ware to get user information from cookie token then get crops according to the user
router.get("/usercrops",controllers.authtoken,await controllers.usercrops);
router.post("/userpost/:category",controllers.authtoken,await controllers.userpost);
router.delete("/userdelete/:cropid",await controllers.userdelete)
router.patch("/userupdate/:cropid",await controllers.userupdate)


   app.use("/api/v1", router);
};