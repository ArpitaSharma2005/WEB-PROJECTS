const questions = [
    {
        question: "Which hormone is responsible for the 'fight or flight' response?",
        answers: [
            { text: "Adrenaline", correct: true },
            { text: "Insulin", correct: false },
            { text: "Thyroxine", correct: false },
            { text: "Estrogen", correct: false },
        ]
    },
    {
        question: "Which blood group is known as the universal donor?",
        answers: [
            { text: "O+", correct: false },
            { text: "AB+", correct: false },
            { text: "O-", correct: true },
            { text: "A-", correct: false },
        ]
    },
    {
        question: "Which part of the nephron is responsible for filtration?",
        answers: [
            { text: "Loop of Henle", correct: false },
            { text: "Bowman's Capsule", correct: true },
            { text: "Distal Tubule", correct: false },
            { text: "Collecting Duct", correct: false },
        ]
    },
    {
        question: "Which enzyme is secreted by the stomach to digest proteins?",
        answers: [
            { text: "Pepsin", correct: true },
            { text: "Trypsin", correct: false },
            { text: "Lipase", correct: false },
            { text: "Amylase", correct: false },
        ]
    },
    {
        question: "Which of the following is a genetic disorder?",
        answers: [
            { text: "Diabetes", correct: false },
            { text: "Hypertension", correct: false },
            { text: "Hemophilia", correct: true },
            { text: "Asthma", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ".  " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! 🎉`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
