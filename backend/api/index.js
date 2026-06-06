const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../connect/database');
const errorHandler = require('../middlewares/errorMiddleware');

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: ['https://beauty-salon-liard.vercel.app', 'http://localhost:5173'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('../routes/authRouter'));
app.use('/api/services', require('../routes/serviceRouter'));
app.use('/api/appointments', require('../routes/appointmentRouter'));
app.use('/api/staff', require('../routes/staffRouter'));

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Glamour Studio API is active!' });
});

app.use(errorHandler);

module.exports = app;
