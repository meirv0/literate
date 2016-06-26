clientModule.controller('CreateCustomer', function ($rootScope, $scope, $http, $timeout, $location) {

    $scope.submitCreateCustomer = function () {

        if ($scope.custName != null && $scope.custPass != null) {
            $http({
                method: 'POST',
                url: localHost + projectPath + '/createCustomer',
                data: {
                    "name": $scope.custName,
                    "pass": $scope.custPass,
                }
            })		

            .then(function successCallback(response) {

                loginResponse = response.data;
                $scope.failure = null;
                if (parseInt(loginResponse) > 0) {
                    localStorage.setItem("customerId", loginResponse);
                    $rootScope.showMenu = true;
                } else {
                    
                    $scope.failure = "User or password are not correct";
                    $timeout(function () { $scope.failure = null }, informationShowTimeInMillisec);
                }
                $location.path("/questionnaire")
            });
        } else {

        }

    }


})