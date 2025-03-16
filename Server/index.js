const express = require("express");
const Database = require('./Configs/Database');
const env = require('dotenv').config();
const AppRouter = require('./Routes/Route')
const cors = require('cors');
const app = express();


const PORT = process.env.PORT || 3000

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(origin = "http://localhost:5173"));

// Initial Route
app.get("/", (req, res) => {
  res.json({ msg: "YouTube server is running" });
});

//Routes
app.use("/api/main", AppRouter)


//Start Server
app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
  Database()
});
