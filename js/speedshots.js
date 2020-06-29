document.addEventListener("DOMContentLoaded", function (event) {
    var questions = [
        {
            question: 'Which of the following is not a whiskey?',
            answers: [
                { text: 'Grey Goose', result: 1 },
                { text: 'Jack Daniels', result: 0 },
                { text: 'Famous Grouse', result: 0 },
                { text: 'Jameson', result: 0 }
            ]
        },
        {
            question: 'How many stars are in the flag of the USA?',
            answers: [
                { text: '48', result: 0 },
                { text: '50', result: 1 },
                { text: '51', result: 0 },
                { text: '53', result: 0 }
            ]
        },
        {
            question: 'Which of the following is not a spice girl?',
            answers: [
                { text: 'Scary Spice', result: 0 },
                { text: 'Red Spice', result: 1 },
                { text: 'Baby Spice', result: 0 },
                { text: 'Ginger Spice', result: 0 }
            ]
        },
        {
            question: 'Who has never been a President of the USA?',
            answers: [
                { text: 'Thomas Jefferson', result: 0 },
                { text: 'Karel Gott', result: 1 },
                { text: 'Bill Clinton', result: 0 },
                { text: 'John F. Kennedy', result: 0 }
            ]
        },
        {
            question: 'Which boyband sang the song "Everybody"?',
            answers: [
                { text: 'Westlife', result: 0 },
                { text: 'NSYNC', result: 0 },
                { text: 'Backstreet Boys', result: 1 },
                { text: 'Take that', result: 0 }
            ]
        },
        {
            question: 'Who sing the song "Dancing Queen?"',
            answers: [
                { text: 'Abba', result: 1 },
                { text: 'Prodigy', result: 0 },
                { text: 'Britney Spears', result: 0 },
                { text: 'DJ Tiesto', result: 0 }
            ]
        },
        {
            question: 'Which of the following is not a programming language?',
            answers: [
                { text: 'Beer', result: 1 },
                { text: 'Python', result: 0 },
                { text: 'Javascript', result: 0 },
                { text: 'C#', result: 0 }
            ]
        },
        {
            question: 'What is the best programming school in Amsterdam?',
            answers: [
                { text: 'Harvard', result: 0 },
                { text: 'Stanford', result: 0 },
                { text: 'Code Institute', result: 1 },
                { text: 'Ubiqum', result: 0 }
            ]
        },
        {
            question: 'How many legs does a spider have?',
            answers: [
                { text: '6', result: 0 },
                { text: '7', result: 0 },
                { text: '8', result: 1 },
                { text: '9', result: 0 }
            ]
        },
        {
            question: 'What is the name of the most famous footballer in Englands wife?',
            answers: [
                { text: 'Natalia', result: 0 },
                { text: 'Victoria', result: 1 },
                { text: 'Jennifer', result: 0 },
                { text: 'Pieter', result: 0 }
            ]
        },
                {
            question: 'Who started Microsoft?',
            answers: [
                { text: 'Elon Musk', result: 0 },
                { text: 'Steve Jobs', result: 0 },
                { text: 'Bill Clinton', result: 0 },
                { text: 'Bill Gates', result: 1 }
            ]
        },
        {
            question: 'What is the capital city of Czech Republic?',
            answers: [
                { text: 'Amsterdam', result: 0 },
                { text: 'Sofia', result: 0 },
                { text: 'Prague', result: 1 },
                { text: 'Budapest', result: 0 }
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

    $('#start').click(function () {
        $('#start').hide();
        $('.info').hide();
        start();
    });

    $('#reset').click(function () {
        reset();
    });
}); 