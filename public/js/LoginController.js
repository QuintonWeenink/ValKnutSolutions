InsuranceProfiling.controller('loginController', function($scope, $http) {
	$scope.cookie = getCookie()

	$scope.openFromLeft = function(message) {
    	$mdDialog.show(
      		$mdDialog.alert()
        	.clickOutsideToClose(true)
        	.title('Alert')
        	.textContent(message)
        	.ariaLabel(message)
        	.ok('Ok!')
        	// You can specify either sting with query selector
        	.openFrom('#left')
        	// or an element
        	.closeTo(angular.element(document.querySelector('#right')))
    		);
  	};

	$http.get("/api/user?token="+$scope.cookie)
	.then(function(users){
		$scope.openFromLeft('You already have a token')
	});

	$scope.analystLogin
	$scope.analystSignup
	$scope.adminLogin
	$scope.adminSignup

	$scope.postAnalystLogin = function()
	{
		$http({
	    method: 'POST',
	    url: '/api/analyst/authenticate',
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    data:
		'email='+$scope.analystLogin.email+
		'&password='+$scope.analystLogin.password
		}).success(function (res) {
			$scope.message = res.message
			if(res.success){
				setCookie(res.token)
				console.log(res.token)
			}
			//window.location = '/';
		})
	}
	$scope.postAnalystSignup = function()
	{
		$http({
	    method: 'POST',
	    url: '/api/analyst',
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    data:
		'email='+$scope.analystSignup.email+
		'&password='+$scope.analystSignup.password
		}).success(function (res) {
			$scope.message = res.message
			if(res.success){
				setCookie(res.token)
				console.log(res.token)
			}
			//window.location = '/';
		})
	}
	$scope.postAdminLogin = function()
	{
		$http({
	    method: 'POST',
	    url: '/api/admin',
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    data:
		'email='+$scope.adminLogin.email+
		'&password='+$scope.adminLogin.password
		}).success(function (res) {
			$scope.message = res.message
			if(res.success){
				setCookie(res.token)
				console.log(res.token)
			}
			//window.location = '/';
		})
	}
	$scope.postAdminSignup = function()
	{
		$http({
	    method: 'POST',
	    url: '/api/admin/authenticate',
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    data:
		'email='+$scope.adminSignup.email+
		'&password='+$scope.adminSignup.password
		}).success(function (res) {
			$scope.message = res.message
			if(res.success){
				setCookie(res.token)
				console.log(res.token)
			}
			//window.location = '/';
		})
	}
});
