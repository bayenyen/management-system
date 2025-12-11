require("dotenv").config(); // Load env variables

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Routes = require("./routes/route.js");

const app = express();

// PORT from environment or fallback for local dev
const PORT = process.env.PORT || 5001;

// MongoDB connection string from env
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(express.json({ limit: '10mb' }));

// CORS setup – safe for Vercel frontend
app.use(cors({
  origin: "https://management-systems-six.vercel.app", // Your frontend URL
  credentials: true
}));

// Routes mounted at /api
app.use("/api", Routes);

// Connect to MongoDB
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB ✔"))
  .catch((err) => console.error("MongoDB Connection Error ❌", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});



mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})
