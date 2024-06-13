const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const AdminDetail = require('./models/AdminDetails');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 2000;

// Connect to MongoDB
connectDB().then(async () => {
  // Check if admin_details collection exists and insert default data if not
  const adminExists = await AdminDetail.findOne({ username: 'admin' });
  if (!adminExists) {
    await AdminDetail.create({
      username: 'admin',
      password: 'admin',
    });
    console.log('Default admin created');
  }
}).catch((error) => {
  console.error('Database connection error:', error);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
const formDataRoutes = require('./routes/formDataRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const countRoutes = require('./routes/countRoutes');

app.use('/', formDataRoutes);
app.use('/', categoryRoutes);
app.use('/', authRoutes);
app.use('/', countRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
