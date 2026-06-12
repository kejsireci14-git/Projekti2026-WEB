
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./connect/database');
const cors = require('cors');

connectDB();

const port = process.env.PORT || 5000;

const app = express();

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', require('./routes/authRouter'));
app.use('/api/services', require('./routes/serviceRouter'));
app.use('/api/appointments', require('./routes/appointmentRouter'));
app.use('/api/staff', require('./routes/staffRouter'));

app.get('/', (req, res) => {
  res.json({ message: 'Glamour Studio API aktive!' });
});

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`),
);

module.exports = app;
