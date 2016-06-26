clientModule.controller('loginController', function ($rootScope, $scope, $http, $timeout, $location) {
		
		    	
    $rootScope.temp = paragraph;		    
    $rootScope.loggedIn = true;
			
    $scope.lod = function () {
        if (localStorage.getItem("customerId") != null) {
            $location.path("/questionnaire")
        }
    }
			
				
    $scope.processForm = function() {
				
        if ($scope.name != null && $scope.pass != null) {
				
            $http({
                method: 'POST',
                url: localHost + projectPath + '/login',
                data: {
                    "name" : $scope.name,
                    "pass" : $scope.pass,
                }
            })	
			
            .then(function successCallback(response) {
							
                loginResponse = response.data;
                $scope.failure = null;
                if (parseInt(loginResponse) > 0) {
                    localStorage.setItem("customerId", loginResponse);
                    
                    $rootScope.showMenu = true;
                    $location.path("/questionnaire")
                } else {
                    // popup div with error
                    $scope.failure = "User or password are not correct";
                    $timeout(function () { $scope.failure = null }, informationShowTimeInMillisec);
                }
							
            });
        } else {
            $scope.failure = "Fill in the form";
            $timeout(function () { $scope.failure = null }, informationShowTimeInMillisec);
        }
    }

			
})
		