const express = require('express');
const cors = require('cors');
const app = express();
require('./Database/dbConnect');
const { allocation_priority } = require('./Backend/allocation_priority'); 

app.use(cors());
app.use(express.json());
const port = 4000;

app.get('/',(req,res)=>{
    const input = ["fatigue", "blackheads", "weight_loss", "acidity"];
    const result = allocation_priority(input);  
    res.send(`Doctor allocated : ${result}`);  
})

// app.get('/api',(req,res)=>{
//     return res.json({val:"Hola from Backend"});
// })
app.post('/api', (req, res) => {
    const formData = req.body;
    console.log('Form Data:', formData);
    res.status(200).json({ message: 'Form data received successfully', formData });
  });
  

app.listen(port,()=>{
    console.log(`Server is running at Port ${port}`);
})