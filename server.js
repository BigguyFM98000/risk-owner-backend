require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const RiskownerRoutes = require('./routes/risk_owner_routes');
const PORT = process.env.PORT || 8090

const app = express();
const corsOptions = {origin: ["http://localhost:3000", "https://risk-owners-backend.onrender.com/", "https://risk-owners-frontend.vercel.app/"]}
app.use(cors(corsOptions))
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
