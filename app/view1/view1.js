'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	var myFirebaseRef = new Firebase($rootScope.FBURL);

	myFirebaseRef.child("1234567890/data/inputs").on("value", function(snapshot) {
		$scope.dataFeed = snapshot.val();
		$scope.$apply();
	});

	$scope.removeData = function(){
		myFirebaseRef.child("1234567890/data/inputs").remove();
	};
}]);