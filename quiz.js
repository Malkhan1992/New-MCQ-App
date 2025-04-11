// Get the logged-in user and selected subject from localStorage
let loggedInUser = localStorage.getItem("loggedInUser");
let selectedSubject = localStorage.getItem("selectedSubject");

// Redirect to subjects page if no user or subject is selected
if (!loggedInUser || !selectedSubject) {
    window.location.href = "subjects.html";
}

// Base URL for API endpoints
const BASE_URL = 'http://localhost:8000';

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

// Function to format subject name for file path
function formatSubjectName(subject) {
    return subject.replace(/\s+/g, '_');
}

// Function to format user name for file path
function formatUserName(user) {
    return user.replace(/\s+/g, '_');
}

// Load questions from the database
async function loadQuestions() {
    try {
        const user = formatUserName(loggedInUser);
        const subject = formatSubjectName(selectedSubject);
        
        const response = await fetch(`${BASE_URL}/database/${user}/${subject}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load questions: ${response.status}`);
        }
        
        const data = await response.json();
        questions = data.questions || [];
        
        if (questions.length === 0) {
            throw new Error('No questions available for this subject');
        }
        
        if (questions.length !== 10) {
            throw new Error('Invalid number of questions. Please contact administrator.');
        }

        // Sort questions by ID to ensure correct order
        questions.sort((a, b) => a.id - b.id);
            
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

// Function to refresh questions
async function refreshQuestions() {
    const user = formatUserName(loggedInUser);
    const subject = formatSubjectName(selectedSubject);
    
    if (!user || !subject) {
        showError('Please select both user and subject');
        return;
    }

    showLoading();
    
    try {
        console.log('Loading question pool...');
        const poolResponse = await fetch(`${BASE_URL}/database/admin/question_pool.json`);
        if (!poolResponse.ok) {
            throw new Error(`Failed to load question pool: ${poolResponse.status}`);
        }
        const pool = await poolResponse.json();
        console.log('Question pool loaded:', pool);
        
        // Get all questions for the subject (direct array, no difficulty levels)
        const subjectQuestions = pool[subject] || [];

        if (subjectQuestions.length === 0) {
            throw new Error(`No questions available for ${subject}`);
        }

        console.log(`Found ${subjectQuestions.length} questions for ${subject}`);
        
        // Shuffle and select 10 questions
        const selectedQuestions = [...subjectQuestions]
            .sort(() => 0.5 - Math.random())
            .slice(0, 10);

        console.log('Selected questions:', selectedQuestions);
        currentRefreshedQuestions = selectedQuestions;
        displayQuestions(selectedQuestions, true);
    } catch (error) {
        console.error('Error refreshing questions:', error);
        showError(`Error refreshing questions: ${error.message}`);
    }
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

// Select an option
function selectOption(optionIndex) {
    // Store the answer
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Update UI
    const options = optionsContainerElement.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index === optionIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

// Start the timer for current question
function startTimer() {
    clearInterval(timerInterval);
    
    // Use the saved time for this question
    let timeLeft = questionTimers[currentQuestionIndex];
    
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        
        // Update time spent on this question
        questionTimeSpent[currentQuestionIndex] = 90 - timeLeft;
        
        // Save current time for this question
        questionTimers[currentQuestionIndex] = timeLeft;
        
        // Update the timer display
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            questionCompleted[currentQuestionIndex] = true;
            questionTimeSpent[currentQuestionIndex] = 90; // Full time spent
            
            timerElement.textContent = "Time's Up!";
            timerElement.style.color = '#ff6b6b';
            
            // Disable all options
            const options = optionsContainerElement.querySelectorAll('.option');
            options.forEach(option => {
                option.style.opacity = "0.7";
                option.style.pointerEvents = "none";
            });
            
            setTimeout(() => {
                autoMoveToNextQuestion();
            }, 1500);
        } else {
            // Change color when time is running out
            if (timeLeft <= 10) {
                timerElement.style.color = '#ff6b6b';
            } else {
                timerElement.style.color = '#ffffff';
            }
            
            // Update timer display
            timerElement.textContent = `Time Left - ${timeLeft} sec`;
        }
    }, 1000);
}

// Update timer display based on current question
function updateTimerDisplay() {
    const timeLeft = questionTimers[currentQuestionIndex];
    
    if (questionCompleted[currentQuestionIndex]) {
        timerElement.textContent = "Time's Up!";
        timerElement.style.color = '#ff6b6b';
    } else {
        timerElement.textContent = `Time Left - ${timeLeft} sec`;
        
        if (timeLeft <= 10) {
            timerElement.style.color = '#ff6b6b';
        } else {
            timerElement.style.color = '#ffffff';
        }
    }
}

// Automatically move to the next question when timer ends
function autoMoveToNextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        finishQuiz();
    }
}

// Update navigation buttons based on current question index
function updateNavigationButtons() {
    prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'block';
    nextButton.style.display = currentQuestionIndex === totalQuestions - 1 ? 'none' : 'block';
    submitButton.style.display = currentQuestionIndex === totalQuestions - 1 ? 'block' : 'none';
}

// Function to finish the quiz and show results
function finishQuiz() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    let score = 0;
    let totalTimeSpent = 0;
    let questionsAttempted = 0;
    let wrongAnswers = 0;
    
    // Calculate score with negative marking
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] !== -1) {
            questionsAttempted++;
            const selectedAnswer = questions[i].options[userAnswers[i]];
            if (selectedAnswer === questions[i].answer) {
                score += 1;
            } else {
                score -= 0.5; // Negative marking for wrong answers
                wrongAnswers++;
            }
        }
        totalTimeSpent += questionTimeSpent[i] || 0;
    }
    
    // Ensure score doesn't go below 0
    score = Math.max(0, score);
    const percentage = (score / questions.length) * 100;
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();

    // Save results before showing celebration
    const results = {
        user: loggedInUser,
        subject: selectedSubject,
        score: score,
        totalQuestions: questions.length,
        percentage: percentage,
        questionsAttempted: questionsAttempted,
        wrongAnswers: wrongAnswers,
        timeSpent: totalTimeSpent,
        date: currentDate,
        time: currentTime
    };
    
    // Store results in localStorage
    let allResults;
    try {
        allResults = JSON.parse(localStorage.getItem('quizResults'));
        if (!Array.isArray(allResults)) {
            allResults = [];
        }
    } catch (error) {
        allResults = [];
    }
    
    allResults.push(results);
    localStorage.setItem('quizResults', JSON.stringify(allResults));
    
    // Always show detailed report first
    showDetailedResults(results);
}

// Function to get medal type based on percentage
function getMedalType(percentage) {
    if (percentage >= 98) return 'gold1';
    if (percentage >= 94) return 'Silver';
    if (percentage >= 90) return 'Bronze';
    return null;
}

// Function to get motivational message based on medal type
function getMotivationalMessage(medalType) {
    if (medalType === 'gold1') {
        return 'Excellence is not a skill, it\'s an attitude. You\'ve proved it!';
    } else if (medalType === 'Silver') {
        return 'Great achievement comes from great dedication. Well done!';
    } else {
        return 'Success is the sum of small efforts repeated day in and day out.';
    }
}

// Function to print certificate
function printCertificate(results, medalType) {
    // Create a new window for the certificate
    const certificateWindow = window.open('', '_blank');
    
    // Certificate HTML content
    certificateWindow.document.write(`
        <html>
        <head>
            <title>Certificate of Achievement - ${results.user}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 40px;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                }
                .certificate {
                    background: white;
                    padding: 50px;
                    border-radius: 20px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                    text-align: center;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .medal-image {
                    width: 150px;
                    margin: 20px 0;
                }
                .trophy-image {
                    width: 100px;
                    margin: 20px 0;
                }
                h1 {
                    color: #2c3e50;
                    font-size: 36px;
                    margin-bottom: 20px;
                }
                .student-name {
                    color: #2c3e50;
                    font-size: 28px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                .details {
                    color: #34495e;
                    font-size: 20px;
                    margin: 10px 0;
                }
                .score {
                    color: #27ae60;
                    font-size: 24px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                .date {
                    color: #7f8c8d;
                    font-size: 18px;
                    margin-top: 30px;
                }
                @media print {
                    body {
                        margin: 0;
                        background: white;
                    }
                    .certificate {
                        box-shadow: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="certificate">
                <img src="images/trophy.png" alt="Trophy" class="trophy-image">
                <h1>Certificate of Achievement</h1>
                <img src="medals/${medalType}.png" alt="Medal" class="medal-image">
                <div class="student-name">${results.user}</div>
                <div class="details">has successfully completed the assessment in</div>
                <div class="details" style="font-weight: bold;">${results.subject}</div>
                <div class="score">Score: ${results.percentage.toFixed(1)}%</div>
                <div class="details">Achievement: ${getMotivationalMessage(medalType)}</div>
                <div class="date">Date: ${results.date} | Time: ${results.time}</div>
            </div>
            <script>
                window.onload = () => {
                    window.print();
                };
            </script>
        </body>
        </html>
    `);
}

// Function to show success story for high achievers
function showSuccessStory(results) {
    const quizContainer = document.getElementById('quiz-container');
    const medalType = getMedalType(results.percentage);
    const motivationalMessage = getMotivationalMessage(medalType);
    
    // Add confetti script if not already added
    if (!document.querySelector('script[src*="canvas-confetti"]')) {
        const confettiScript = document.createElement('script');
        confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js';
        document.head.appendChild(confettiScript);
    }

    quizContainer.innerHTML = `
        <div class="success-story" style="background: linear-gradient(135deg, #0a3d62, #1e5799); padding: 20px; border-radius: 15px; color: white; text-align: center;">
            <div class="trophy-animation" style="margin: 40px 0;">
                <img src="images/trophy.png" alt="Trophy" style="width: 200px; animation: float 3s ease-in-out infinite;">
                <style>
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                        100% { transform: translateY(0px); }
                    }
                </style>
                <h1 style="color: #ffeb3b; font-size: 36px; margin: 20px 0;">🌟 Your Success Gift! 🌟</h1>
            </div>

            <div class="success-message" style="background: rgba(76, 175, 80, 0.1); padding: 30px; border-radius: 15px; margin: 20px 0;">
                <h2 style="color: #4CAF50; margin-bottom: 20px;">Congratulations ${results.user}! 🎉</h2>
                <p style="font-size: 18px; line-height: 1.6;">
                    Your exceptional performance in ${results.subject} has earned you a special reward!<br>
                    Scoring ${results.percentage.toFixed(1)}% shows your outstanding dedication and knowledge.
                </p>
            </div>

            <div class="medal-showcase" style="background: rgba(255,215,0,0.1); padding: 30px; border-radius: 15px; margin: 20px 0;">
                <div style="position: relative; display: inline-block;">
                    <img src="medals/${medalType}.png" alt="Medal" style="width: 200px; margin-bottom: 20px;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 80%;">
                        <div style="font-size: 19px; color: #1a1a1a; font-weight: bold; text-shadow: 1px 1px 2px rgba(255,255,255,0.8);">${results.user}</div>
                        <div style="font-size: 16px; color: #333333; font-weight: 600;">${results.subject}</div>
                    </div>
                </div>
                <h3 style="color: #ffeb3b; margin: 15px 0;">
                    ${medalType === 'gold1' ? '🏆 Gold Medal of Excellence 🏆' : 
                      medalType === 'Silver' ? '🥈 Silver Medal of Achievement 🥈' : 
                      '🥉 Bronze Medal of Merit 🥉'}
                </h3>
            </div>

            <div class="achievement-stats" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0;">
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
                    <div style="font-size: 24px; color: #4CAF50;">${results.score}/${results.totalQuestions}</div>
                    <div>Perfect Score</div>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
                    <div style="font-size: 24px; color: #4CAF50;">${results.percentage.toFixed(1)}%</div>
                    <div>Excellence</div>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
                    <div style="font-size: 24px; color: #4CAF50;">${Math.floor(results.timeSpent / 60)}:${(results.timeSpent % 60).toString().padStart(2, '0')}</div>
                    <div>Record Time</div>
                </div>
            </div>

            <div class="motivational-message" style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; margin: 20px 0;">
                <p style="font-size: 18px; line-height: 1.6;">
                    "${motivationalMessage}"<br>
                    Keep pushing your boundaries and reaching for the stars!
                </p>
            </div>

            <div style="display: flex; justify-content: center; gap: 15px; margin-top: 30px;">
                <button class="nav-button" style="background: #4CAF50; color: white; padding: 12px 25px; border-radius: 25px; cursor: pointer; border: none;" 
                        onclick='showDetailedResults(${JSON.stringify(results).replace(/'/g, "\\'")})'>
                    Back to Report
                </button>
                <button class="nav-button" style="background: #2196F3; color: white; padding: 12px 25px; border-radius: 25px; cursor: pointer; border: none;" 
                        onclick="window.location.href='subjects.html'">
                    Try Another Subject
                </button>
                <button class="nav-button" style="background: #ffeb3b; color: #333; padding: 12px 25px; border-radius: 25px; cursor: pointer; border: none;" 
                        onclick='printCertificate(${JSON.stringify(results).replace(/'/g, "\\'")},"${medalType}")'>
                    Download Certificate
                </button>
            </div>
        </div>
    `;

    // Start confetti animation
    setTimeout(() => {
        if (window.confetti) {
            const duration = 15 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                }));
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                }));
            }, 250);
        }
    }, 1000);
}

// Function to show detailed results
function showDetailedResults(results) {
    // Calculate performance metrics
    const correctAnswers = questions.filter((q, i) => userAnswers[i] !== -1 && q.options[userAnswers[i]] === q.answer).length;
    const wrongAnswers = questions.filter((q, i) => userAnswers[i] !== -1 && q.options[userAnswers[i]] !== q.answer).length;
    const unattempted = questions.length - (correctAnswers + wrongAnswers);
    const accuracy = ((correctAnswers / (correctAnswers + wrongAnswers)) * 100) || 0;
    
    // Generate question details table rows
    let questionDetailsHTML = '';
    questions.forEach((question, index) => {
        const selectedAnswer = userAnswers[index] !== -1 ? questions[index].options[userAnswers[index]] : 'Not Attempted';
        const isCorrect = selectedAnswer === question.answer;
        const timeSpent = questionTimeSpent[index] || 0;
        const marks = isCorrect ? '+1' : (selectedAnswer === 'Not Attempted' ? '0' : '-0.5');
        
        questionDetailsHTML += `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                <td style="padding: 12px;">${index + 1}</td>
                <td style="padding: 12px;">${question.question}</td>
                <td style="padding: 12px; color: ${selectedAnswer === 'Not Attempted' ? '#ff9800' : (isCorrect ? '#4CAF50' : '#f44336')}">${selectedAnswer}</td>
                <td style="padding: 12px;">${question.answer}</td>
                <td style="padding: 12px;">${timeSpent} sec</td>
                <td style="padding: 12px; color: ${isCorrect ? '#4CAF50' : '#f44336'}">${marks}</td>
            </tr>
        `;
    });

    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="detailed-report" style="background: linear-gradient(135deg, #0a3d62, #1e5799); padding: 20px; border-radius: 15px; color: white;">
            <div class="report-header" style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #ffeb3b; margin-bottom: 10px;">Detailed Performance Report</h1>
                <div style="font-size: 18px; margin-bottom: 5px;">Student: ${results.user}</div>
                <div style="font-size: 18px;">Subject: ${results.subject}</div>
            </div>

            <div class="performance-summary" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
                    <h3 style="color: #ffeb3b; margin-bottom: 15px;">Score Summary</h3>
                    <div style="display: grid; gap: 10px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Total Score:</span>
                            <span style="color: #4CAF50">${results.score}/${results.totalQuestions}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Percentage:</span>
                            <span style="color: #4CAF50">${results.percentage.toFixed(1)}%</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Accuracy:</span>
                            <span style="color: #4CAF50">${accuracy.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>

                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
                    <h3 style="color: #ffeb3b; margin-bottom: 15px;">Question Analysis</h3>
                    <div style="display: grid; gap: 10px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Correct Answers:</span>
                            <span style="color: #4CAF50">${correctAnswers}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Wrong Answers:</span>
                            <span style="color: #f44336">${wrongAnswers}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Not Attempted:</span>
                            <span style="color: #ff9800">${unattempted}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="time-analysis" style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-bottom: 30px;">
                <h3 style="color: #ffeb3b; margin-bottom: 15px;">Time Analysis</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: center;">
                    <div>
                        <div style="font-size: 24px; color: #4CAF50">${Math.floor(results.timeSpent / 60)}:${(results.timeSpent % 60).toString().padStart(2, '0')}</div>
                        <div>Total Time</div>
                    </div>
                    <div>
                        <div style="font-size: 24px; color: #4CAF50">${(results.timeSpent / questions.length).toFixed(1)}</div>
                        <div>Avg. Time per Question</div>
                    </div>
                    <div>
                        <div style="font-size: 24px; color: #4CAF50">${Math.max(...questionTimeSpent)}</div>
                        <div>Max Time on Question</div>
                    </div>
                </div>
            </div>

            <div class="question-details" style="margin-bottom: 30px;">
                <h3 style="color: #ffeb3b; margin-bottom: 15px;">Question-wise Analysis</h3>
                <div style="overflow-x: auto; background: rgba(255,255,255,0.05); border-radius: 10px; padding: 15px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: rgba(255,255,255,0.1);">
                                <th style="padding: 12px; text-align: left; color: #ffeb3b;">Q#</th>
                                <th style="padding: 12px; text-align: left; color: #ffeb3b;">Question</th>
                                <th style="padding: 12px; text-align: left; color: #ffeb3b;">Your Answer</th>
                                <th style="padding: 12px; text-align: left; color: #ffeb3b;">Correct Answer</th>
                                <th style="padding: 12px; text-align: left; color: #ffeb3b;">Time</th>
                                <th style="padding: 12px; text-align: left; color: #ffeb3b;">Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${questionDetailsHTML}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="report-footer" style="text-align: center; margin-top: 30px;">
                <div style="margin-bottom: 20px;">
                    <div>Date: ${results.date}</div>
                    <div>Time: ${results.time}</div>
                </div>
                
                <div style="display: flex; justify-content: center; gap: 15px;">
                    ${results.percentage >= 90 ? `
                        <button class="success-gift-button" onclick='showSuccessStory(${JSON.stringify(results)})' 
                                style="background: #ffeb3b; color: #333; padding: 12px 25px; border-radius: 25px; font-weight: bold; cursor: pointer;">
                            🎁 Success Gift 🎁
                        </button>
                    ` : ''}
                    <button class="nav-button" style="background: #2196F3; color: white; padding: 12px 25px; border-radius: 25px;" 
                            onclick="window.location.href='subjects.html'">
                        Back to Subjects
                    </button>
                    <button class="nav-button" style="background: #ffeb3b; color: #333; padding: 12px 25px; border-radius: 25px;" 
                            onclick="printResults()">
                        Print Report Card
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Function to print results
function printResults() {
    window.print();
}

// Exit the quiz
function exitQuiz() {
    if (confirm("Are you sure you want to exit the quiz? Your progress will be lost.")) {
        window.location.href = "subjects.html";
    }
}

// Event listeners
prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

// Remove the old event listener and add a new one with explicit function call
submitButton.removeEventListener("click", finishQuiz);
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("Submit button clicked");
    finishQuiz();
});

exitButton.addEventListener("click", exitQuiz);

// Initialize the quiz when the page loads
initializeQuiz();