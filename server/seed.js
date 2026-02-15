require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Event = require("./models/Event");

connectDB();

const seedEvents = async () => {
  try {
    await Event.deleteMany(); // Clear old events

    const events = [
      {
        title: "AI & Machine Learning Summit",
        organizer: "TechWorld",
        description: "A conference focused on AI trends and ML innovations.",
        dateTime: new Date("2026-04-15T10:00:00"),
        location: "Chennai",
        capacity: 200,
        category: "Tech",
      },
      {
        title: "React Developer Conference",
        organizer: "Frontend Masters",
        description: "Deep dive into React 19 and modern frontend practices.",
        dateTime: new Date("2026-05-10T09:00:00"),
        location: "Bangalore",
        capacity: 150,
        category: "Tech",
      },
      {
        title: "Startup Pitch Night",
        organizer: "Startup India",
        description: "Pitch your startup ideas to investors.",
        dateTime: new Date("2026-06-20T17:00:00"),
        location: "Hyderabad",
        capacity: 120,
        category: "Business",
      },
      {
        title: "Digital Marketing Bootcamp",
        organizer: "GrowthHub",
        description: "SEO, social media and paid ads workshop.",
        dateTime: new Date("2026-07-05T11:00:00"),
        location: "Mumbai",
        capacity: 180,
        category: "Business",
      },
      {
        title: "Cloud Computing Expo",
        organizer: "AWS Community",
        description: "Explore AWS, Azure & Google Cloud services.",
        dateTime: new Date("2026-08-18T10:00:00"),
        location: "Delhi",
        capacity: 250,
        category: "Tech",
      },

      // Past Events
      {
        title: "Music Fest 2023",
        organizer: "LiveNation",
        description: "Open air music festival with top artists.",
        dateTime: new Date("2023-05-12T18:00:00"),
        location: "Delhi",
        capacity: 500,
        category: "Music",
      },
      {
        title: "College Tech Fest 2024",
        organizer: "Anna University",
        description: "Coding competitions and robotics expo.",
        dateTime: new Date("2024-09-15T09:00:00"),
        location: "Chennai",
        capacity: 300,
        category: "Tech",
      },
      {
        title: "Business Leadership Summit",
        organizer: "Corporate India",
        description: "Leadership and management strategies.",
        dateTime: new Date("2024-10-10T10:00:00"),
        location: "Mumbai",
        capacity: 220,
        category: "Business",
      },
      {
        title: "Football Championship",
        organizer: "Sports League",
        description: "Inter-city football championship.",
        dateTime: new Date("2023-12-01T16:00:00"),
        location: "Bangalore",
        capacity: 400,
        category: "Sports",
      },
      {
        title: "Photography Workshop",
        organizer: "Creative Minds",
        description: "Master photography techniques.",
        dateTime: new Date("2024-06-22T10:00:00"),
        location: "Hyderabad",
        capacity: 100,
        category: "Workshop",
      },

      // More Upcoming Events
      {
        title: "Cyber Security Conference",
        organizer: "SecureTech",
        description: "Latest trends in cyber security.",
        dateTime: new Date("2026-09-10T09:00:00"),
        location: "Chennai",
        capacity: 180,
        category: "Tech",
      },
      {
        title: "UI/UX Design Workshop",
        organizer: "DesignPro",
        description: "Hands-on Figma & UX research workshop.",
        dateTime: new Date("2026-10-15T11:00:00"),
        location: "Bangalore",
        capacity: 90,
        category: "Workshop",
      },
      {
        title: "Blockchain Meetup",
        organizer: "Crypto India",
        description: "Discuss blockchain and web3 innovations.",
        dateTime: new Date("2026-11-05T14:00:00"),
        location: "Mumbai",
        capacity: 130,
        category: "Tech",
      },
      {
        title: "Entrepreneurship Bootcamp",
        organizer: "Startup Hub",
        description: "Learn how to build scalable startups.",
        dateTime: new Date("2026-12-20T10:00:00"),
        location: "Delhi",
        capacity: 150,
        category: "Business",
      },
      {
        title: "Cricket Tournament",
        organizer: "Sports Club",
        description: "City-level cricket competition.",
        dateTime: new Date("2026-03-01T08:00:00"),
        location: "Hyderabad",
        capacity: 300,
        category: "Sports",
      },

      // Extra to reach 20
      {
        title: "Yoga Wellness Retreat",
        organizer: "HealthFirst",
        description: "Mindfulness and yoga sessions.",
        dateTime: new Date("2026-04-02T07:00:00"),
        location: "Goa",
        capacity: 80,
        category: "Health",
      },
      {
        title: "Data Science Bootcamp",
        organizer: "Analytics Pro",
        description: "Learn Python & Data Analysis.",
        dateTime: new Date("2026-05-25T09:00:00"),
        location: "Chennai",
        capacity: 140,
        category: "Tech",
      },
      {
        title: "Food Festival 2026",
        organizer: "City Events",
        description: "Taste cuisines from around the world.",
        dateTime: new Date("2026-06-12T12:00:00"),
        location: "Mumbai",
        capacity: 600,
        category: "Food",
      },
      {
        title: "Art Exhibition",
        organizer: "Art Gallery",
        description: "Modern art display and live painting.",
        dateTime: new Date("2026-07-08T15:00:00"),
        location: "Delhi",
        capacity: 200,
        category: "Art",
      },
      {
        title: "Mobile App Hackathon",
        organizer: "Dev Community",
        description: "Build innovative mobile apps in 24 hours.",
        dateTime: new Date("2026-08-30T09:00:00"),
        location: "Bangalore",
        capacity: 250,
        category: "Tech",
      },
    ];

    await Event.insertMany(events);

    console.log("✅ 20 Events Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedEvents();
