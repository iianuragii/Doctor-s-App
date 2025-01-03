const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { doc_allocation } = require('./Controller/doc_allocation');
const { dept_allocation } = require('./Controller/dept_allocation');
const jwt = require('jsonwebtoken'); 
require('dotenv').config();
const client = require('./Config/auth');
const router = express.Router();

const app = express();
app.use(cors());
app.use(express.json());

const port = 4000;

// Shared Data
let storedData = null;
let diseaseName = null;
let department = null;

// Routes
app.get('/', (req, res) => {
    const message = storedData
        ? `Doctor allocated based on symptoms: ${storedData.result}, disease: ${diseaseName.result}, department: ${department.result}`
        : 'No data received yet. Please submit the symptoms via /symptoms';
    res.send(message);
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        await client.connect();
        const collection = client.db("patientSignUp").collection("patientSignUpCollection");

        // Check if the email is already registered
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Insert the new user into the database
        const result = await collection.insertOne({ email, password });
        console.log('User inserted:', result.insertedId);

        // Generate JWT token
        const token = jwt.sign(
            { email, id: result.insertedId }, // Include email and user ID in payload
            process.env.JWT_SECRET,          // Use secret from environment variable
            { expiresIn: process.env.JWT_EXPIRATION } // Set token expiration from environment variable
        );

        // Send the token and a success message
        res.status(201).json({
            message: 'User registered successfully',
            token: token,  // Include the JWT token in the response
        });
    } catch (error) {
        console.error('Error in signup endpoint:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        await client.connect();
        const user = await client.db("patientSignUp").collection("patientSignUpCollection").findOne({ email });

        if (user && user.password === password) {
            console.log("Login successful");

            // Generate JWT token with user data (you can customize payload as needed)
            const token = jwt.sign(
                { email: user.email, id: user._id }, // Payload can include user data
                process.env.JWT_SECRET,  // Secret from environment variable
                { expiresIn: process.env.JWT_EXPIRATION } // Expiration from environment variable
            );

            // Send the token along with a success message
            res.status(200).json({
                message: 'Login successful',
                token: token,  // Include the JWT token in the response
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error in login endpoint:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/symptoms', async (req, res) => {
    const { symptoms } = req.body;

    try {       

        const response = await axios.post('http://localhost:5000/predict', { symptoms });
        const predictedDisease = response.data.predicted_disease;
        const capitalizedDisease = predictedDisease.charAt(0).toUpperCase() + predictedDisease.slice(1);

        diseaseName = { symptoms, result: capitalizedDisease };
        department = { disease: capitalizedDisease, result: dept_allocation(capitalizedDisease.trim()) };

        storedData = { symptoms, result: await doc_allocation(symptoms, department.result)};

        res.status(200).json({
            message: 'Doctor allocated',
            predictedDisease: capitalizedDisease,
            department: department.result,
            doctorName: storedData,
            designation: storedData.result.designation,
        });

    } catch (error) {
        console.error('Error predicting disease:', error);
        res.status(500).json({ message: 'Error predicting disease' });
    }
});

router.get('/output', (req, res) => {
    if (!department) {
        return res.status(404).json({ message: 'No data available. Please submit the form first!' });
    }
    res.status(200).send({
        doctorName: storedData.result.doctorName,
        designation: storedData.result.designation,
        dept: department.result,
        diseaseName: department.disease,
        allocationDate: 'ddmmyyyy',
        allocationTime: storedData.result.visitTiming,
    });
});

app.use(router);

app.listen(port, () => console.log(`Server is running at Port ${port}`));

process.on('SIGINT', async () => {
    console.log('Closing MongoDB connection...');
    await client.close();
    process.exit(0);
});
