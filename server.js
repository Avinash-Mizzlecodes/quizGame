require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongodb = require('./config/db');
const app = express();

mongodb();
// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS
app.use(express.static('public')); // Serve static files (for frontend)


// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
