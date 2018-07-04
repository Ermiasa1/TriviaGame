			
var triviaQuestions = [{
    question: " What country is FIFA head quartortered in?",
    answerList: ["Italy", "Germany", "Switzerland", "United Kingdom"],
    answer: 2
            
},{
    question: "What country won world cup in 2014?",
    answerList: ["Brazil", "Germany", "France", "Argentina"],
    answer: 1
    
},{
    question: "Which of the following countries didn't take part in world cup 2018?",
    answerList: ["Morocco", "South koria", "Italy", "urugay"],
    answer: 2
},{
    question: "where is world cup held in 2018?",
    answerList: ["England", "Germany", "Switzerland", "Russia"],
    answer: 3
},{
    question: "wich country won most world cups?",
    answerList: ["Brazil", "Germany", "spain", "Argentina"],
    answer: 0
},{
    question: "wich country desqualified Germany from 2018 worled cup?",
    answerList: ["Brazil", "japan", "France", "Argentina"],
    answer: 1
},{
    question: "How many national teams did participate in 2018 world cup?",
    answerList: ["36", "20", "32", "28"],
    answer: 2
},{
    question: " How many African countries  have taken part in worled cup 2018?",
    answerList: ["6", "4", "5", "3"],
    answer: 2
},{
    question: " Which of the following countries was not qualified for world cup 2018?",
    answerList: ["colombia", "senegal", "France", "USA"],
    answer: 3
},{
    question: " How many groups were in worled cup 2018 hosted in Russia?",
    answerList: ["8", "7", "5", "6"],
    answer: 0
}];




var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;

var messages = {
    correct: "Yes, that's correct!",
    incorrect: "No, that's not correct.",
    endTime: "Out of time!",
    finished: "All done! Here is how well you did."
} 

$('#startBtn').on('click', function(){
    $(this).hide();
    newGame();
});


$('#startOverBtn').on('click', function(){
    $(this).hide();
    newGame();
});

function newGame(){
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}
function newQuestion(){
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#vid').empty();
    answered = true;
    

    $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for(var i = 0; i < 4; i++){
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }

    countdown();
    
    $('.thisChoice').on('click',function(){
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}


function countdown(){
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    
    time = setInterval(showCountdown, 1000);
}
function showCountdown(){
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if(seconds < 1){
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage(){
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); 
    $('.question').empty();


    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    
    
    if((userSelect == rightAnswerIndex) && (answered == true)){
        correctAnswer++;
        $('#message').html(messages.correct);
        $('#vid').html('<img src = "assets/images/gCup.gif" width = "300px" height="200px">');
    } else if((userSelect != rightAnswerIndex) && (answered == true)){
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        $('#vid').html('<img src = "assets/images/lost.gif" width = "300px" height="200px">');
    } else{
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
        $('#vid').html('<img src = "assets/images/notime.gif" width = "300px" height="200px">');
    }
    
    if(currentQuestion == (triviaQuestions.length-1)){
        setTimeout(scoreboard, 4000)
    } else{
        currentQuestion++;
        setTimeout(newQuestion, 4000);
    }	
}

function scoreboard(){
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#vid').empty();


    $('#finalResult').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}