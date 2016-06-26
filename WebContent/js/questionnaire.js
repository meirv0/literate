clientModule.controller('questionnaire', function ($rootScope, $scope, $http, $location) {
          
		   
    		
                


    $scope.load = function () {
        $scope.gethint = false;
        $rootScope.showMenu = true;
        var i = parseInt(localStorage.getItem("i"));
        var answer = localStorage.getItem("answer") != null ? localStorage.getItem("answer").split(',') : null;
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
            url: localHost + projectPath + '/saveQuestion',
            data: {
                "customerId": localStorage.getItem("customerId"),
                "word": localStorage.getItem("correctWord"),
                "answer": localStorage.getItem("answer"),
                "date": new Date(),


            }
        })
    }

            

    $scope.getAClue = function () {

        if ($scope.check == true) {

            return;
        }
        correctAnswers--;

        var hintNum;
        var find = false;

        for (var i = 0; true; i++) {
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

    

    $rootScope.wordFilter = function (word) {
        $rootScope.filterWord = word;
    }

    // filter
    $rootScope.filterWord = function (word) { $rootScope.filterWithWord = word }
    $rootScope.filterWithWord = null;
    $rootScope.filterByWord = function (item) {

        if (item.word == $rootScope.filterWithWord || $rootScope.filterWithWord == null) return true;
        else return false;
    }

})