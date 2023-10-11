const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: '*', 
};

app.use(cors(corsOptions));


// Middleware
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Define routes
app.use('/api/tasks', require('./routes/tasks'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
