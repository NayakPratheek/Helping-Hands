const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const volunteerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

app.use(express.static('public', { extensions: ['html', 'css'] }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

// Update the '/submit-form' route to send a JSON response instead of redirecting
app.post('/submit-form', async (req, res) => {
    console.log('Received form submission');
    console.log('Request body:', req.body);

    const { name, email, phone, address } = req.body;
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
        res.json({ success: true, message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error saving to database:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});