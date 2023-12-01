const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

mongoose.connect('mongodb+srv://microservicios:tO9XP3pJN4vMqTFV@cluster0.1mtrn4l.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB: ', err);
  });

// Create a MongoDB schema and model for your data
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteColor: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '..', 'frontend', 'index.html');
  res.sendFile(indexPath);
});

// Define API endpoints
app.post('/api/users', async (req, res) => {
  try {
    const { name, age, favoriteColor } = req.body;
    const newUser = new User({ name, age, favoriteColor });
    await newUser.save();

    // Calculate the number of users with the same age and favorite color
    const sameAgeCount = await User.countDocuments({ age });
    const sameColorCount = await User.countDocuments({ favoriteColor });

    res.status(201).json({
      user: newUser,
      sameAgeCount,
      sameColorCount,
    });
  } catch (error) {
    console.error('Error creating user: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
