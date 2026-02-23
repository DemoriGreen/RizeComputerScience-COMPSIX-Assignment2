const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const menuRoutes = require("./routes/menuRoutes");

app.use(express.json());
app.use(logger);

app.use("/api/menu", menuRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});