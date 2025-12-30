const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors);





app.listen(()=>{
   console.log("listening on port 3000")
},3000);