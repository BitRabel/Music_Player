// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/loginDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema for login data
const loginSchema = new mongoose.Schema({
    username: String,
    password: String
});
const Login = mongoose.model('Login', loginSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API endpoint to save login data
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Create a new login document
    const newLogin = new Login({ username, password });

    // Save the document to MongoDB
    newLogin.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving login data');
        } else {
            res.status(200).send('Login data saved successfully');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on mongodb://localhost:27017}`);
});
