const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
app.use(cors());
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

mongoose
  .connect("mongodb://localhost:27017/todo_db_1")
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur MongoDB :", err));

const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());

app.use("/", taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
