const Student = require("../models/user.model");
const url = require("url");
const querystring = require("querystring");

exports.getAll = async (req, res) => {
  console.log(req.query, "Reaching till here------>");
  try {
    // Retrieve filtering criteria from the referer header
    console.log("hereeeee ");
    const filterCriteria = req.query;
    console.log(filterCriteria);
    // Construct the MongoDB query based on the filtering criteria
    const query = {};
    const companyFields = ["company1", "company2", "company3", "company4"];
    if (filterCriteria.company) {
      // Create an array of fields to check (company1, company2, company3, company4)

      // Create a $or query to check if any of the company fields contain the given company value (case-insensitive)
      query.$or = companyFields.map((field) => ({
        [field]: { $regex: new RegExp(filterCriteria.company, "i") },
      }));
    }
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
    if (filterCriteria.minMatricMarks) {
      query.matric_marks = { $gte: Number(filterCriteria.minMatricMarks) };
    }
    if (filterCriteria.placementStatus) {
      if (filterCriteria.placementStatus === "Placed") {
        query.$or = companyFields.map((field) => ({ [field]: { $ne: "" } }));
      } else if (filterCriteria.placementStatus === "Unplaced") {
        query.$or = [{ company1: { $exists: false } }, { company1: "" }];
      }
    }
    query.permission = "student";
    console.log("here is query", query);
    // Get the filtered student data from MongoDB
    // console.log(students)
    Student.find(query)
      .lean() // Convert Mongoose documents to plain JavaScript objects
      .then((students) => {
        // Convert Decimal128 values to strings
        students.forEach((student) => {
          student.cgpa = student.cgpa ? student.cgpa.toString() : "";
          student.matric_marks = student.matric_marks
            ? student.matric_marks.toString()
            : "";
        });

        console.log(students);
        res.status(200).json({ success: true, students: students });
      })
      .catch((err) => {
        res
          .status(200)
          .json({ success: false, message: "Something went wrong!" });
      });
    // Send the filtered student data as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
