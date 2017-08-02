angular.module('UserCtrl', ['UserService'])

.controller('regCtrl', function($http, $location, $timeout, User) {

	var app = this;

	this.regUser = function(regData) {
		app.loading = true;
		app.errorMsg = false;
		// console.log("form submitted");
		// console.log(regData);
		User.create(app.regData).then(function(data) {
			if(data.data.success) {
				//create success message
				app.loading = false;
				//redirect to home page
				app.successMsg = data.data.message + "...redirecting to the homepage";
				$timeout(function() { $location.path('/'); }, 2000);
			} else {
				// create error message
				app.loading = false;
				app.errorMsg = data.data.message;
			}
		});
	};
});
