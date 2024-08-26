const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoURI } = require('./config');
const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes');
const instructorRoutes = require('./routes/instructorRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/instructor', instructorRoutes);

// Connect to MongoDB and start the server
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(8000, () => console.log('Server running on port 8000')))
  .catch(err => console.log(err));
