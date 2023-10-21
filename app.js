const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 9000;

mongoose.connect('mongodb+srv://vaibhavraut087:Tsm%402020@cluster0.nciuo9g.mongodb.net/newdata', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log('MongoDB is connected');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const bloodSchema = new mongoose.Schema({
  name: String,
  phone: String,
  location: String,
  gender: String,
  age: String,
  bloodGroup: String,
  district: String,
  city: String,
});

const Blood = mongoose.model('Blood', bloodSchema);

app.use(bodyParser.urlencoded({ extended: true }));

// Serve your HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'FORM.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const formData = req.body;
  const newDonor = new Blood(formData);

  try {
    await newDonor.save();
    res.send('Data saved successfully.');
  } catch (err) {
    console.error(err);
    res.send('Error saving data.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
