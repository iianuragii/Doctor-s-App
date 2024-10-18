const express = require('express');
const cors = require('cors');
const app = express();
require('./Database/dbConnect');
const { allocation_priority } = require('./Backend/allocation_priority'); 

app.use(cors());
const port = 4001;

app.get('/',(req,res)=>{
    // const input = ["fatigue", "blackheads", "weight_loss", "acidity"];
    const {input} = req.body;
    const result = allocation_priority(input);  
    res.send(`Doctor allocated : ${result}`);  
})

app.get('/api',(req,res)=>{
    return res.json({val:"Hola from Backend"});
})

app.listen(port,()=>{
    console.log(`Server is running at Port ${port}`);
})