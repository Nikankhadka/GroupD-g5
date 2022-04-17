const express = require("express");
const PORT = process.env.PORT || 2900;
const app = express();
const cors=require("cors");
const cookieParser = require('cookie-parser');

app.use(cookieParser());

//use of middle ware is compuslory as it helps to intercept the msg and send the response back 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({origin:"http://localhost:3000",
          credentials: true,
}))
require("./routes/routes.js")(app);



//-------------------- Start Server ----------------------//
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
//-------------------- Start Server ----------------------//