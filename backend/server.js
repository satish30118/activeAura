const express = require("express");
const authRoute = require("./routes/authRoute");
const messageRoute = require("./routes/messageRoute");
require("dotenv").config();
const app = express();
// MongoDB Connection
require("./connectdb/db");

// Middleware
app.use(express.json());


// Routes
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/message", messageRoute)

app.get("/",(req, res)=>{
    res.send("Hello")
})


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
