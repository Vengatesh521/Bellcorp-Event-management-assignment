const express = require("express");
const protect = require("../middleware/protect");

const {
  getEvents,
  getSingleEvent,
  createEvent,
} = require("../controllers/eventController");

const router = express.Router();

// Public routes
router.get("/", getEvents);
router.get("/:id", getSingleEvent);

// Protected route (must login)
router.post("/", protect, createEvent);

module.exports = router;
