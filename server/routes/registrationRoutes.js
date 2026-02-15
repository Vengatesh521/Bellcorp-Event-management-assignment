const express = require("express");
const protect = require("../middleware/protect");

const {
  registerForEvent,
  cancelRegistration,
  getMyRegisteredEvents,
} = require("../controllers/registrationController");

const router = express.Router();
router.get("/my-events", protect, getMyRegisteredEvents);

router.post("/:id", protect, registerForEvent);
router.delete("/:id", protect, cancelRegistration);

module.exports = router;
