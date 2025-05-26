const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Result = require('./models/Result');

const app = express();
const PORT = process.env.PORT || 4000;

// Replace <db_password> with your actual password
const mongoURI = 'mongodb+srv://rshashank20:Idkwhybms%4020@cluster0.r6v1oxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

// Signup
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
});

// Middleware to verify JWT
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Save a result
app.post('/api/results', auth, async (req, res) => {
  const { semester, sgpa, totalCredits, courses } = req.body;
  try {
    const result = new Result({
      user: req.userId,
      semester,
      sgpa,
      totalCredits,
      courses
    });
    await result.save();
    res.status(201).json({ message: 'Result saved', result });
  } catch (err) {
    res.status(500).json({ message: 'Error saving result', error: err });
  }
});

// Get all results for the logged-in user
app.get('/api/results', auth, async (req, res) => {
  try {
    const results = await Result.find({ user: req.userId }).sort({ semester: 1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching results', error: err });
  }
});

// Edit a result
app.put('/api/results/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { semester, sgpa, totalCredits, courses } = req.body;
  try {
    const result = await Result.findOneAndUpdate(
      { _id: id, user: req.userId },
      { semester, sgpa, totalCredits, courses },
      { new: true }
    );
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.json({ message: 'Result updated', result });
  } catch (err) {
    res.status(500).json({ message: 'Error updating result', error: err });
  }
});

// Delete a result
app.delete('/api/results/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Result.findOneAndDelete({ _id: id, user: req.userId });
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.json({ message: 'Result deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting result', error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 