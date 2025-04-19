// Get the logged-in user and selected subject from localStorage
let loggedInUser = localStorage.getItem("loggedInUser");
let selectedSubject = localStorage.getItem("selectedSubject");

// Redirect to subjects page if no user or subject is selected
if (!loggedInUser || !selectedSubject) {
    window.location.href = "subjects.html";
}

// Quiz state variables
let questions = [];
let currentQuestionIndex = 0;
let totalQuestions = 0;
let userAnswers = [];
let questionTimers = [];
let questionTimeSpent = [];
let questionCompleted = [];
let timerInterval = null;

// Get DOM elements
const timerElement = document.getElementById("timer");
const optionsContainerElement = document.getElementById("options-container");
const questionTextElement = document.getElementById("question-text");
const questionNumberElement = document.getElementById("question-number");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");
const exitButton = document.getElementById("exit-button");

// Load questions from localStorage and JSON files
async function loadQuestions() {
    try {
        const user = formatUserName(loggedInUser);
        const subject = formatSubjectName(selectedSubject);
        
        console.log('Loading quiz for:', {
            user, 
            subject,
            formattedUser: user,
            formattedSubject: subject
        });
        
        let quizQuestions = [];
        
        // First try from questionPool (saved by admin)
        const questionPoolData = localStorage.getItem('questionPool');
        if (questionPoolData) {
            try {
                const questionPool = JSON.parse(questionPoolData);
                
                // First check if user-specific questions exist
                if (questionPool[user] && questionPool[user][subject] && 
                    questionPool[user][subject].questions && 
                    questionPool[user][subject].questions.length > 0) {
                    quizQuestions = questionPool[user][subject].questions;
                    console.log('Using questions from admin pool for specific user');
                }
            } catch (e) {
                console.warn('Failed to parse question pool:', e);
            }
        }
        
        // If no questions from admin pool, try from user's JSON file
        if (quizQuestions.length === 0) {
            try {
                const response = await fetch(`database/${user}/${subject}.json`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.questions && data.questions.length > 0) {
                        // Take random 10 questions if more are available
                        quizQuestions = data.questions
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 10);
                        console.log('Using questions from user JSON file');
                    }
                }
            } catch (e) {
                console.warn('Failed to load questions from JSON:', e);
            }
        }
        
        if (quizQuestions.length === 0) {
            throw new Error('No questions available for this subject');
        }
        
        // Assign questions and add ID if missing
        questions = quizQuestions.map((q, index) => ({
            ...q,
            id: q.id || index + 1
        }));
        
        totalQuestions = questions.length;
        
        // Initialize quiz state
        currentQuestionIndex = 0;
        userAnswers = new Array(totalQuestions).fill(-1);
        questionTimers = new Array(totalQuestions).fill(90);
        questionTimeSpent = new Array(totalQuestions).fill(0);
        questionCompleted = new Array(totalQuestions).fill(false);

        // Display student name and subject
        const studentNameElement = document.getElementById("student-name");
        const subjectNameElement = document.getElementById("subject-name");
        if (studentNameElement) studentNameElement.textContent = loggedInUser;
        if (subjectNameElement) subjectNameElement.textContent = selectedSubject;
        
        // Load the first question
        loadQuestion(0);
    } catch (error) {
        console.error('Error loading questions:', error);
        showError(`Error loading questions: ${error.message}`);
    }
}

// Helper functions for formatting names
function formatSubjectName(subject) {
    let formatted = subject.replace(/\s+/g, '_');
    return formatted.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('_');
}

function formatUserName(user) {
    return user.split(' ')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('_');
}

// Initialize the quiz
async function initializeQuiz() {
    await loadQuestions();
    
    if (questions.length === 0) {
        document.getElementById('quiz-container').innerHTML = `
            <div class="error">
                No questions available for this subject. Please contact the administrator.
            </div>
        `;
        return;
    }

    // Load the first question
    loadQuestion(0);
}

// Load a question by index
function loadQuestion(index) {
    // Clear previous timer
    clearInterval(timerInterval);
    
    // Get the current question
    const question = questions[index];
    
    // Update question number
    questionNumberElement.textContent = `Question ${(index + 1).toString().padStart(2, '0')}`;
    
    // Set question text
    questionTextElement.textContent = question.question;
    
    // Clear options container
    optionsContainerElement.innerHTML = '';
    
    // Check if question is completed (time up)
    const isQuestionCompleted = questionCompleted[index];
    
    // Add options
    question.options.forEach((option, optionIndex) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        
        // Mark as selected if previously selected
        if (userAnswers[index] === optionIndex) {
            optionElement.classList.add('selected');
        }
        
        // Add click event if time is not up
        if (!isQuestionCompleted) {
            optionElement.addEventListener('click', () => {
                selectOption(optionIndex);
            });
        } else {
            optionElement.style.opacity = "0.7"; // Visual indicator that question can't be answered
        }
        
        optionsContainerElement.appendChild(optionElement);
    });
    
    // Update timer display
    updateTimerDisplay();
    
    // Start timer if not completed
    if (!isQuestionCompleted) {
        startTimer();
    } else {
        // Display time's up message
        timerElement.textContent = "Time's Up!";
        timerElement.style.color = '#ff6b6b';
    }
    
    // Update navigation buttons
    updateNavigationButtons();
}

// Function to select an option
function selectOption(optionIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Update UI
    const options = optionsContainerElement.children;
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove('selected');
    }
    options[optionIndex].classList.add('selected');
}

// Function to start timer
function startTimer() {
    timerInterval = setInterval(() => {
        if (questionTimers[currentQuestionIndex] > 0) {
            questionTimers[currentQuestionIndex]--;
            questionTimeSpent[currentQuestionIndex]++;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            questionCompleted[currentQuestionIndex] = true;
            timerElement.textContent = "Time's Up!";
            timerElement.style.color = '#ff6b6b';
        }
    }, 1000);
}

// Function to update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(questionTimers[currentQuestionIndex] / 60);
    const seconds = questionTimers[currentQuestionIndex] % 60;
    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Function to update navigation buttons
function updateNavigationButtons() {
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = currentQuestionIndex === totalQuestions - 1;
    submitButton.style.display = currentQuestionIndex === totalQuestions - 1 ? 'block' : 'none';
}

// Function to go to previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

// Function to go to next question
function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}

// Function to submit quiz
function submitQuiz() {
        clearInterval(timerInterval);
    
    // Calculate results
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let unattempted = 0;
    let totalTimeSpent = 0;
    let totalMarks = 0;
    
    const questionResults = questions.map((q, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer !== -1 && q.options[userAnswer] === q.answer;
        const marks = isCorrect ? 1 : 0;
        
        if (userAnswer === -1) {
            unattempted++;
        } else if (isCorrect) {
            correctAnswers++;
            totalMarks += marks;
            } else {
                wrongAnswers++;
        }
        
        totalTimeSpent += questionTimeSpent[index];
        
        return {
            question: q.question,
            userAnswer: userAnswer === -1 ? 'Not Answered' : q.options[userAnswer],
            correctAnswer: q.answer,
            isCorrect,
            timeSpent: questionTimeSpent[index],
            marks: marks
        };
    });
    
    // Calculate percentage
    const percentage = (totalMarks / totalQuestions) * 100;
    
    // Determine performance comment
    let performanceComment = "";
    if (percentage >= 90) {
        performanceComment = "Excellent";
    } else if (percentage >= 70) {
        performanceComment = "Good";
    } else if (percentage >= 50) {
        performanceComment = "Average";
    } else {
        performanceComment = "Fail";
    }
    
    // Save results in original format for backwards compatibility
    const resultKey = `quiz_result_${formatUserName(loggedInUser)}_${formatSubjectName(selectedSubject)}_${Date.now()}`;
    localStorage.setItem(resultKey, JSON.stringify({
        user: loggedInUser,
        subject: selectedSubject,
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        unattempted,
        timeSpent: totalTimeSpent,
        questionResults: questionResults,
        date: new Date().toISOString()
    }));
    
    // Save results in the format expected by result.html
    localStorage.setItem("quizResults", JSON.stringify({
        totalMarks: totalMarks,
        maxPossibleMarks: totalQuestions,
        percentage: percentage,
        performanceComment: performanceComment,
        questionResults: questionResults,
        timeSpent: totalTimeSpent
    }));
    
    // Redirect to results page
    window.location.href = `result.html`;
}

// Function to show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    document.body.insertBefore(errorDiv, document.body.firstChild);
}

// Add event listeners
prevButton.addEventListener('click', prevQuestion);
nextButton.addEventListener('click', nextQuestion);
submitButton.addEventListener('click', submitQuiz);
exitButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
        window.location.href = 'subjects.html';
    }
});

// Initialize the quiz when the page loads
initializeQuiz();