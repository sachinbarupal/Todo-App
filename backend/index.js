const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");

// Middleware
// Allow from all domain / origins
app.use(cors());
app.use(express.json());

// specific
// app.use(
//   cors({
//     origin: "http://localhost:5173/",
//   })
// );

// Routes
app.use("/todos", todoRoutes);
app.use("/user", userRoutes);

// Start Server at PORT
const PORT = 4000;
app.listen(PORT, () => console.log(`Server at Port : ${PORT}`));
