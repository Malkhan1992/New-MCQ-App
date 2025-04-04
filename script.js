document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorMessage = document.getElementById("error-message");

    // Allowed student credentials
    const users = {
        "Aryan Singh": "Ar2016",
        "Aditya Singh": "Ad2017"
    };

    if (users[username] && users[username] === password) {
        // ✅ If login is successful, store user and redirect to subjects.html
        localStorage.setItem("loggedInUser", username);
        window.location.href = "subjects.html";
    } else {
        // ❌ Show error message
        errorMessage.textContent = "Invalid username or password";
        errorMessage.style.display = "block";
        errorMessage.style.color = "red";
    }
});
let questions = {
    "General Awareness": [
        { question: "Who is the current Prime Minister of India?", options: ["Narendra Modi", "Rahul Gandhi", "Amit Shah", "Manmohan Singh"], answer: "Narendra Modi" },
        { question: "What is the capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], answer: "Tokyo" }
    ]
};

let urlParams = new URLSearchParams(window.location.search);
let subject = urlParams.get('subject');

if (document.getElementById('quiz-title')) { 
    if (!subject || !questions[subject]) {
        alert("Invalid subject. Please go back and select a valid subject.");
        window.location.href = "index.html";
    } else {
        let quizTitle = document.getElementById('quiz-title');
        let questionElem = document.getElementById('question');
        let optionsElem = document.getElementById('options');

        quizTitle.innerText = subject + " Quiz for " + loggedInUser;
        let currentQuestionIndex = 0;
        let selectedAnswers = [];
        let quizQuestions = questions[subject];
        
        function loadQuestion() {
            if (currentQuestionIndex >= quizQuestions.length) {
                questionElem.innerText = "You have completed the quiz. Click Submit.";
                optionsElem.innerHTML = "";
                return;
            }
            let questionData = quizQuestions[currentQuestionIndex];
            questionElem.innerText = questionData.question;
            optionsElem.innerHTML = "";
            
            questionData.options.forEach(option => {
                let button = document.createElement("button");
                button.innerText = option;
                button.onclick = () => selectAnswer(option);
                optionsElem.appendChild(button);
            });
        }
        
        function selectAnswer(answer) {
            selectedAnswers[currentQuestionIndex] = answer;
            currentQuestionIndex++;
            loadQuestion();
        }
        
        function submitQuiz() {
            let correct = 0;
            quizQuestions.forEach((q, index) => {
                if (q.answer === selectedAnswers[index]) {
                    correct++;
                }
            });
            window.location.href = `result.html?score=${correct}&total=${quizQuestions.length}`;
        }
        
        loadQuestion();
    }
}
