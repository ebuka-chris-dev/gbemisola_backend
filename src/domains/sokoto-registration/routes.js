const express = require("express");
const router = express.Router();
const Registration = require("./model");
const Slot = require("./slotModel");
const slotLimits = require("../../util/slotLimits");
const { Parser } = require("json2csv");

// Check Slot Availability
router.get("/slot/checking", async (req, res) => {
  try {
    const { competition, zone, schoolType, educationLevel } = req.query;
    // Normalize schoolType
    const normalizedSchoolType = schoolType.replace(/ School$/, '').trim(); // "Private School" → "Private"

    const slotRecord = await Slot.findOne({ competition, zone, schoolType, educationLevel });
    const used = slotRecord ? slotRecord.slotsUsed : 0;

    const limit = slotLimits[normalizedSchoolType][educationLevel];
    if (used >= limit) {
      return res.json({ available: false, remainingSlots: 0 });
    }
    res.json({ available: true, remainingSlots: limit - used });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Submit Registration
router.post("/", async (req, res) => {
  try {
    const { competition, zone, schoolType, educationLevel } = req.body;
    const normalizedSchoolType = schoolType.replace(/ School$/, '').trim(); // "Private School" → "Private"
    const limit = slotLimits[normalizedSchoolType][educationLevel];

    let slotRecord = await Slot.findOne({ competition, zone, schoolType, educationLevel });

    if (!slotRecord) {
      slotRecord = new Slot({ competition, zone, schoolType, educationLevel });
    }

    if (slotRecord.slotsUsed >= limit) {
      return res.status(400).json({ message: "Registration for this category in your zone is already full." });
    }

    const registration = new Registration(req.body);
    await registration.save();

    slotRecord.slotsUsed += 1;
    await slotRecord.save();

    res.json({ message: "Registration successful", status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed kindly try again later",status: "error" });
  }
});

// Get all registrations with optional filters and pagination
// router.get("/", async (req, res) => {
//   try {
//     const filters = {};
//     ["competition", "zone", "schoolType", "educationLevel"].forEach(key => {
//       if (req.query[key]) filters[key] = req.query[key];
//     });

//     // Pagination parameters
//     const page = parseInt(req.query.page) || 1; // default page 1
//     const limit = parseInt(req.query.limit) || 10; // default 10 per page
//     const skip = (page - 1) * limit;

//     const total = await Registration.countDocuments(filters);
//     const registrations = await Registration.find(filters)
//       .sort({ createdAt: -1 }) // latest first
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//       totalRegistrations: total,
//       registrations
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const filters = {};
    ["competition", "zone", "schoolType", "educationLevel"].forEach(key => {
      if (req.query[key]) filters[key] = req.query[key];
    });

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get registrations
    const total = await Registration.countDocuments(filters);
    const registrations = await Registration.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // 🔥 Fetch all slots once
    const slots = await Slot.find();

    // 🔥 Create lookup map
    const slotMap = {};
    slots.forEach(slot => {
      const key = `${slot.competition}_${slot.zone}_${slot.schoolType}_${slot.educationLevel}`;
      slotMap[key] = slot.slotsUsed;
    });

    // 🔥 Attach slot info to each registration
    const enrichedRegistrations = registrations.map(reg => {
      const key = `${reg.competition}_${reg.zone}_${reg.schoolType}_${reg.educationLevel}`;

      const used = slotMap[key] || 0;

      const normalizedSchoolType = reg.schoolType.replace(/ School$/, '').trim();
      const limit = slotLimits[normalizedSchoolType]?.[reg.educationLevel] || 0;

      return {
        ...reg._doc,
        slot: {
          used,
          limit,
          remaining: limit - used
        }
      };
    });

    res.json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalRegistrations: total,
      registrations: enrichedRegistrations
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/zones/count", async (req, res) => {
  try {
    const allZones = [
      "Bodinga Zone",
      "GORONYO Zone",
      "GWADABAWA Zone",
      "Sokoto South Zone",
      "Sokoto North Zone",
      "Yabo Zone"
    ];

    const counts = await Registration.aggregate([
      {
        $group: {
          _id: "$zone",
          total: { $sum: 1 },
        },
      },
    ]);

    // Initialize result with all zones as 0
    const result = {};
    allZones.forEach((zone) => {
      result[zone] = 0;
    });

    // Fill in counts from aggregation
    counts.forEach((c) => {
      result[c._id] = c.total;
    });

    res.json({
      totalZones: result,
      message: "Zone counts retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
// Get slot usage
router.get("/slots", async (req, res) => {
  const slots = await Slot.find();
  res.json(slots);
});

// Export registrations as CSV with optional filters and pagination
router.get("/export", async (req, res) => {
  try {
    const filters = {};
    ["competition", "zone", "schoolType", "educationLevel"].forEach(key => {
      if (req.query[key]) filters[key] = req.query[key];
    });

    // Pagination parameters (optional)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 0; // 0 means export all
    const skip = limit > 0 ? (page - 1) * limit : 0;

    const registrations = await Registration.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit > 0 ? limit : undefined);

    if (registrations.length === 0) {
      return res.status(404).json({ message: "No registrations found for the given filters." });
    }

    const parser = new Parser();
    const csv = parser.parse(registrations);

    // Set headers to force download
    res.header("Content-Type", "text/csv");
    res.attachment(
      limit > 0
        ? `registrations_page_${page}.csv`
        : "registrations_all.csv"
    );
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;