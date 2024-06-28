const quizData = [
    {
        question: "What does HTML stand for?",
        a: "Hyper Trainer Marking Language",
        b: "Hyper Text Marketing Language",
        c: "Hyper Text Markup Language",
        d: "Hyper Text Markup Leveler",
        correct: "c",
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        a: "font-color",
        b: "text-color",
        c: "color",
        d: "background-color",
        correct: "c",
    },
    {
        question: "Which JavaScript method is used to write on the browser's console?",
        a: "console.write()",
        b: "console.output()",
        c: "console.log()",
        d: "console.print()",
        correct: "c",
    },
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        a: "<script href='script.js'></script>",
        b: "<script name='script.js'></script>",
        c: "<script src='script.js'></script>",
        d: "<script file='script.js'></script>",
        correct: "c",
    },
    {
        question: "In React, what is used to pass data to a component from outside?",
        a: "setState",
        b: "render with arguments",
        c: "props",
        d: "PropTypes",
        correct: "c",
    },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const scoreDisplay = document.getElementById("score");
const progress = document.getElementById("progress");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    if (currentQuiz < quizData.length) {
        const currentQuizData = quizData[currentQuiz];

        questionEl.innerText = currentQuizData.question;
        document.getElementById("a").innerText = currentQuizData.a;
        document.getElementById("b").innerText = currentQuizData.b;
        document.getElementById("c").innerText = currentQuizData.c;
        document.getElementById("d").innerText = currentQuizData.d;
    } else {
        showCompletionMessage();
    }
}

function deselectAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.classList.remove("correct");
        answerEl.classList.remove("incorrect");
        answerEl.style.backgroundColor = ""; 
    });
}

function showCompletionMessage() {
    quiz.innerHTML = `
        <h2>Congratulations! You completed the quiz.</h2>
        <p class= text >You answered ${score}/${quizData.length} questions correctly.</p>
        <button class="home_reload" onclick="location.reload()">Home</button>
    `;
}

answerEls.forEach(answerEl => {
    answerEl.addEventListener("click", () => {
        const selectedAnswer = answerEl.id;
        const correctAnswer = quizData[currentQuiz].correct;

        if (selectedAnswer === correctAnswer) {
            score++;
            scoreDisplay.innerText = score;
            answerEl.classList.add("correct");
            answerEl.style.backgroundColor = "green"; 
        } else {
            answerEl.classList.add("incorrect");
            answerEl.style.backgroundColor = "red";
        }

        setTimeout(() => {
            currentQuiz++;
            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                showCompletionMessage();
            }
            progress.style.width = `${(currentQuiz / quizData.length) * 100}%`;
        }, 1000);
    });
});