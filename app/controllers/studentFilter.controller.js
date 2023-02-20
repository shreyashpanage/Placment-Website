const Student = require("../models/user.model");
const url = require("url");
const querystring = require("querystring");

exports.getAll = async (req, res) => {
  console.log(req);
  try {
    // Retrieve filtering criteria from the referer header
    console.log("hereeeee ");
    const filterCriteria = req.query;
    console.log(filterCriteria);
    // Construct the MongoDB query based on the filtering criteria
    const query = {};
    if (filterCriteria.student_name) {
      query.name = { $regex: new RegExp(filterCriteria.student_name, "i") };
    }
    if (filterCriteria.department) {
      query.department = filterCriteria.department;
    }
    if (filterCriteria.passout_batch) {
      query.passout_batch = filterCriteria.passout_batch;
    }
    if (filterCriteria.cgpa) {
      query.cgpa = { $gte: Number(filterCriteria.cgpa) };
    }
    if (filterCriteria.back) {
      query.back = { $lte: Number(filterCriteria.back) };
    }
    if (filterCriteria.matric_marks) {
      query.matric_marks = { $gte: Number(filterCriteria.matric_marks) };
    }
    if (filterCriteria.placement_status) {
      query.placement_status = filterCriteria.placement_status;
    }

    // Get the filtered student data from MongoDB
    const students = await Student.find(query);
    console.log(students);
    // Send the filtered student data as a JSON response
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
