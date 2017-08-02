angular.module('MainCtrl', ['AuthService'])

.controller('MainCtrl',function(Auth, $timeout, $location, $rootScope) {
	var app = this;
	app.loadme = false;

	$rootScope.$on('$routeChangeStart', function() {
		if(Auth.isLoggedIn()){
			app.isLoggedIn = true;
			Auth.getUser().then(function(data) {
				app.username = data.data.username;
				app.useremail = data.data.email;
				app.loadme = true;
			});
		} else {
			app.isLoggedIn = false;
			app.username = '';
			app.loadme = true;
		}		
		if($location.hash() == '_=_') $location.hash(null);
	});

	this.doLogin = function(loginData) {
		app.loading = true;
		app.errorMsg = false;

		Auth.login(app.loginData).then(function(data) {
			if(data.data.success) {				
				app.loading = false;
				// Create success message				
				app.successMsg = data.data.message + "...Redirecting to the homepage";
				// Redirect to home page
				$timeout(function() { 
					$location.path('/'); 
					app.loginData = '';
					app.successMsg = false;
				}, 2000);
			} else {
				// create error message
				app.loading = false;
				app.errorMsg = data.data.message;
			}
		});
	};

	this.logout = function() {
		Auth.logout();
		$location.path('/logout');
		$timeout(function() { $location.path('/'); }, 2000);
	};
});