const express = require("express");
const app = express();
require("dotenv").config();
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
// Middleware
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);
app.use("/user", userRoutes);

// Start Server at PORT
const PORT = 4000;
app.listen(PORT, () => console.log(`Server at Port : ${PORT}`));
