app.controller('SkillController', function($scope, SkillService) {
  console.log('SkillController initialized');
  $scope.skill = {
      skillCounts: [],
      fetchedSkillCounts: false
  };

  $scope.fetchSkillCounts = function() {
    console.log('Fetching skill counts...');
    SkillService.getSkillCounts().then(function(response) {
        console.log('Skill counts fetched:', response.data);
        $scope.skill.skillCounts = response.data;
        $scope.skill.fetchedSkillCounts = true;
    }, function(error) {
        console.error('Error fetching skill counts:', error);
    });
};

  $scope.fetchSkillCounts();
});