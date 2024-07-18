app.controller('SkillController', function($scope, SkillService) {
  $scope.skill = {
      skillCounts: [],
      fetchedSkillCounts: false
  };

  $scope.searchSkill = '';

  $scope.fetchSkillCounts = function() {
      console.log('Fetching skill counts...');
      SkillService.getSkillCounts().then(function(response) {
          console.log('Skill counts fetched:', response.data);
          $scope.skill.skillCounts = response.data;
          $scope.skill.fetchedSkillCounts = true;
          createTopSkillsChart();
      }, function(error) {
          console.error('Error fetching skill counts:', error);
      });
  };

  function createTopSkillsChart() {
    var topSkills = $scope.skill.skillCounts
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    // Find the maximum count
    var maxCount = Math.max(...topSkills.map(skill => skill.count));

    // Round up the max count to the nearest hundred and add 200 for extra space
    var yAxisMax = Math.ceil(maxCount / 20) *20;

    var ctx = document.getElementById('topSkillsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topSkills.map(skill => skill.skill),
            datasets: [{
                label: 'Skill Count',
                data: topSkills.map(skill => skill.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: yAxisMax, // Set the maximum value for y-axis
                    title: {
                        display: true,
                        text: 'Count'
                    },
                    ticks: {
                        stepSize: Math.ceil(yAxisMax / 10) // Adjust step size for nice intervals
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Skills'
                    }
                }
            }
        }
    });
}

// Assuming you have access to AngularJS and its $scope or $rootScope

// Initialize the pie chart for certificates
function initializeCertificatesChart() {
  var ctx = document.getElementById('certificatesChart').getContext('2d');
  var certificatesChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Amazon Cloud Practitioner Certificate', 'Other'],
      datasets: [{
        label: 'Certificates',
        data: [83, 100 - 83], // 83 students with the certificate
        backgroundColor: [
          'rgba(235, 171, 33, 0.6)', // Certificate color
          'rgba(200, 200, 200, 0.6)'  // Other color
        ],
        borderColor: [
          'rgba(235, 171, 33, 1)',
          'rgba(200, 200, 200, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.label + ': ' + tooltipItem.raw + ' students';
            }
          }
        }
      }
    }
  });
}

// Call this function after your AngularJS app is loaded
initializeCertificatesChart();


  // Function to filter skills based on search
  $scope.filterSkills = function() {
      return $scope.skill.skillCounts.filter(function(skillCount) {
          return skillCount.skill.toLowerCase().includes($scope.searchSkill.toLowerCase());
      });
  };

  // Initialize the controller
  $scope.fetchSkillCounts();
});