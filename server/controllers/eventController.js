const Event = require("../models/Event");

// GET ALL EVENTS (Search + Filter)
const getEvents = async (req, res) => {
  try {
    const { search, location, category } = req.query;

    let query = {};

    // 🔎 Text Search (Title + Description using Regex)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // 📍 Location Filter
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // 🏷 Category Filter
    if (category) {
      query.category = category;
    }

    const events = await Event.find(query).sort({ dateTime: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEvents,
};

// GET SINGLE EVENT
const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const {
      title,
      organizer,
      description,
      dateTime,
      location,
      seats,
      category,
    } = req.body;

    const event = await Event.create({
      title,
      organizer,
      description,
      dateTime,
      location,
      capacity: seats,
      category,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEvents,
  getSingleEvent,
  createEvent,
};
