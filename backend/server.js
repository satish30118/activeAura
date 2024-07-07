const express = require("express");
const http = require("http");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const socketSetup = require("./helpher/SocketIo");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketSetup(server);

// MongoDB Connection
require("./connectdb/db");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
