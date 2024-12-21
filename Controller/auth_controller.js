const jwt = require('jsonwebtoken'); 
require('dotenv').config();
const client = require('../Config/auth');

export const signup = async(req, res) => {
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
}


export const login = async (req, res) => {
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
}
