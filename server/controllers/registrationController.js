const Event = require("../models/Event");

// REGISTER FOR EVENT
const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check already registered
    if (event.registeredUsers.includes(req.user._id))
      return res.status(400).json({ message: "Already registered" });

    // Check capacity
    if (event.registeredUsers.length >= event.capacity)
      return res.status(400).json({ message: "Event full" });

    event.registeredUsers.push(req.user._id);
    await event.save();

    res.json({ message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CANCEL REGISTRATION
const cancelRegistration = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    event.registeredUsers = event.registeredUsers.filter(
      (userId) => userId.toString() !== req.user._id.toString(),
    );

    await event.save();

    res.json({ message: "Registration cancelled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY REGISTERED EVENTS
const getMyRegisteredEvents = async (req, res) => {
  try {
    const events = await Event.find({
      registeredUsers: req.user._id,
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerForEvent,
  getMyRegisteredEvents,
  cancelRegistration,
};
