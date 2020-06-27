document.addEventListener("DOMContentLoaded", function (event) {
    var questions = [
        {
            question: '1 - Test question 1?',
            answers: [
                { text: 'true', result: 1 },
                { text: 'false', result: 0 },
                { text: 'false', result: 0 },
                { text: 'false', result: 0 }
            ]
        },
        {
            question: '2 - Test question 2?',
            answers: [
                { text: 'false', result: 0 },
                { text: 'true', result: 1 },
                { text: 'false', result: 0 },
                { text: 'false', result: 0 }
            ]
        },
        {
            question: '3 - Test question 3?',
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
    var _noanswer;
    var duration1;
    var timerInterval;
    var noAnswerInterval

    function timer(duration) {
        duration1 = duration;
        time.innerHTML = 'Time left: ' + duration1;
        timerInterval = setInterval(function () {
            if (duration1 > 0) {
                duration1--;
                time.innerHTML = 'Time left: ' + duration1;
            }
        }, 1000);
        return;
    }

    function nextQuestion() {
        if (questions.length > (counter + 1)) {
            console.log("questions length = " + questions.length);
            counter++;
            console.log("counter = " + counter);
            question = questions[counter];
            QOnClick.innerHTML = question.question;
            for (var i = 0; i < AOnClick.length; i++) {
                AOnClick[i].innerHTML = question.answers[i].text;
            }
        }
        else {
            resetValues();
            $('#time').hide();
            $('#start').hide();
            $('#question').hide();
            $('.answer').hide();
            $('#game').addClass('result');
            shots.innerHTML = 'End of game, come again!';
        }
    }
    function answer(num) {
        let result = questions[counter].answers[num].result;
        console.log("Result = " + result);
        if (result == 1) {
            resetValues();
            $('#question').hide();
            $('.answer').hide();
            $('#game').addClass('result');
            shots.innerHTML = 'Correct, no shots!';
            timer(5);
            correctAnswer = setInterval(function () { start() }, 5000);
        } else {
            resetValues();
            $('#question').hide();
            $('.answer').hide();
            $('#game').addClass('result');
            shots.innerHTML = 'Incorrect, 1 shot!';
            timer(5);
            correctAnswer = setInterval(function () { start() }, 5000);
        }
    }
    function noAnswer() {
        resetValues();
        $('#question').hide();
        $('.answer').hide();
        $('#game').addClass('result');
        shots.innerHTML = 'Too late! 2 shots';
        timer(5);
        _noanswer = setInterval(function () { start() }, 5000);
    }
    function resetValues() {
        clearInterval(timerInterval);
        clearInterval(correctAnswer);
        clearInterval(_noanswer);
        clearInterval(noAnswerInterval);
        question = null;
        correctAnswer = null;
        _noanswer = null;
        duration1 = null;
        timerInterval = null;
        shots.innerHTML = "";
        $('#question').show();
        $('.answer').show();
        $('#game').removeClass('result');
    }
    function start() {
        $('#reset').show();
        $('#time').show();
        resetValues();
        timer(30);
        nextQuestion();
        for (var i = 0; i < AOnClick.length; i++) {
            (function (index) {
                AOnClick[i].onclick = function () {
                    answer(index);
                }
            })(i);
        }
        noAnswerInterval = setInterval(function () { noAnswer() }, 30000);
    }
    function reset() {
        document.location.href = "";
    }
    
    $('#reset').hide();
    $('#question').hide();
    $('.answer').hide();
    $('#time').hide();

    $('#start').click(function() {
        $('#start').hide();
        $('.info').hide();
        start();
    });

    $('#reset').click(function() {
        reset(); 
    });
}); 