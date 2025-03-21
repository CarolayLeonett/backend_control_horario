//app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");

const app = express();
const corsOptions = {
  allowedHeaders: ["Authorization", "Content-Type"],
};
app.use(bodyParser.json());
app.use(cors());
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
