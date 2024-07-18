const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Schemas
const Skill = mongoose.model('Skill', new mongoose.Schema({
  college_id: String,
  skills: String
}, { collection: 'skills' }));

const SkillCount = mongoose.model('SkillCount', new mongoose.Schema({
  skill: String,
  count: Number
}, { collection: 'skillcount' }));

// Database operations
const clearSkillCounts = async () => {
  return await SkillCount.deleteMany({});
};

const aggregateSkills = async () => {
  return await Skill.aggregate([
    { $group: { _id: "$skills", count: { $sum: 1 } } },
    { $project: { skill: "$_id", count: 1, _id: 0 } },
    { $sort: { count: -1 } }
  ]);
};

const insertSkillCounts = async (skillCounts) => {
  return await SkillCount.insertMany(skillCounts);
};

const fetchSkillCounts = async () => {
  return await SkillCount.find().sort({ count: -1 });
};

// Controller functions
const populateSkillCount = async (req, res) => {
  try {
    console.log("Starting skill count population...");

    await clearSkillCounts();
    console.log("Cleared existing skill counts.");

    const skillCounts = await aggregateSkills();
    console.log("Aggregated skill counts:", skillCounts);

    const insertResult = await insertSkillCounts(skillCounts);
    console.log("Inserted skill counts:", insertResult);

    res.json({ message: 'Skillcount collection populated successfully', count: insertResult.length });
  } catch (error) {
    console.error("Error in populateSkillCount:", error);
    res.status(500).json({ message: error.message });
  }
};

const getSkillCounts = async (req, res) => {
  try {
    console.log("Fetching skill counts...");
    const skillCounts = await fetchSkillCounts();
    console.log("Fetched skill counts:", skillCounts);
    res.json(skillCounts);
  } catch (error) {
    console.error("Error in getSkillCounts:", error);
    res.status(500).json({ message: error.message });
  }
};

// Existing route (assuming this is your current route that works)
router.get('/', async (req, res) => {
  // Your existing logic for GET /api/skills
});

// New routes
router.post('/populate-skill-count', populateSkillCount);
router.get('/skill-counts', getSkillCounts);

module.exports = router;