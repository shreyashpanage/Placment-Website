const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Schemas
const Skill = mongoose.model('Skill', new mongoose.Schema({
  college_id: String,
  skills: String,
  branch: String // Add branch to the schema
}, { collection: 'skills' }));

const SkillCount = mongoose.model('SkillCount', new mongoose.Schema({
  skill: String,
  count: Number,
  branchCounts: [{
    branch: String,
    count: Number
  }]
}, { collection: 'skillcount' }));

// Database operations
const clearSkillCounts = async () => {
  return await SkillCount.deleteMany({});
};

const aggregateSkills = async () => {
  return await Skill.aggregate([
    { $project: { skillArray: { $split: ["$skills", ","] }, branch: 1 } },
    { $unwind: "$skillArray" },
    { $project: { skill: { $trim: { input: "$skillArray" } }, branch: 1 } },
    { $group: {
      _id: { skill: "$skill", branch: "$branch" },
      count: { $sum: 1 }
    }},
    { $group: {
      _id: "$_id.skill",
      count: { $sum: "$count" },
      branchCounts: {
        $push: {
          branch: "$_id.branch",
          count: "$count"
        }
      }
    }},
    { $project: {
      skill: "$_id",
      count: 1,
      branchCounts: 1,
      _id: 0
    }},
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
    const skillCounts = await aggregateSkills();
    const insertResult = await insertSkillCounts(skillCounts);
    res.json({ message: 'Skillcount collection populated successfully', count: insertResult.length });
  } catch (error) {
    console.error("Error in populateSkillCount:", error);
    res.status(500).json({ message: error.message });
  }
};

const getSkillCounts = async (req, res) => {
  try {
    const skillCounts = await fetchSkillCounts();
    res.json(skillCounts);
  } catch (error) {
    console.error("Error in getSkillCounts:", error);
    res.status(500).json({ message: error.message });
  }
};

// Routes
router.post('/populate-skill-count', populateSkillCount);
router.get('/skill-counts', getSkillCounts);

module.exports = router; 