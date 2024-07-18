const { fetchAllSkills } = require('../services/skill.services');

const getSkillCounts = async (req, res) => {
  try {
    console.log("Controller: Fetching all skills...");
    const skills = await fetchAllSkills();
    console.log("Controller: Skills fetched:", skills);
    res.json(skills);
  } catch (error) {
    console.error("Controller: Error fetching skills:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSkillCounts
};
