require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

/* Welcome route */
app.get("/", (req, res) => {
  console.log("✅ Base URL '/' was accessed");
  res.send("Bell corp API Working...");
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/register", require("./routes/registrationRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server started on http://localhost:${process.env.PORT}`),
);
