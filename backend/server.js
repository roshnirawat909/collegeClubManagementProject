const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const dotenv = require('dotenv');



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://college-club-management-project-e2hba6sxt.vercel.app',
  'https://college-club-management-project-8vu.vercel.app'
];

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: origin not allowed'));
    }
  },
  credentials: true
}));
app.options('*', cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clubs', require('./routes/clubs'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/updates', require('./routes/updates'));
app.use('/api/sac', require('./routes/sac'));

app.get('/', (req, res) => {
 res.send({
  activeStatus : true,
  error : false 
 })
});



// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

