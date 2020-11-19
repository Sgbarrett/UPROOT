const QUIZLENGTH = 12;
// array of objects
const plants = [
    {
        name: "Chinese Evergreen",
        info: "Aglaonema spp., aroids .",
        link: "https://example.com/"
    },
    {
        name: "Alocasia Polly",
        info: "Alocasia 'Polly',  aroids.",
        link: "https://example.com/"
    },
    {
        name: "Elephant Ears",
        info: "Alocasia spp.,  aroids.",
        link: "https://example.com/"
    },
    {
        name: "Aloe vera",
        info: "Aloe vera, Succulents.",
        link: "https://example.com/"
    },
    {
        name: "Flamingo Flower",
        info: "Anthurium spp.,  aroids.",
        link: "https://example.com/"
    },
    {
        name: "Cast Iron Plant",
        info: "Aspidistra elatior",
        link: "https://example.com/"
    },
    {
        name: "Ponytail Palm",
        info: "Beaucarnea recurvata",
        link: "https://example.com/"
    },
    {
        name: "Rex Begonia",
        info: "Begonia spp.",
        link: "https://example.com/"
    },
    {
        name: "Peacock Plant",
        info: "Calathea makoyana, prayer plants",
        link: "https://example.com/"
    },
    {
        name: "Calathea Medallion",
        info: "Calathea roseopicta 'Medallion',  prayer plants",
        link: "https://example.com/"
    },
    {
        name: "Parlor Palm",
        info: "Chamaedorea elegans, palms.",
        link: "https://example.com/"
    },
    {
        name: "Jade Plant",
        info: "Crassula ovata, succulents.",
        link: "https://example.com/"
    },
    {
        name: "Sago Palm",
        info: "Cycas revoluta, cycads.",
        link: "https://example.com/"
    },
    {
        name: "Dumb Cane",
        info: "Dieffenbachia spp., aroids.",
        link: "https://example.com/"
    },
    {
        name: "Corn Plant", 
        info: "Dracaena fragrans",
        link: "https://example.com/"
    },
    {
        name: "Dracaena Marginata",
        info: "Dracaena reflexa var. angustifolia",
        link: "https://example.com/"
    },
    {
        name: "Snake Plant",
        info: "Dracaena trifasciata, succulents",
        link: "https://example.com/"
    }, 
    {
        name: "Echeveria",
        info: "Echeveria spp., succulents",
        link: "https://example.com/"
    },
    {
        name: "Golden Barrel Cactus",
        info: "Echinocactus grusonii, cacti",
        link: "https://example.com/"
    },
    {
        name: "Pothos",
        info: "Epipremnum aureum, aroids",
        link: "https://example.com/"
    },
    {
        name: "Indian Rubber Tree",
        info: "Ficus elastica",
        link: "https://example.com/"
    },
    {
        name: "Fiddle Leaf Fig",
        info: "Ficus lyrata",
        link: "https://example.com/"
    },
    {
        name: "Nerve Plant",
        info: "Fittonia spp.",
        link: "https://example.com/"
    },
    {
        name: "Ox Tongue",
        info: "Gasteria bicolor, succulents",
        link: "https://example.com/"
    },
    {
        name: "Haworthia",
        info: "Haworthia fasciata, succulents",
        link: "https://example.com/"
    },
    {
        name: "Prayer Plant",
        info: "Maranta leuconeura, prayer plants",
        link: "https://example.com/"
    },
    {
        name: "Monstera ",
        info: "Monstera deliciosa, aroids",
        link: "https://example.com/"
    },
    {
        name: "Bunny Ear Cactus",
        info: "Opuntia microdasys, cacti",
        link: "https://example.com/"
    },
    {
        name: "Radiator Plant",
        info: "Peperomia spp.",
        link: "https://example.com/"
    },
    {
        name: "Moth Orchid",
        info: "Phalaenopsis spp., orchids",
        link: "https://example.com/"
    },
    {
        name: "Heart-leaf Philodendron",
        info: "Philodendron hederaceum, aroids",
        link: "https://example.com/"
    },
    {
        name: "Majesty Palm",
        info: "Ravenea rivularis, palms",
        link: "https://example.com/"
    },
    {
        name: "Burro\'s Tail",
        info: "Sedum morganianum, succulents",
        link: "https://example.com/"
    },
    {
        name: "Peace Lily",
        info: "Spathiphylum spp., aroids",
        link: "https://example.com/"
    },
    {
        name: "Arrowhead Vine",
        info: "Syngonium podophyllum, aroids",
        link: "https://example.com/"
    },
    {
        name: "ZZ Plant",
        info: "Zamioculcas zamiifolia, aroids",
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
       
        // plantsAnswers[0] = Chinese Evergreen
        const ce = new Array(["b", "c"],["b","b","b"], ["b"], ["b"], ["c","d"], ["b"], ["a","a", "b"],[""],["a","b","c","d"],["a","b","c","d"], ["a", "a", "a", "a", "b", "b", "c"],["a"]);
        // plantsAnswers[1] = Alocasia Polly
        const ap = new Array(["b", "c"], ["a","a","a"], ["a","a"], ["b"], ["c","d"], ["b"], ["a","a", "b"], [""], ["a","b","c","d"],["a","b","c","d"], ["a", "a", "a", "a", "b", "b", "c"],["a"]);
        // plantsAnswers[2] = Elephant Ears
        const ee = new Array(["a","b"], ["a","a","a"], ["a","a"], ["b"], ["c","d"], ["b"], ["a","a", "b"], [""], ["a","b","c","d"],["a","b","c","d"], ["a", "a", "a", "a", "b", "b", "c"],["a"]);
        // plantsAnswers[3] = Aloe vera
        const av = new Array(["b", "c", "d"], ["b","b","b"], ["b"], ["b"], ["a","b","c","d"], ["b","c"], ["a","a", "b"], [""], ["b","d"], ["a","d"], ["a","a","b","b","b","b","c","c","c","c"], ["a","b","c"] );
        // plantsAnswers[4] = Flamingo Flower
        const ff = new Array(["b","c"], ["b","b","b"], ["b"], ["b"], ["c","d"], ["b"], ["a","a", "b"], [""], ["a","b","c","d"],["a","b","c","d"],  ["a", "a", "a", "a", "b", "b", "c"],["a"]);
        // plantsAnswers[5] =  Cast Iron Plant
        const cip = new Array(["a","b"], ["b","b","b"], ["b"], ["a","a"], ["a","b","c","d"], ["c"], ["b","c","c"], [""],["a","b","c","d"], ["a","b","c","d"],  ["a","a","b","b","b","b","c","c","c"],  ["a","b","c"]);
        // plantsAnswers[6] = Ponytail Palm
        const pyp = new Array(["b","c"], ["a","a","a"], ["b"], ["a","a"], ["a","b","c","d"], ["c"], ["a","b"], [""], ["a","b","c","d"], ["a","b","c","d"],  ["a","a","b","b","b","b","c","c","c"],  ["a","b","c"]);
        // plantsAnswers[7] = Rex Begonia
        const rb = new Array(["b", "c", "d"],["b","b","b"], ["b"], ["b"], ["c","d"], ["b"], ["a","a", "b"],[""],["a","b","c","d"],["a","b","c","d"], ["a", "a", "a", "a", "b", "b", "c"],["a", "b"]);
        // plantsAnswers[8] = Peacock Plant
        const pcp = new Array(["b", "c"], ["a","a","a"], ["b"], ["a","a"], ["c","d"], ["b"], ["b","c","c"], [""], ["a","b","c","d"],["a","b","c","d"], ["a", "a", "a", "a", "b", "b", "c"],["a", "b"]);
        // plantsAnswers[9] = Calathea Medallion
        const cm = new Array(["b", "c"], ["a","a","a"], ["b"], ["a","a"], ["c","d"], ["b"], ["b","c","c"], [""], ["a","b","c","d"],["a","b","c","d"], ["a", "a", "a", "a", "b", "b", "c"],["a", "b"]);
        // plantsAnswers[10] = Parlor Palm
        const pp= new Array(["b", "c"], ["a","a","a"], ["b"], ["a","a"], ["a","b","c","d"], ["b","c","c"],[""], ["a","b"], ["a","b","c","d"], ["a","b","c","d"],  ["a","a","b","b","b","b","c","c","c"], ["a","b"]);
        // plantsAnswers[11] = Jade Plant 
        const jp = new Array(["a","b"], ["b","b","b"], ["b"], ["b"], ["a","b","c","d"], ["b","c"], ["a","a", "b"], [""], ["b","d"], ["a","d"], ["a","a","b","b","b","b","c","c","c","c"], ["a","b","c"] );
        // plantsAnswers[12] = Sago Palm
        const sp = new Array(["b","c"], ["b","b","b"], ["b"], ["b"], ["a","b","c","d"], ["b","c"], ["a","a", "b"], [""], ["b","d"], ["a","d"], ["a","a","b","b","b","b","c","c","c","c"], ["a","b"] );
        // plantsAnswers[13] = Dumb Cane
        const dc = new Array(["a","a"], ["a","a","a"], ["a","a"], ["b"], ["c","d"], ["b"], ["a","a", "b"], [""], ["b","d"], ["a","d"], ["a","a","b","b","b","b","c","c","c","c"], ["a","a"] );
        // plantsAnswers[14] = Corn Plant
        const cp = new Array(["a","a"], ["a","a","a"], ["b"], ["b"], ["a","b","c","d"], ["c"], ["b","c","c"], [""], ["a","b","c","d"], ["a","b","c","d"],  ["a","a","b","b","b","b","c","c","c"],  ["a","b"]);
        // plantsAnswers[15] = Dracaena Marginata
        const dm = new Array(["a","a"], ["a","a","a"], ["b"], ["b"], ["a","b","c","d"], ["c"], ["b","c","c"], [""], ["a","b","c","d"], ["a","b","c","d"],  ["a","a","b","b","b","b","c","c","c"],  ["a","b"]);
        // plantsAnswers[16] = Snake Plant
        const snk = new Array(["a","b"], ["a","a","a"], ["a","a"], ["b"], ["a","b","c","d"], ["c"], ["a","a", "b"], [""], ["a","b","c","d"], ["a","b","c","d"],  ["a","a","b","b","b","b","c","c","c"],  ["a","b","c"]);
        // plantsAnswers[17] = Echeveria
        const ech = new Array(["b","c","d"], ["e","e","e"], ["a","a"], ["a","a"], ["a","b","c","d"], ["b","c"], ["a","a", "b"], [""], ["b","d"], ["a","d"], ["a","a","b","b","b","b","c","c","c","c"], ["a","b","c"] );
        // plantsAnswers[18] = Golden Barrel Cacti
        const gbc = new Array(["b","c","d"], ["b","b","b"], ["b"], ["b"], ["a","b","c","d"], ["b","c"], ["a","a", "b"], [""], ["b","d"], ["a","d"], ["a","a","b","b","b","b","c","c","c","c"], ["a","b","c"] );
        // plantsAnswers[19] = Golden Barrel Cacti
        const pot = new Array(["b","c"], ["d","d","d"], ["b"], ["b"], ["b"], ["b","c"], ["a","a","b"], [""], ["a","b","c","d"], ["a","b","c","d"],  ["a","a","b","b","b","b","c","c","c"],  ["a","b","c"]);
        // plantsAnswers[20] = Indian Rubber Tree
        const irt = new Array(["a","a"], ["a","a","a"], ["a","a"], ["b"], ["c","d"], ["b"], ["a","a", "b"], [""], ["b","d"], ["a","d"], ["a","a","b","b","b","b","c","c","c","c"], ["a","b"] );
        // plantsAnswers[21] = Fiddle Leaf Fig
        const fff = new Array(["a","a"], ["a","a","a"], ["a","a"], ["b"], ["c","d"], ["b"], ["a","a", "b"], [""], ["b","d"], ["a","d"], ["a","a","b","b","b","b","c","c","c","c"], ["a","b"] );
        // plantsAnswers[22] = Nerve Plant
        const np = new Array(["b","c","d"], ["b","b","e","e"], ["b"], ["a","a"], ["a","b","c","d"], ["a"], ["a","b"], [""], ["a","b","c","d"], ["a","b","c","d"],  ["a","a","b","b","b","b","c","c","c"],  ["a","b","c"]);
        // plantsAnswers[23] = Ox Tongue
        const ox = new Array(["b","c","d"], ["a","a","a"], ["a","a"], ["a","a"], ["a","b","c","d"], ["b","c"], ["a","a", "b"], [""], ["b","d"], ["a","d"], ["a","a","b","b","b","b","c","c","c","c"], ["a","b","c"] );
        // plantsAnswers[24] = Haworthia
        const haw = new Array(["b","c","d"], ["b","b","b"], ["a","a"], ["a","a"], ["a","b","c","d"], ["b","c"], ["a","a", "b"], [""], ["b","d"], ["a","d"], ["a","a","b","b","b","b","c","c","c","c"], ["a","b"] );
        // plantsAnswers[25] = Prayer Plant
        const pray = new Array(["b", "c"], ["d","d","c","c"], ["a","a"], ["b"], ["c","d"], ["b"], ["b","c","c"], [""], ["a","b","c","d"],["a","b","c","d"], ["a", "a", "a", "a", "b", "b", "c"],["a"]);
        // plantsAnswers[26] = Monstera
        const mon = new Array(["a","a"], ["d","d","d"], ["a","a"], ["b"], ["c","d"], ["b"], ["b","c", "c"], [""], ["a","b","c","d"],["a","b","c","d"], ["a", "a", "a", "a", "b", "b", "c"],["a"]);
        // plantsAnswers[27] = Monstera
        const bec = new Array(["b","c"], ["b","b","b"], ["b"], ["b"], ["a","b","c","d"], ["b","c"], ["a","a", "b"], [""], ["b","d"], ["a","d"], ["a","a","b","b","b","b","c","c","c","c"], ["a","b","c"] );
        // plantsAnswers[28] =  Radiator Plant
        const rp = new Array(["b","c","d"], ["b","b"], ["b"], ["a","a"], ["a","b","c","d"], ["b"], ["a","b"], [""], ["a","b","c","d"], ["a","b","c","d"],  ["a","a","b","b","b","b","c","c","c"],  ["a","b"]);
        // plantsAnswers[29] = Golden Barrel Cacti
        const mo = new Array(["b","c"], ["a","a","a"], ["b"], ["a","a"], ["b"], ["b"], ["a","a","b"], [""], ["a","b","c","d"], ["a","b","c","d"],  ["a","a","b","b","b","b","c","c","c"],  ["a"]);
        // plantsAnswers[30] = Heart-leaf Philodendron
        const hlp = new Array(["b","c"], ["d","d","d"], ["b"], ["b"], [" c","d"], ["b","c"], ["b","c","c"], [""], ["a","b","c","d"], ["a","b","c","d"],  ["a","a","b","b","b","b","c","c","c"],  ["a","b"]);
        // plantsAnswers[31] = Majesty Palm
        const mp = new Array(["a","a"], ["a","a","a"], ["b"], ["a","a"], ["c","d"], ["b"], ["b","c","c"], [""], ["b","d"], ["a","d"], ["a","a","b","b","b","b","c","c","c","c"], ["a","b"] );
        // plantsAnswers[32] = Burro's Tail
        const bt = new Array(["b","c"], ["c","c","c"], ["b"], ["a","a"],  ["a","b","c","d"], ["b","c","c"], ["a","a", "b"], [""], ["b","d"], ["a","d"], ["a","a","b","b","b","b","c","c","c","c"], ["a","b"] );
        // plantsAnswers[33] = Peace Lily
        const pl = new Array(["a","b"], ["b","b", "b"], ["b"], ["a","a"], ["c","d"], ["a"], ["a", "a", "b"], [""], ["a","b","c","d"], ["a","b","c","d"],  ["a","a","b","b","b","b","c","c","c"],  ["a","b","c"]);
        // plantsAnswers[34] = Arrowhead Vine
        const awv = new Array(["b","c"], ["b","c","d"], ["b"], ["b"], ["c","d"], ["b"], ["a","a", "b"], [""], ["a","b","c","d"],["a","b","c","d"],  ["a", "a", "a", "a", "b", "b", "c"],["a", "b"]);
        // plantsAnswers[35] = ZZ Plant
        const zz = new Array(["a","b"], ["b","b","b"], ["b"], ["b"], ["a","b","c","d"], ["c"], ["a","a", "b"], [""], ["a","b","c","d"], ["a","b","c","d"],  ["a","a","b","b","b","b","c","c","c"],  ["a","b"]);

        

        //add them all into one master array
        //Needs to be added
        const plantsAnswers = new Array(ce, ap, ee, av,ff,cip,pyp,rb,pcp,cm,pp, jp, sp, dc,cp, dm, snk, ech, gbc, pot, irt,fff,np, ox, haw, pray, mon, bec, rp, mo, hlp, mp, bt, pl, awv, zz);
        
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
        $resultBox.html("<h1 class='mb-4'><p>Here is your result!</p> <p>You matched with <i>" + plants[resultList[0]].name + '</i></p> </h1> <p class="text-center">' + plants[resultList[0]].info + '</p><p class="text-center"><a style="background-color: #DD8F43;"class="my-3 mx-auto btn text-white btn-lg" href="' + plants[resultList[0]].link + '"target="_blank"><strong>Learn more</strong></a></p>');

        const resultToString = () => {
            var plant = '';
            for (let i = 1; i < resultList.length; i++) {
                plant += '<li><a class="collapsed" href="#collapseInfo-' + i + '"data-toggle="collapse" role="button" aria-expanded="false" id="info-' + i + '"><h4><strong><u>' + plants[resultList[i]].name + '</u></strong></h4></a></li><p class="collapse text-center" id="collapseInfo-' + i + '">' + plants[resultList[i]].info + '<br><a style="background-color: #DD8F43;"class="my-3 mx-auto btn text-white btn-lg" href="' + plants[resultList[i]].link + '" target="_blank"><strong>Learn more</strong></a></p>';

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