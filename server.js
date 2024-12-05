const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const { allocation_priority } = require('./Backend/allocation_priority');
const { dept_allocation } = require('./Backend/dept_allocation');
require('dotenv').config(); 
const client = require('./Database/dbAuth'); 
const api_router = require('./Backend/api_router');

app.use(cors());
app.use(express.json());

app.use(api_router);

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

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received email: ', email);
    console.log('Received password: ', password);

    try {
        // Ensure the client is connected
        if (!client.topology || !client.topology.isConnected()) await client.connect();

        const database = client.db("patientSignUp"); // Access the signup database
        const collection = database.collection("patientSignUpCollection"); // Access the Signupcollection
        const result = await collection.insertOne({ email, password }); // Insert the data
        console.log('User inserted:', result.insertedId);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received email: ', email);
    console.log('Received password: ', password);

    try {
        // Ensure the client is connected
        if (!client.topology || !client.topology.isConnected()) await client.connect();

        const database = client.db("patientSignUp"); // Access the signup database
        const collection = database.collection("patientSignUpCollection"); // Access the Signupcollection

        // Find the user by email
        const user = await collection.findOne({ email });
        console.log('User found:', user);

        if (user && user.password === password) {
            console.log("Login successful");
            res.status(200).json({ message: 'Login successful' });
        } else {
            console.log("Invalid credentials");
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error in login endpoint:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post('/api', async (req, res) => {
    const formData = req.body;
    console.log('Form Data:', formData.symptoms);

    const result = allocation_priority(formData.symptoms);
    storedData = { symptoms: formData.symptoms, result };

    try {
        const response = await axios.post('http://localhost:5000/predict', { symptoms: formData.symptoms });
        const predictedDisease = response.data.predicted_disease;

        const capitalizedDisease = predictedDisease.charAt(0).toUpperCase() + predictedDisease.slice(1);

        diseaseName = { symptoms: formData.symptoms, result: capitalizedDisease };

        const deptName = dept_allocation(diseaseName.result.trim());
        department = { disease: diseaseName.result.trim(), result: deptName };
        console.log(deptName);

        res.status(200).json({
            message: 'Doctor allocated',
            predictedDisease: capitalizedDisease,
            department: deptName,
        });
    } catch (error) {
        console.error('Error predicting disease:', error);
        res.status(500).json({ message: 'Error predicting disease' });
    }
});


app.listen(port, () => {
    console.log(`Server is running at Port ${port}`);
});

process.on('SIGINT', async () => {
    console.log('Closing MongoDB connection...');
    await client.close();
    process.exit(0);
});