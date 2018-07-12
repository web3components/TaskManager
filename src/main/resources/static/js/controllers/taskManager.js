'use strict';

angular
.module('taskManagerApp')
.controller('TaskManagerController', function ($scope, $http) {
	
	var urlBase="";
	$scope.toggle=true;
	$scope.selection = [];
	$scope.statuses=['ACTIVE','COMPLETED'];
	$scope.priorities=['HIGH','LOW','MEDIUM'];
	$http.defaults.headers.post["Content-Type"] = "application/json";

    function findAllTasks() {
        //Get all tasks and display initially
        $http.get(urlBase + '/tasks/search/findByTaskArchived?archivedfalse=0').
        	success(function (data) {
        		$('#loaderSpinner').removeClass('ng-hide');
        		if (data._embedded != undefined) {
                    $scope.tasks = data._embedded.tasks;
                } else {
                    $scope.tasks = [];
                }
                for (var i = 0; i < $scope.tasks.length; i++) {
                    if ($scope.tasks[i].taskStatus == 'COMPLETED') {
                        $scope.selection.push($scope.tasks[i].taskId);
                    }
                }
                $scope.taskName="";
                $scope.taskDesc="";
                $scope.taskPriority="";
                $scope.taskStatus="";
                $scope.toggle='!toggle';
                $('#loaderSpinner').addClass('ng-hide');
            });
    }

    findAllTasks();

	//add a new task
	$scope.addTask = function addTask() {
		if($scope.taskName=="" || $scope.taskDesc=="" || $scope.taskPriority == "" || $scope.taskStatus == ""){
			alert("Insufficient Data! Please provide values for task name, description, priortiy and status");
		}
		else{
			$('#loaderSpinner').removeClass('ng-hide');
			$http.post(urlBase + '/tasks', {
				taskName: $scope.taskName,
				taskDescription: $scope.taskDesc,
				taskPriority: $scope.taskPriority,
				taskStatus: $scope.taskStatus
			}).
			success(function(data, status, headers) {
				var newTaskUri = headers()["location"];
				console.log("Might be good to GET " + newTaskUri + " and append the task.");
				//Refetching EVERYTHING every time can get expensive over time
				//Better solution would be to $http.get(headers()["location"]) and add it to the list
				$('#loaderSpinner').addClass('ng-hide');
				findAllTasks();
			});
		}
	};
		
	//Toggle selection for a given task by task id
	$scope.toggleSelection = function toggleSelection(taskUri) {
		var idx = $scope.selection.indexOf(taskUri);
	    //Is currently selected HTTP PATCH to ACTIVE state
	    if (idx > -1) {
	    	$http.patch(taskUri, { taskStatus: 'ACTIVE' }).
	    	success(function(data) {
	    		console.log("Task unmarked");
	    		findAllTasks();
	    	});
	    	$scope.selection.splice(idx, 1);
	    }

	    //Is newly selected HTTP PATCH to COMPLETED state
	    else {
	    	$http.patch(taskUri, { taskStatus: 'COMPLETED' }).
	    	success(function(data) {
	    		console.log("Task marked completed");
	    		findAllTasks();
	    	});
	    	$scope.selection.push(taskUri);
	    }
	};
	  
	
	//Archive Completed Tasks
	$scope.archiveTasks = function archiveTasks() {
		$scope.selection.forEach(function(taskUri) {
			if (taskUri != undefined) {
				$http.patch(taskUri, { taskArchived: 1});
			}
		});
		console.log("Successfully Archived");
		console.log("It's risky to run this without confirming all the patches are done. when.js is great for that");
		findAllTasks();
	};
});