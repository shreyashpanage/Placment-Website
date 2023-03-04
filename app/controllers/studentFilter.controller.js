const Student = require("../models/user.model");
const url = require("url");
const querystring = require("querystring");

exports.getAll = async (req, res) => {
  console.log(req.query);
  try {
    // Retrieve filtering criteria from the referer header
    console.log("hereeeee ");
    const filterCriteria = req.query;
    console.log(filterCriteria);
    // Construct the MongoDB query based on the filtering criteria
    const query = {};
    if (filterCriteria.name) {
      query.student_name = { $regex: new RegExp(filterCriteria.name, "i") };
    }
    if (filterCriteria.department) {
      query.department = filterCriteria.department;
    }
    if (filterCriteria.passoutBatch) {
      query.passout_batch = filterCriteria.passoutBatch;
    }
    if (filterCriteria.minCGPA) {
      query.cgpa = { $gte: Number(filterCriteria.minCGPA) };
    }
    if (filterCriteria.back) {
      query.back = { $lte: Number(filterCriteria.back) };
    }
    if (filterCriteria.matric_marks) {
      query.matric_marks = { $gte: Number(filterCriteria.matric_marks) };
    }
    if (filterCriteria.placementStatus) {
      query.placement_status = filterCriteria.placementStatus;
    }
    query.permission='student';
    console.log("here is query",query);
    // Get the filtered student data from MongoDB
    // console.log(students)
  Student.find(query)
    .then(students => {
      console.log(students)
      res.status(200).json({ success : true, students : students })
  })
  .catch(err => {
      res.status(200).json({ success : false, message : 'Something went wrong!' })
  });
    // Send the filtered student data as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
