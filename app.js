const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


dotenv.config();
const JWT_USER_SECRETE = process.env.JWT_USER_SECRETE;

const app = express();
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://pratheeknayak2153:b3k0IM3pmEMmQwH7@cluster0.ohdbo2i.mongodb.net/HelpingHands/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;
// console.log(MONGODB_URL)
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const volunteerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

app.use(express.static('public', { extensions: ['html', 'css'] }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.post('/submit-form', async (req, res) => {
    console.log('Received form submission');
    console.log('Request body:', req.body);

    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    console.log('Form data:', { name, email, phone, address });

    const newVolunteer = new Volunteer({
        name,
        email,
        password,
        phone,
        address,
    });

    try {
        await newVolunteer.save();
        console.log('Form submitted successfully!');
        const dataToEncrypt = {
            name,
            email,
        }
        const token = jwt.sign(dataToEncrypt, JWT_USER_SECRETE);
        res.json({ success: true, message: 'Form submitted successfully!', token });
    } catch (error) {
        console.error('Error saving to database:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
