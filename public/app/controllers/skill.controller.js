app.controller('SkillController', function($scope, SkillService) {
  $scope.skill = {
    skillCounts: [],
    fetchedSkillCounts: false
  };

  $scope.searchSkill = '';
  $scope.selectedSkill = null;

  $scope.fetchSkillCounts = function() {
    console.log('Fetching skill counts...');
    SkillService.getSkillCounts().then(function(response) {
      console.log('Skill counts fetched:', response.data);
      $scope.skill.skillCounts = response.data.map(function(skillCount) {
        // Ensure branchCounts is always an array
        skillCount.branchCounts = skillCount.branchCounts || [];
        // If branchCounts is empty, create a default "Unknown" branch
        if (skillCount.branchCounts.length === 0) {
          skillCount.branchCounts.push({ branch: 'Unknown', count: skillCount.count });
        }
        return skillCount;
      });
      $scope.skill.fetchedSkillCounts = true;
      createTopSkillsChart();
      initializeCertificatesChart();
    }, function(error) {
      console.error('Error fetching skill counts:', error);
    });
  };

  function createTopSkillsChart() {
    var topSkills = $scope.skill.skillCounts
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    var maxCount = Math.max(...topSkills.map(skill => skill.count));
    var yAxisMax = Math.ceil(maxCount / 20) * 20;

    var ctx = document.getElementById('topSkillsChart').getContext('2d');
    var chart = new Chart(ctx, {
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
            max: yAxisMax,
            title: {
              display: true,
              text: 'Count'
            },
            ticks: {
              stepSize: Math.ceil(yAxisMax / 10)
            }
          },
          x: {
            title: {
              display: true,
              text: 'Skills'
            }
          }
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            $scope.selectedSkill = topSkills[index];
            $scope.$apply();
            createBranchChart($scope.selectedSkill);
          }
        }
      }
    });
  }

  function createBranchChart(skill) {
    var ctx = document.getElementById('branchChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: skill.branchCounts.map(bc => bc.branch),
        datasets: [{
          data: skill.branchCounts.map(bc => bc.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Branch Distribution for ${skill.skill}`
          },
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== undefined) {
                  label += context.parsed + ' students';
                }
                return label;
              }
            }
          }
        }
      }
    });
  }

  function initializeCertificatesChart() {
    var ctx = document.getElementById('certificatesChart').getContext('2d');
    new Chart(ctx, {
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

  $scope.filterSkills = function() {
    return $scope.skill.skillCounts.filter(function(skillCount) {
      return skillCount.skill.toLowerCase().includes($scope.searchSkill.toLowerCase());
    });
  };

  $scope.fetchSkillCounts();
});