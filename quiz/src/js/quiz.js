const QUIZLENGTH = 11
// array of objects
const plants = [

    {
        name: "Plant 1",
        info: "Description 1. Describes the plant, some of its characters. Below is a link to the plant or to buy it",
        link: "https://example.com/"
    },

    {
        name: "Plant 2",
        info: "Description 2. Describes the plant, some of its characters. Below is a link to the plant or to buy it",
        link: "https://example.com/"
    }

];

// Bonnieblue would like a dropdown menu for the additional matches for the user
var Quiz = function () {
    var self = this;
    this.init = function () {
        self._bindEvents();
    }

    this._selectAnswer = function ($choice, $question) {
        //Disable all choices
        $question.find(".quiz-choice").removeClass("active");
        $question.find(".quiz-choice").addClass("disabled");

        //Activate selected choice
        $choice.removeClass("disabled");
        $choice.addClass("active");
    }

    //Returns true if each question has a selected response
    this._isComplete = function () {
        let answersChosen = 0;
        $("ul[data-quiz-question]").each(function () {
            if ($(this).find(".quiz-choice.active").length > 0) {
                answersChosen++;
            }
        });
        return (answersChosen >= QUIZLENGTH);
    }

    //Returns array of user responses
    this._tallyResponses = function () {
        let choiceList = new Array();
        $("ul[data-quiz-question]").each(function () {
            choiceList.push($(this).find(".quiz-choice.active").data("choice-value"));
        });
        return choiceList;
    }
    // Answer Key

    this._calcResult = function () {
       /* 
       Whatever plant name: Adding more of the same letter weighs the response more 
       to the total to calculate the top result. 
       The length of the 2D array is equal to the number of questions
        */
       
        // plantsAnswers[0] = Plant 1
        const p1 = new Array(["a","a"], ["a",  "c", "d"], ["a", "c"], ["a"], ["a", "c","d"], ["a", "d"], ["a", "a"], ["a","a","a"], ["a","a","a"], ["a","a","a"], ["a","a","a"]);

        // plantsAnswers[1] = Plant 2
        const p2 = new Array(["b","b"], [ "b", "c", "d"], ["b", "c"], ["b"], ["b", "c","d"], ["b", "d"], ["b", "b"], ["b","b","b"], ["b","b","b"], ["b","b","b"], ["b","b","b"]);



        //add them all into one master array
        //Needs to be added
        const plantsAnswers = new Array(p1, p2);
        
        const userChoices = this._tallyResponses();

        //Create an empty array to populate with 0
        let finalPoints = new Array(plantsAnswers.length).fill(0);
        //end the end of the for loop:
        // shuffle an array and check from the end of the array
        //set j as a random number between the range of the start and the selected end point of the array
        //set x to the value of i, then the value of i to the random selected point of j in the array's value
        //then set j to x, which is the value of i 
        function shuffle(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        }
        //this function creates a randomized list of responses with the the most amount of points that are equal
        function shuffledMatchList(a) {
            var i = 0,
                maxList = new Array(),
                max = 0;

            for (i = 0; i < a.length; i++) {
                if (a[i] > max) {
                    max = a[i];
                }
            }

            for (i = 0; i < a.length; i++) {
                if (a[i] == max) {
                    maxList.push(i);
                }
            }

            return shuffle(maxList);
        }

                // will return results with anything except b, so only 

        // this function checks if the user's choice == to value of an plants's answer
        // and adds the amount of points for that question to its total
        function addPoints(answer, j) {

            for (var i = 0; i < plantsAnswers.length; i++) {
                
               finalPoints[i] +=plantsAnswers[i][j].filter(c => c === answer).length;

                }     
                
            }
        
            userChoices.forEach(addPoints)
            
            console.log(finalPoints);

        shuffledMatchList(finalPoints);
        /*
        plantsAnswers.forEach((a,i)=>{
            if (!a[3].includes(userChoices[3])){
                finalPoints[i] =-1;
            }
            console.log(finalPoints)
        });
        */
        return shuffledMatchList(finalPoints);
    }
    

    this._showResult = function () {
        let $resultBox = $(".result");
       


        
        let resultList = self._calcResult();
                // array of objects lists all the organization's that were selected
        let results = new Array();
        results.push(plants[resultList[0]]);


        $resultBox.addClass("resultComplete jumbotron");
        $resultBox.html("<h1 class='mb-4'><p>Here is your result!</p> <p>You matched with <i>" + plants[resultList[0]].name + '</i></p> </h1> <p>' + plants[resultList[0]].info + '</p><p class="text-center"><a style="background-color: #AC631E;"class="my-3 mx-auto btn text-white btn-lg" href="' + plants[resultList[0]].link + '"target="_blank"><strong>Learn more</strong></a></p>');

        const resultToString = () => {
            var plant = '';
            for (let i = 1; i < resultList.length; i++) {
                plant += '<li><a class="collapsed" href="#collapseInfo-' + i + '"data-toggle="collapse" role="button" aria-expanded="false" id="info-' + i + '"><h4><strong><u>' + plants[resultList[i]].name + '</u></strong></h4></a></li><p class="collapse text-center" id="collapseInfo-' + i + '">' + plants[resultList[i]].info + '<br><a style="background-color: #AC631E;"class="my-3 mx-auto btn text-white btn-lg" href="' + plants[resultList[i]].link + '" target="_blank"><strong>Learn more</strong></a></p>';

                //add objects to results array
                results.push(plants[resultList[i]]);
            }
            return plant;
        }
        // Create an object that has two keys: mail, array of objects
        //results.join(',');       

        if (resultList.length > 1) {
            $resultBox.append('<hr class="my-4"><h2><strong> You also matched with:</strong></h2> <ul id="accordion">' + resultToString() + '</ul><br>');
        }
        
   
        //Animated scroll
        $("body, html").animate({
            scrollTop: (($resultBox).offset().top - 25) //25px for visual padding
        }, 500);
    }

    this._bindEvents = function () {
        let jumboList = new Array();
        $(".jumbotron").each(function () {
            jumboList.push($(this));
        });
        // console.log(jumboList)
        $(".quiz-choice").on("click", function () {
            // console.log(self._isComplete());
            let $choice = $(this);
            let $question = $choice.closest("ul[data-quiz-question]");
            self._selectAnswer($choice, $question);
            if (self._isComplete()) {
                self._showResult();
                //console.log(self._showResult())
                return;
            }
            //Animated scroll to next Jumbotron element
            $("body, html").animate({
                scrollTop: (jumboList[parseInt($question.data("quiz-question"))]).offset().top - 25
            }, 500);
        });
    }
}

var quiz = new Quiz();
quiz.init();