require("dotenv").config();

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const Routes = require("./routes/route.js")

// Load env variables
dotenv.config();

const PORT = process.env.PORT || 5001

app.use(express.json({ limit: '10mb' }))
app.use(cors())

// 🔍 DEBUG LINE → Check if env loaded
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB ✔"))
  .catch((err) => console.log("MongoDB Connection Error ❌", err));


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
