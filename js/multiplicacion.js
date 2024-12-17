// Generar una pregunta de multiplicaciones con números aleatorios
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10
    const num2 = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10
    const correctAnswer = num1 * num2;

    // Generar opciones de respuesta
    const options = new Set();
    options.add(correctAnswer);
    while (options.size < 4) {
        const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5; // Opciones cercanas
        // Asegurarse de que las respuestas incorrectas sean positivas y no repetidas
        if (wrongAnswer > 0 && !options.has(wrongAnswer)) options.add(wrongAnswer);
    }

    return {
        question: `¿Cuánto es ${num1} × ${num2}?`,
        options: Array.from(options).sort(() => Math.random() - 0.5),
        correctAnswer,
    };
}

let currentQuestionIndex = 0;
let correctAnswers = 0;
const totalQuestions = 10;

const quizContainer = document.getElementById("quiz-container");
const nextButton = document.getElementById("next-question");
const progressBar = document.getElementById("progress-bar");

function updateProgressBar() {
    const progress = Math.floor((currentQuestionIndex / totalQuestions) * 100);
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute("aria-valuenow", progress);
    progressBar.textContent = `${progress}%`;
}

// Mostrar pregunta
function showQuestion() {
    currentQuestionIndex++;
    updateProgressBar();

    const question = generateQuestion();
    quizContainer.innerHTML = `
        <div class="quiz-card">
            <p class="question-header">${currentQuestionIndex}. ${question.question}</p>
            <ul class="list-group">
                ${question.options
                    .map(
                        (option) => `
                            <li class="list-group-item" data-value="${option}">${option}</li>
                        `
                    )
                    .join("")}
            </ul>
        </div>
    `;

    document.querySelectorAll(".list-group-item").forEach((item) => {
        item.addEventListener("click", () => handleAnswer(item, question));
    });

    nextButton.disabled = true;
}

// Manejar respuesta
function handleAnswer(selectedItem, question) {
    const selectedValue = parseInt(selectedItem.dataset.value);
    const allOptions = document.querySelectorAll(".list-group-item");

    allOptions.forEach((option) => {
        const value = parseInt(option.dataset.value);
        if (value === question.correctAnswer) {
            option.classList.add("correct-answer");
        } else if (value === selectedValue) {
            option.classList.add("wrong-answer");
        }
        option.style.pointerEvents = "none";
    });

    if (selectedValue === question.correctAnswer) {
        correctAnswers++;
    }

    nextButton.disabled = false;
}

// Mostrar resultados finales
function showResults() {
    updateProgressBar(); // Completar barra al 100%
    progressBar.style.width = "100%";
    progressBar.setAttribute("aria-valuenow", "100%");
    progressBar.textContent = "100%";

    let message;
    if (correctAnswers === totalQuestions) {
        message = "¡Bien hecho! Respondiste todas las preguntas correctamente.";
    } else if (correctAnswers >= 6) {
        message = "¡Vas por buen camino! Sigue practicando para mejorar aún más.";
    } else {
        message = "No te desanimes, puedes seguir mejorando.";
    }

    quizContainer.innerHTML = `
<div class="result-card">
<h2 class="text-center mb-3">Resultados</h2>

<!-- Barra de progreso de respuestas correctas -->
<p class="mb-2">Preguntas correctas: <strong>${correctAnswers}</strong></p>
<div class="progress mb-4">
    <div class="progress-bar bg-success" role="progressbar" 
        style="width: ${(correctAnswers / totalQuestions) * 100}%" 
        aria-valuenow="${correctAnswers}" 
        aria-valuemin="0" 
        aria-valuemax="${totalQuestions}">
        ${Math.round((correctAnswers / totalQuestions) * 100)}%
    </div>
</div>

<!-- Barra de progreso de respuestas incorrectas -->
<p class="mb-2">Preguntas incorrectas: <strong>${totalQuestions - correctAnswers}</strong></p>
<div class="progress mb-4">
    <div class="progress-bar bg-danger" role="progressbar" 
        style="width: ${((totalQuestions - correctAnswers) / totalQuestions) * 100}%" 
        aria-valuenow="${totalQuestions - correctAnswers}" 
        aria-valuemin="0" 
        aria-valuemax="${totalQuestions}">
        ${Math.round(((totalQuestions - correctAnswers) / totalQuestions) * 100)}%
    </div>
</div>

<p class="mt-3">${message}</p>
<button class="btn btn-warning w-100 mt-3" onclick="restart()">Reintentar</button>
<button class="btn btn-primary w-100 mt-3" onclick="redireccionar()">Volver al inicio</button>
</div>
`;

    nextButton.style.display = "none";
}

showQuestion();

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < totalQuestions) {
        showQuestion();
    } else {
        showResults();
    }
});

function redireccionar() {
    location.href = "index.html";
}

function restart() {
    location.reload();
}
