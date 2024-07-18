const mongoose = require('mongoose');

const Skill = mongoose.model('Skill', new mongoose.Schema({
  college_id: Number,
  skills: String
}, { collection: 'skills' }));

const fetchAllSkills = async () => {
  console.log("Fetching all skills...");
  try {
    const result = await Skill.find({});
    console.log("Fetched skills:", result);
    return result;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};

module.exports = {
  fetchAllSkills
};
