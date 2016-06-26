clientModule.controller('statistics', function ($rootScope, $scope, $http, $timeout) {
			
    $rootScope.statisticsPage = function () {


        $rootScope.filterWithWord = null;
        $http({
            method: 'GET',
            url: localHost + projectPath + '/getQuestions',
            params: { id: localStorage.getItem("customerId") }
        })

        .then(function successCallback(response) {

            loginResponse = response.data;

            $rootScope.statistics = loginResponse['question'];
            var counter = 0;

            for (var i = 0; i < $rootScope.statistics.length; i++) {
                for (var j = 0; j < $rootScope.statistics[i]['answer'].length; j++) {
                    var answer = $rootScope.statistics[i]['answer'][j];
                    var word = $rootScope.statistics[i]['word'][j];
                    if (answer == answer.toLowerCase() && answer == word) {
                        counter++;
                    }
                }
                $rootScope.statistics[i]['grade'] = Math.round((counter / ($rootScope.statistics[i]['word'].length)) * 100);
                counter = 0;
            }
        });
    }
})