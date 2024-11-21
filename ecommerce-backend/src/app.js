const express = require('express');
const cors = require('cors');
const charityRoutes = require("./routes/charity.routes");
const contactRoutes = require("../src/routes/contact.routes.js");
const authRoutes = require("../src/routes/auth/index.js");
const deliveryRoutes = require("../src/routes/DeliveryAddress.routes.js");
const addressRoutes = require("../src/routes/Address.routes.js");
const bodyParser = require("body-parser");
const paymentRoutes = require("../src/routes/Payment.routes.js");
const app = express();

app.use(bodyParser.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, etc.)
}));

app.use(express.json());

// Routes
app.use("/api/charity", charityRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/auth", authRoutes); // Authentication routes for register/login
app.use("/api/checkout", deliveryRoutes); // Delivery routes
app.use("/api/address", addressRoutes); // Address-related routes
app.use('/api/payment', paymentRoutes);  
// Test route
app.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome! Ecommerce User - Node", status: true });
});

module.exports = app;
