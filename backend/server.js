// Importing necessary modules
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./connect/database');
const cors = require('cors');

// Connecting to the database
connectDB();

// Setting the port for the server
const port = process.env.PORT || 5000;

// Initializing the Express application
const app = express();

// Enabling CORS for all routes
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://beauty-salon-liard.vercel.app',
      'https://beauty-salon-git-main-reis-projects-7345e2d1.vercel.app',
    ],
    credentials: true,
  }),
);

// Middleware to parse JSON bodies in requests
app.use(express.json());
// Middleware to parse URL-encoded bodies in requests
app.use(express.urlencoded({ extended: false }));

// Importing and using routes
app.use('/api/auth', require('./routes/authRouter'));
app.use('/api/services', require('./routes/serviceRouter'));
app.use('/api/appointments', require('./routes/appointmentRouter'));
app.use('/api/staff', require('./routes/staffRouter'));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Glamour Studio API aktive!' });
});

// Using the custom error handling middleware
app.use(errorHandler);

// Starting the server and listening on the specified port
app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`),
);

module.exports = app;
