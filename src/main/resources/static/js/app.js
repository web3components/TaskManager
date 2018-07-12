
angular

.module('taskManagerApp', ['ngAnimate','ngRoute','angularSpinner'])

.config(function ($routeProvider, $httpProvider) {
    $routeProvider
    .when('/', {
        redirectTo: '/login'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/task', {
        templateUrl: 'views/task.html',
        controller: 'TaskManagerController'
    })
    .otherwise({
        redirectTo: '/'
    })
})

.run(function ($rootScope, $location) {
	//$rootScope.sessionId = ContextService.getSessionId();
	$rootScope.sessionId = "1";

	$rootScope.$on('$locationChangeStart', function (event, next, current) {
		//$rootScope.loggedInUser = ContextService.getLoggedInUser();
		$rootScope.loggedInUser = "Vaibhav";
		console.log('URL change requested...')
		console.log($location.path())
		console.log($rootScope.context)

		if ($location.path() !== '/login' && !$rootScope.loggedInUser && $location.path() !== '/forgetpassword') {
			console.log('Route to login');
			$location.path('/login');
			return;
		}

		/* if (ContextService.isOnline() == false && $location.path() == '/queue/list') {
              console.log('Offline login...Routing to schedule next page...');
              $location.path('/trip/list');
              return;
		}*/
		$('#loaderSpinner').addClass('ng-hide');
		console.log('no go to loop');
	});
})

.directive('ngConfirmClick', [
	function(){
         return {
             link: function (scope, element, attr) {
                 var msg = attr.ngConfirmClick || "Are you sure?";
                 var clickAction = attr.confirmedClick;
                 element.bind('click',function (event) {
                     if ( window.confirm(msg) ) {
                         scope.$eval(clickAction);
                     }
                 });
             }
         };
 }]);