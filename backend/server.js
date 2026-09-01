// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middlewares
// app.use(cors()); // Cross-Origin Resource Sharing allow karta hai
// app.use(express.json()); // JSON data parse karne ke liye
// app.use(express.urlencoded({ extended: true })); // Form data parse karne ke liye

// // Basic Test Route
// app.get('/api/health', (req, res) => {
//     res.status(200).json({ 
//         success: true, 
//         message: "Land Digitization Backend is Running Smoothly! 🚀" 
//     });
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically (Optional, agar file URL se dekhni ho)
app.use('/uploads', express.static('uploads'));

// Routes Import
const documentRoutes = require('./routes/documentRoutes');
app.use('/api/documents', documentRoutes); // <-- Upload route connect ho gaya

// Base Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: "Land Digitization Backend is Running Smoothly! 🚀" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});