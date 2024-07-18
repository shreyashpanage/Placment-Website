app.service('SkillService', function($http) {
  console.log('SkillService initialized');
  this.getSkillCounts = function() {
      return $http.get('/api/skills/skill-counts');
  };
});