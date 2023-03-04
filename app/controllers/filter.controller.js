var filter=angular.module('filter')
filter.controller("studentsController", function ($scope, studentService) {
  $scope.main = {
    authorized: true, // change this to false if the user is not authorized
    filteredData: [],
  }; 
  $scope.filterData = () => {
    console.log("hello");
    let filteredData = [];
    let students = studentService.getAllStudents();
    for (let i = 0; i < students.length; i++) {
      let student = students[i];
      if (
        student.year_gap >= $scope.yearGap &&
        student.placement_status == $scope.placementStatus &&
        student.cgpa >= $scope.cgpa &&
        student.department == $scope.department &&
        student.passout_batch == $scope.passoutBatch &&
        student.student_name
          .toLowerCase()
          .includes($scope.studentName.toLowerCase())
      ) {
        filteredData.push(student);
      }
    }
    if (filteredData.length > 0) {
      $scope.main.filteredData = filteredData;
    }
  };
});
