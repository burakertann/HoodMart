const express = require("express");
const app = express();
app.use(express.json());





app.listen(()=>{
   console.log("listening on port 3000")
},3000);