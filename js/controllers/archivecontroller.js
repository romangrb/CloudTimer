(function() {
'use strict';
angular.module('timerApp')
.controller('ArchiveController', ['$scope', 'TasksService', 'timeFormatFilter',
function($scope, TasksService, timeFormatFilter){
	
	$scope.addTaskFromArchive = function(index){
			TasksService.addTask($scope.archive[index], index);
      $scope.getTotalTime();
	};	
	$scope.deleteFromArchive = function(index){
			TasksService.removeArchive(index);
      $scope.getTotalTime();
	};
  
  $scope.getTotalTime = function(){
    $scope.totalTime = 0;  
    angular.forEach($scope.archive, function(atimer){
      $scope.totalTime += atimer.currentTime;
    });
  }
  
	$scope.archive = TasksService.getArchiveList();
  $scope.getTotalTime();
}]);
})();