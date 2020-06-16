// function selection(answer, solution) {
//         if(answer == solution){
//             return true;
//         }
//         else{
//             return false;
//         }
// }
document.addEventListener("DOMContentLoaded", function(event) {
var questions = [
    {
        question: 'Test question 1?',
        answers: [
            { text: 'true', result: 1 },
            { text: 'false', result: 0 },
            { text: 'false', result: 0 },
            { text: 'false', result: 0 }
        ]
    },
    {
        question: 'Test question 2?',
        answers: [
            { text: 'false', result: 0 },
            { text: 'true', result: 1 },
            { text: 'false', result: 0 },
            { text: 'false', result: 0 }
        ]
    },
    {
        question: 'Test question 3?',
        answers: [
            { text: 'False', result: 0 },
            { text: 'false', result: 0 },
            { text: 'true', result: 1 },
            { text: 'false', result: 0 }
        ]
    }
];
var QOnClick = document.getElementById('question');
var AOnClick = document.getElementsByClassName('answer');
var shots = document.getElementById('score');
var time = document.getElementById('time');
var question;
var counter = -1;
var correctAnswer;
var noAnswer;
var duration1;
var timerInterval;
var noAnswerInterval

function timer(duration) {
    duration1 = duration;
    timerInterval = setInterval(function () {
        if(duration1 > 0){
        duration1--;
        time.innerHTML =  duration1;
        }
    }, 1000);
}

function nextQuestion() {
    counter++;
    console.log(counter);
    question = questions[counter];
    QOnClick.innerHTML = (counter + 1) + ' - ' + question.question;
    for (var i = 0; i < AOnClick.length; i++) {
        AOnClick[i].innerHTML = question.answers[i].text;
    }
}
function answer(num) {
    let result = questions[counter].answers[num].result;
    console.log(result);
    if (result == 1) {
        shots.innerHTML = '<span class="result">Correct, no shots!</span>';
        correctAnswer = setInterval(function(){ start() }, 5000);
    } else {
        shots.innerHTML = '<span class="result">Incorrect, 1 shot!</span>';
        correctAnswer = setInterval(function(){ start() }, 5000);
    }
}
function noAnswer() {
    shots.innerHTML = '<span class="result">Too late! 2 shots</span>';
    noAnswer = setInterval(function(){ start() }, 5000);
}
function resetValues(){
    clearInterval(timerInterval);
    clearInterval(correctAnswer);
    clearInterval(noAnswer);
    clearInterval(noAnswerInterval);
    question = null;
    correctAnswer = null;
    noAnswer = null;
    duration1 = null;
    timerInterval = null;
    shots.innerHTML = "";
}
function start() {
    resetValues();
    timer(30);
    nextQuestion();
    for (var i=0; i<AOnClick.length; i++) {
        (function (index) {
            AOnClick[i].onclick = function(){
                answer(index);
            }
        })(i);
    }
    noAnswerInterval = setInterval( function() { noAnswer() }, 30000);
}
document.getElementById("start").onclick = function(){start();};
});