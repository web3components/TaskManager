'use strict';

angular
.module('taskManagerApp')
.controller('LoginController', function ($scope, $http, $location) {
	
	var urlBase="";
	$http.defaults.headers.post["Content-Type"] = "application/json";

	//Login User
	$scope.login = function addTask() {
        $('#loaderSpinner').removeClass('ng-hide');
		if($scope.username=="" || $scope.password==""){
			alert("Please enter username and password");
		}
		else{
			$http.post(urlBase + '/login', {
				username: $scope.username,
				password: $scope.password
			}).
			success(function(data, status, headers) {
				console.log("Loging success");
				$('#loaderSpinner').addClass('ng-hide');
				$location.path('/task');
			});
		}
	};
});