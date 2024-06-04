const express = require('express');
const cors = require('cors');
const app = express();
require('./Database/dbConnect');

app.use(cors());
const port = 5000;

app.get('/',(req,res)=>{
    res.send("Backend");  
})
app.get('/api',(req,res)=>{
    return res.json({val:"Hola from Backend"});
})

app.listen(port,()=>{
    console.log(`Server is running at Port ${port}`);
})