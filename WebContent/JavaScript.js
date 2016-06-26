
var informationShowTimeInMillisec = 1500;
																															

function shuffle(array) {
				
    array = clone(array);
    var currentIndex = array.length, temporaryValue, randomIndex;

   
    while (0 !== currentIndex) {

        
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];				
        array[randomIndex] = temporaryValue;
    }	
    	
    return array;
}
		
function painting(array) {
    var array2 = [];							
    for (index = 0; index < array.length; ++index) {
        array2[index] = '_';
    }	
    return array2;
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

var clientModule = angular.module('client', [])
		
        // page header
		.controller('pageHeader', function ($rootScope) {
		})

		// login
		.controller('loginController', function($rootScope, $scope, $http, $timeout) {
		
		    	
		    $rootScope.temp = paragraph;		    
			$rootScope.loggedIn = true;
			$rootScope.localHost = "http://localhost:8080/";
			$rootScope.projectPath = "literate/rest/service";
			$rootScope.loginResponse = null;
			
			$scope.processForm = function() {
				
				if ($scope.name != null && $scope.pass != null) {
				
					$http({
						method: 'POST',
						url: $rootScope.localHost + $rootScope.projectPath + '/login',
						data: {
									"name" : $scope.name,
									"pass" : $scope.pass,
						}
					})
			
					.then(function successCallback(response) {
							
					    $rootScope.loginResponse = response.data;
						$scope.failure = null;
						if (parseInt($rootScope.loginResponse) > 0) {
						    localStorage.setItem("customerId", $rootScope.loginResponse);
						    $rootScope.loggedIn = false;
						    $rootScope.menu = true;
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
		
        
		.controller('menu', function($rootScope, $scope, $http) {
		
		   
		    $rootScope.pages = {
		        "paragraph": false,
			    "statistics": false,
			    "createCustomer": false,
		        
			    
			};

		    
			$rootScope.closeAllPages = function () {

			    angular.forEach($rootScope.pages, function (value, key) {

			        $rootScope.pages[key] = false;

			    });
			}

		    
			$rootScope.openPage = function (somePage) {
			    angular.forEach($rootScope.pages, function (value, key) {

			        if (angular.equals(key, somePage)) $rootScope.pages[key] = true;
			        else $rootScope.pages[key] = false;

			    });
			};



		    


		})
		
        
		.controller('adminMenu', function($rootScope, $scope, $http) {
		})
		
      
		

		.controller('mainPage', function($rootScope, $scope, $http) {
          
            $scope.createCustomer = function () {

                $rootScope.loggedIn = false;
                $rootScope.create = true;
            }

		})
		
        
		.controller('adminPage', function ($rootScope, $scope, $http, $timeout, $window) {

		    $scope.submitCreateCustomer = function () {
		        
                if ($scope.custName != null && $scope.custPass != null) {
		            $http({
		                method: 'POST',
		                url: $rootScope.localHost + $rootScope.projectPath + '/createCustomer',
		                data: {
		                    "name": $scope.custName,
		                    "pass": $scope.custPass,
		                }
		            })

					.then(function successCallback(response) {

					    $rootScope.loginResponse = response.data;
					    $scope.failure = null;
					    if (parseInt($rootScope.loginResponse) > 0) {
					        localStorage.setItem("customerId", $rootScope.loginResponse);
					        $rootScope.loggedIn = false;
					        $rootScope.menu = true;
					        $rootScope.create = false;
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


		    $window.onload = function () {
		        if (localStorage.getItem("customerId") != null) {
		            $rootScope.loggedIn = false;
		            $rootScope.menu = true;
		        }

		        var i = parseInt(localStorage.getItem("i"));
		        var answer = localStorage.getItem("answer") != null ? localStorage.getItem("answer").split(',') : "";
		        var confusedWord = localStorage.getItem("confusedWord") != null ? localStorage.getItem("confusedWord").split(',') : "";
		        var correctWord = localStorage.getItem("confusedWord") != null ? localStorage.getItem("correctWord").split(',') : "";
		        var locCorrectAnswers = parseInt(localStorage.getItem("correctAnswers"));
		        var number = parseInt(localStorage.getItem("number"));
		        if (answer != null) {
		            $scope.gethint = true;
		            $scope.i = i == null ? 0 : i;
		            $scope.answer = answer;
		            $scope.confusedWord = confusedWord;
		            $scope.correctWord = correctWord;
		            correctAnswers = locCorrectAnswers == null ? 0 : locCorrectAnswers;
		            $rootScope.temp = clone(paragraph);
		            $rootScope.temp[number] = '_____';
		        }

		    }

		    $scope.i = 0;
		    $scope.answer;
		    $scope.confusedWord;
		    $scope.correctWord;
		    var correctAnswers = 0;
		    $scope.number = 0;
		    
		    

		    $scope.selectedWord = function (word, number) {
		        if (word != "_____") {
		            $scope.number = number;
		            word = word.toLowerCase();
		            $scope.correctWord = word.split('');
		            $rootScope.temp = clone(paragraph);
		            $rootScope.temp[number] = '_____';
		            $scope.i = 0;
		            $scope.check = false;
		            $scope.result = false;
		            correctAnswers = 0
		            $scope.gethint = true;
		            localStorage.setItem("correctWord", $scope.correctWord);
		            localStorage.setItem("i", $scope.i);
		            localStorage.setItem("correctAnswers", correctAnswers);
		            localStorage.setItem("number", $scope.number);
		        }
		        
		    };

		    
		    $scope.quiz = function (word, number) {
		        if (word != "_____") {
		            $scope.confusedWord = shuffle($scope.correctWord);

		            $scope.answer = painting($scope.correctWord);

		            localStorage.setItem("confusedWord", $scope.confusedWord);
		            localStorage.setItem("answer", $scope.answer);
		        }
		        
		        
		    }


		    $scope.choice = function (c, number) {
                
		        
		      
		        if ($scope.check == true) {
		            
		            return;
		        }
		        
		        for (index = 0; index < $scope.answer.length; ++index) {
		            if ($scope.answer[index] == "_") {
		                $scope.i = index 
		                break;
		            }
		        }
		      

		        if (c != "_") {
		            $scope.answer[$scope.i] = c;
		            localStorage.setItem("answer", $scope.answer);
		            $scope.i++

		            $scope.confusedWord[number] = "_";
		            localStorage.setItem("confusedWord", $scope.confusedWord);

		            
		            if ($scope.i == $scope.answer.length) {
                       $scope.check = true;
		            }	           
		        } else {
		            $scope.i++
		        }
		        localStorage.setItem("i", $scope.i);

		        for (index = 0; index < $scope.answer.length; ++index) {
		            if ($scope.answer[index] == "_") {
		                return;
		            }
		        }
		        
		        $scope.check = true;
		    }

		    $scope.checkAnswer = function () {
		       
		        if ($scope.result == true) {
                    
		            return;
		        }
		        
		        $scope.score = 0;

		        for (index = 0; index < $scope.answer.length; ++index) {
		            
		            if ($scope.answer[index].toLowerCase() == $scope.correctWord[index].toLowerCase()) {
		                correctAnswers++;
		            }
		        }
                
		        $scope.score = Math.round((correctAnswers / ($scope.correctWord.length)) * 100);
		        
		        $scope.result = true;

		        
		        $http({
		            method: 'POST',
		            url: $rootScope.localHost + $rootScope.projectPath + '/saveQuestion',
		            data: {
		                "customerId": localStorage.getItem("customerId"),
		                "word": localStorage.getItem("correctWord"),
		                "answer": localStorage.getItem("answer"),
		                "date": new Date(),


		            }
		        })
		    }

		    $rootScope.statisticsPage = function () {
		        $rootScope.filterWithWord = null;
		        $http({
		            method: 'GET',
		            url: $rootScope.localHost + $rootScope.projectPath + '/getQuestions',
		            params: { id: localStorage.getItem("customerId") }
		        })
                        
			    .then(function successCallback(response) {

			        $scope.loginResponse = response.data;
			       
			        $rootScope.statistics = $scope.loginResponse['question'];
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

		    $scope.getAClue = function () {
		        
		        if ($scope.check == true) {

		            return;
		        }
		        correctAnswers--;

		        var hintNum;
		        var find = false;
		        
		        for (var i = 0; true; i++){
		            var random = Math.floor((Math.random() * ($scope.correctWord.length)));
		            hintNum = $scope.confusedWord[random];
		            
                    
		            if (hintNum != "_") {
		                break; 
		            }
		        }

		        for (var y = 0; y < $scope.answer.length; y++) {
		                if (hintNum == $scope.correctWord[y]) {
		                    if ($scope.answer[y] == "_") {
		                        find = true;
		                        $scope.confusedWord[random] = "_";
		                        $scope.answer[y] = hintNum.toUpperCase();
		                        localStorage.setItem("answer", $scope.answer);
		                        localStorage.setItem("confusedWord", $scope.confusedWord);
		                        break;
		                    }
		                }
		            }	        
		        if (!find) {
		            alert("No clues")
		            correctAnswers++;
		            localStorage.setItem("correctAnswers", correctAnswers);
                    return
		        }

		        localStorage.setItem("correctAnswers", correctAnswers);

		        for (index = 0; index < $scope.answer.length; ++index) {
		            if ($scope.answer[index] == "_") {
		                return;
		            }
		        }

		        $scope.check = true;
		    }

		    $rootScope.convertToDate = function (timeStamp) {
		        
		        var newNum = timeStamp;
		        return new Date(newNum);
		    }

		    $rootScope.wordFilter = function(word){
		        $rootScope.filterWord= word;
		    }

		    // filter
		    $rootScope.filterWord = function(word) { $rootScope.filterWithWord = word }
		    $rootScope.filterWithWord = null;
		    $rootScope.filterByWord = function (item) {
                
		        if (item.word == $rootScope.filterWithWord || $rootScope.filterWithWord == null) return true;
		        else return false;
		    }
		})
        
	
		
		
		