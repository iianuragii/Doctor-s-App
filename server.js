const express = require('express');
const cors    = require('cors');
const axios   = require('axios');
const app     = express();
const { allocation_priority } = require('./Backend/allocation_priority'); 
const { dept_allocation }     = require('./Backend/dept_allocation');
require('./Database/dbConnect');

app.use(cors());
app.use(express.json());
const port = 4000;

let storedData = null;
let diseaseName = null;
let department = null;

app.get('/', (req, res) => {
    if (storedData) {
        res.send(`Doctor allocated based on symptoms: ${storedData.result} 
            and disease: ${diseaseName.result} vs department Name: ${department.result}`);
    } else {
        res.send('No data received yet. Please submit the symptoms via /api');
    }
});

app.post('/api', async (req, res) => {
    // Received the form data from client-side
    const formData = req.body;
    console.log('Form Data:', formData.symptoms);
    
    // Sending the symptoms to the allocation priority function
    const result = allocation_priority(formData.symptoms); 
    storedData = { symptoms: formData.symptoms, result };

    try {
        // Sending symptoms to the Python server
        const response = await axios.post('http://localhost:5000/predict', { symptoms: formData.symptoms });
        const predictedDisease = response.data.predicted_disease;

        diseaseName = { symptoms: formData.symptoms, result: predictedDisease };

        // Sending disease name to dept allocation function
        const deptName = dept_allocation(diseaseName.result.trim());
        department = {disease: diseaseName.result.trim(), result: deptName};
        console.log(deptName);
        res.status(200).json({ 
            message: 'Doctor allocated', 
            predictedDisease, 
            department: deptName 
        });
        
    } catch (error) {
        console.error('Error predicting disease:', error);
        res.status(500).json({ message: 'Error predicting disease' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at Port ${port}`);
});