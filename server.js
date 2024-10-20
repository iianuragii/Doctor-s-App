const express = require('express');
const cors = require('cors');
const app = express();
require('./Database/dbConnect');
const { allocation_priority } = require('./Backend/allocation_priority'); 

app.use(cors());
app.use(express.json());
const port = 4000;

let storedData = null;

app.get('/', (req, res) => {
    if (storedData) {
        res.send(`Doctor allocated based on symptoms: ${storedData.result}`);
    } else {
        res.send('No data received yet. Please submit the symptoms via /api');
    }
});

app.post('/api', (req, res) => {
    const formData = req.body;
    console.log('Form Data:', formData.symptoms);
    const result = allocation_priority(formData.symptoms); 
    
    storedData = { symptoms: formData.symptoms, result };

    res.status(200).json({ message: 'Doctor allocated', result });
});

  

app.listen(port,()=>{
    console.log(`Server is running at Port ${port}`);
})