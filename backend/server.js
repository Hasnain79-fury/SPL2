const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database');  // Database connection module
const authRoutes = require('./routes/authRoutes');
const viewRoutes = require('./routes/viewRoutes');
const userRoutes = require('./routes/userRoutes'); // Add this line
const blogRoutes = require('./routes/blogRoutes');  
const authMiddleware = require('./middlewares/authMiddleware');  // Middleware for checking user authentication

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(express.json());  // Parse JSON payloads
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data
app.use(cookieParser());  // Parse cookies from the request headers
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from the 'public' directory

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Apply authentication middleware globally to provide `req.user`
app.use(authMiddleware);

// Define routes
app.use('/', viewRoutes);  // Home and view routes
app.use('/auth', authRoutes);  // Authentication routes
app.use('/blogs', blogRoutes);  // Register blog routes with /blogs prefix
app.use('/user', userRoutes); // Add this line

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
