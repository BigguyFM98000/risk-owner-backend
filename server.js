require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const RiskownerRoutes = require('./routes/risk_owner_routes');
const PORT = process.env.PORT || 8090

const app = express();
const corsOptions = {origin: ["http://localhost:3000", "https://risk-owners-frontend.vercel.app/", "https://risk-owner-backend.onrender.com", "*"]}
app.use(cors(corsOptions))

// Enable CORS for all requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://risk-owners-frontend.vercel.app/');
  // You can add more headers as needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Two body-parser middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Connect to MongoDB database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONN_STRING, 
    {useNewUrlParser: true}).then(() => {
    console.log("Connected to the database")
  }).catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit()
  });

// Default route
app.get("/", (req, res) => {
    res.json({message: "Welcome to Risk Owner application."})
})

app.use('/riskowner', RiskownerRoutes);

// Set port and listen for requests
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  })
