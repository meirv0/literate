
var informationShowTimeInMillisec = 1500;
var localHost = "http://localhost:8080/";
var projectPath = "literate/rest/service";
var loginResponse = null;
									    																						

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

var clientModule = angular.module('client', ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "html/login.html",
                controller: 'loginController'
            })
            .when("/create", {
                templateUrl: "html/createAccount.html",
                controller: 'CreateCustomer'
            })
            .when("/questionnaire", {
                templateUrl: "html/questionnaire.html",
                controller: 'questionnaire'
            })
            .when("/statistics", {
                templateUrl: "html/statistics.html",
                controller: 'statistics'
            })
            .otherwise({
                redirectTo: "/login"
            })
                        
           
            
    });
		

