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
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://pratheeknayak2153:b3k0IM3pmEMmQwH7@cluster0.ohdbo2i.mongodb.net/HelpingHands/Helping_Hands_Database?retryWrites=true&w=majority';
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
    // password: String,
    phone: String,
    address: String,
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

const foodSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    serve: String,
    address: String,
    cook: String,
});

const Food = mongoose.model('Food', foodSchema);

const clothSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    pair: String,
    address: String,
    cond: String,
});

const Cloth = mongoose.model('Cloth', clothSchema);

const educationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    book: String,
    address: String,
    msg: String,
});

const Education = mongoose.model('Education', educationSchema);

const moneySchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    amt: String,
    address: String,
    msg: String,
});

const Money = mongoose.model('Money', moneySchema);

app.use(express.static('public', { extensions: ['html', 'css'] }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.post('/submit-form', async (req, res) => {
    console.log('Received form submission');
    console.log('Request body:', req.body);

    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    console.log('Form data:', { name, email, phone, address });

    const newVolunteer = new Volunteer({
        name,
        email,
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

// -------------------------------------- Food DB ------------------------------------

app.post('/food-form', async (req, res) => {
    console.log('Received form submission');
    console.log('Request body:', req.body);

    const { name, email, phone, serve, address, cook } = req.body;

    if (!name || !email || !phone || !serve || !address || !cook) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    console.log('Form data:', { name, email, phone, serve, address, cook });

    const newFood = new Food({
        name,
        email,
        phone,
        serve,
        address,
        cook,
    });

    try {
        await newFood.save();
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

// --------------------------------------Clothes DB -----------------------------------

app.post('/clothes-form', async (req, res) => {
    console.log('Received form submission');
    console.log('Request body:', req.body);

    const { name, email, phone, pair, address, cond } = req.body;

    if (!name || !email || !phone || !pair || !address || !cond) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    console.log('Form data:', { name, email, phone, pair, address, cond });

    const newClothes = new Cloth({
        name,
        email,
        phone,
        pair,
        address,
        cond,
    });

    try {
        await newClothes.save();
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


// ------------------------------- Education DB ------------------------------

app.post('/education-form', async (req, res) => {
    console.log('Received form submission');
    console.log('Request body:', req.body);

    const { name, email, phone, book, address, msg } = req.body;

    if (!name || !email || !phone || !book || !address || !msg) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    console.log('Form data:', { name, email, phone, book, address, msg });

    const newEducation = new Education({
        name,
        email,
        phone,
        book,
        address,
        msg,
    });

    try {
        await newEducation.save();
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


// ----------------------------------------- Money DB -----------------------------------

app.post('/money-form', async (req, res) => {
    console.log('Received form submission');
    console.log('Request body:', req.body);

    const { name, email, phone, amt, address, msg } = req.body;

    if (!name || !email || !phone || !amt || !address || !msg) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    console.log('Form data:', { name, email, phone, amt, address, msg });

    const newMoney = new Money({
        name,
        email,
        phone,
        amt,
        address,
        msg,
    });

    try {
        await newMoney.save();
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
