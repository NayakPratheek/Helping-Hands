const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a mongoose schema for your data
const volunteerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
});

// Create a mongoose model based on the schema
const Volunteer = mongoose.model('Volunteer', volunteerSchema);

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Serve HTML and static files
app.use(express.static('public'));

// Handle GET requests for the root path
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

// Handle form submission
app.post('/submit-form', async (req, res) => {
    try {
        // Create a new volunteer instance based on the request body
        const newVolunteer = new Volunteer(req.body);

        // Save the new volunteer to the database
        await newVolunteer.save();

        // Send a success response
        res.status(200).send('Form submitted successfully!');
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
