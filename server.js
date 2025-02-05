import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import mongodb from './config/db.js'; // Ensure file extension is included

import userRoutes from './routes/userRoutes.js';

const app = express();

// Connect to MongoDB
mongodb();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Routes
app.use('/user', userRoutes);

// Deploying for Production
if (process.env.NODE_ENV === 'production') {
    const dirPath = path.resolve();
    app.use(express.static(path.join(dirPath, 'public')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(dirPath, 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
