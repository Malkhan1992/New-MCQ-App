document.addEventListener('DOMContentLoaded', () => {
    const userSelect = document.getElementById('userSelect');
    const subjectSelect = document.getElementById('subjectSelect');
    const viewBtn = document.getElementById('viewQuestions');
    const refreshBtn = document.getElementById('refreshQuestions');
    const addBtn = document.getElementById('addQuestion');
    const questionDisplay = document.getElementById('questionDisplay');
    const addQuestionForm = document.getElementById('addQuestionForm');
    const actionButtons = document.querySelector('.action-buttons');

    // Base URL for API endpoints
    const BASE_URL = 'http://localhost:8000';
    let currentRefreshedQuestions = null;

    // Function to format subject name for file path
    function formatSubjectName(subject) {
        return subject.replace(/\s+/g, '_');
    }

    // Function to format user name for file path
    function formatUserName(user) {
        return user.replace(/\s+/g, '_');
    }

    // Function to show loading state
    function showLoading() {
        questionDisplay.innerHTML = '<div class="loading">Loading questions...</div>';
    }

    // Function to show error message
    function showError(message) {
        questionDisplay.innerHTML = `<div class="error">${message}</div>`;
    }

    // Function to show success message
    function showSuccess(message) {
        questionDisplay.innerHTML = `<div class="success">${message}</div>`;
    }

    // Function to create confirm button
    function createConfirmButton() {
        return `
            <div class="confirm-button-container">
                <button id="confirmQuestions" class="confirm-button">
                    Add These Questions to User's Quiz
                </button>
            </div>
        `;
    }

    // Function to load questions
    async function loadQuestions() {
        const user = userSelect.value;
        const subject = formatSubjectName(subjectSelect.value);
        const formattedUser = formatUserName(user);
        
        if (!user || !subject) {
            showError('Please select both user and subject');
            return;
        }

        showLoading();
        currentRefreshedQuestions = null;
        
        try {
            console.log(`Loading questions for ${formattedUser}/${subject}`);
            const response = await fetch(`${BASE_URL}/database/${formattedUser}/${subject}.json`);
            if (!response.ok) {
                if (response.status === 404) {
                    showError('No questions found. Please refresh to generate new questions.');
                    return;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Loaded questions:', data);
            displayQuestions(data.questions || [], false);
        } catch (error) {
            console.error('Error loading questions:', error);
            showError(`Error loading questions: ${error.message}`);
        }
    }

    // Function to display questions
    function displayQuestions(questions, isRefreshed = false) {
        if (!questions || questions.length === 0) {
            showError('No questions available for this subject');
            return;
        }

        let html = `
            <div class="questions-header">
                <h2>${isRefreshed ? 'Refreshed' : 'Current'} Questions List</h2>
                <p>Total Questions: ${questions.length}</p>
            </div>
            <div class="question-list">
        `;
        
        questions.forEach((q, index) => {
            html += `
                <div class="question-item">
                    <h3>Question ${index + 1}</h3>
                    <p class="question-text"><strong>Q: </strong>${q.question}</p>
                    <p class="options-label"><strong>Options:</strong></p>
                    <ul class="options-list">
                        ${q.options.map((opt, i) => `<li>${String.fromCharCode(65 + i)}. ${opt}</li>`).join('')}
                    </ul>
                    <p class="answer"><strong>Correct Answer: </strong>${q.answer}</p>
                    <p class="difficulty"><strong>Difficulty: </strong>${q.difficulty}</p>
                    <p class="explanation"><strong>Explanation: </strong>${q.explanation || 'No explanation provided.'}</p>
                </div>
            `;
        });
        html += '</div>';

        if (isRefreshed) {
            html += createConfirmButton();
        }

        questionDisplay.innerHTML = html;

        if (isRefreshed) {
            const confirmBtn = document.getElementById('confirmQuestions');
            confirmBtn.addEventListener('click', () => confirmQuestions(questions));
        }
    }

    // Function to confirm and save questions
    async function confirmQuestions(questions) {
        const user = userSelect.value;
        const subject = formatSubjectName(subjectSelect.value);
        const formattedUser = formatUserName(user);

        try {
            // First ensure the user directory exists
            const createDirResponse = await fetch(`${BASE_URL}/create-directory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    path: `database/${formattedUser}`
                })
            });

            if (!createDirResponse.ok) {
                throw new Error('Failed to create user directory structure');
            }

            // Now create or update the questions file
            const questionsData = {
                questions,
                lastUpdated: new Date().toISOString(),
                user: user,
                subject: subjectSelect.value,
                totalQuestions: questions.length
            };

            // Save the file
            const saveResponse = await fetch(`${BASE_URL}/save-file`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    path: `database/${formattedUser}/${subject}.json`,
                    content: questionsData
                })
            });

            if (!saveResponse.ok) {
                const errorText = await saveResponse.text();
                console.error('Server response:', errorText);
                throw new Error(`Failed to save questions file`);
            }

            showSuccess(`Successfully added ${questions.length} questions to ${user}'s ${subject} quiz!`);
            currentRefreshedQuestions = null;

            // Reload questions to show the updated list
            setTimeout(loadQuestions, 1500);
        } catch (error) {
            console.error('Error saving questions:', error);
            showError(`Error saving questions: ${error.message}. Please check the server connection and try again.`);
        }
    }

    // Function to refresh questions
    async function refreshQuestions() {
        const user = userSelect.value;
        const subject = formatSubjectName(subjectSelect.value);
        
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
            
            // Get all questions for the subject
            const subjectQuestions = [];
            const difficultyLevels = ['easy', 'medium', 'hard', 'expert'];
            
            // Format subject name to match pool structure
            const formattedSubject = subject.replace(/\s+/g, '_');
            console.log('Looking for subject:', formattedSubject);
            
            if (!pool[formattedSubject]) {
                throw new Error(`No questions found for subject: ${subject}`);
            }

            for (const difficulty of difficultyLevels) {
                if (pool[formattedSubject]?.[difficulty]) {
                    subjectQuestions.push(...pool[formattedSubject][difficulty].map(q => ({
                        ...q,
                        difficulty
                    })));
                }
            }

            if (subjectQuestions.length === 0) {
                throw new Error(`No questions available for ${subject}`);
            }

            console.log(`Found ${subjectQuestions.length} questions for ${subject}`);
            
            // Shuffle and select random questions (between 8 and 12)
            const numQuestions = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
            const selectedQuestions = [...subjectQuestions]
                .sort(() => 0.5 - Math.random())
                .slice(0, numQuestions);

            console.log('Selected questions:', selectedQuestions);
            currentRefreshedQuestions = selectedQuestions;
            
            // Show success message with question count
            showSuccess(`Successfully loaded ${selectedQuestions.length} questions for ${subject}. Click "Add These Questions" to save them.`);
            
            // Display the questions
            displayQuestions(selectedQuestions, true);
        } catch (error) {
            console.error('Error refreshing questions:', error);
            showError(`Error refreshing questions: ${error.message}`);
        }
    }

    // Event listeners
    viewBtn.addEventListener('click', loadQuestions);
    refreshBtn.addEventListener('click', refreshQuestions);
    addBtn.addEventListener('click', () => {
        addQuestionForm.style.display = addQuestionForm.style.display === 'none' ? 'block' : 'none';
    });

    // Handle form submission
    addQuestionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newQuestion = {
            question: formData.get('question'),
            options: [
                formData.get('option1'),
                formData.get('option2'),
                formData.get('option3'),
                formData.get('option4')
            ],
            answer: formData.get('answer'),
            difficulty: formData.get('difficulty'),
            explanation: formData.get('explanation')
        };

        try {
            const subject = subjectSelect.value;
            if (!subject) {
                throw new Error('Please select a subject');
            }

            // Load current pool
            const poolResponse = await fetch(`${BASE_URL}/database/admin/question_pool.json`);
            if (!poolResponse.ok) {
                throw new Error('Failed to load question pool');
            }
            const pool = await poolResponse.json();

            // Add new question to the pool
            if (!pool[subject]) {
                pool[subject] = {
                    easy: [],
                    medium: [],
                    hard: [],
                    expert: []
                };
            }

            pool[subject][newQuestion.difficulty].push(newQuestion);

            // Save updated pool
            const updateResponse = await fetch(`${BASE_URL}/database/admin/question_pool.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pool)
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update question pool');
            }

            showSuccess('Question added successfully!');
            addQuestionForm.reset();
            addQuestionForm.style.display = 'none';
        } catch (error) {
            console.error('Error adding question:', error);
            showError(`Error adding question: ${error.message}`);
        }
    });

    // Add a new button to the action buttons
    const checkQuestionsButton = document.createElement('button');
    checkQuestionsButton.id = 'checkQuestions';
    checkQuestionsButton.innerHTML = '📊 Check Questions Count';
    checkQuestionsButton.style.background = '#9C27B0';
    checkQuestionsButton.style.color = 'white';
    checkQuestionsButton.onclick = checkAllQuestionsCount;
    actionButtons.appendChild(checkQuestionsButton);
});

async function checkAllQuestionsCount() {
    const users = ['Aryan_Singh', 'Aditya_Singh'];
    const subjects = ['General_Awareness', 'Science', 'Math', 'English'];
    const results = document.createElement('div');
    results.className = 'question-count-report';
    results.innerHTML = `
        <h2 style="color: #FFC107; margin-bottom: 20px;">Questions Count Report</h2>
        <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px;">
    `;

    for (const user of users) {
        results.innerHTML += `<h3 style="color: #4CAF50; margin-top: 15px;">User: ${user}</h3>`;
        for (const subject of subjects) {
            try {
                const response = await fetch(`${BASE_URL}/database/${user}/${subject}.json`);
                if (response.ok) {
                    const data = await response.json();
                    const count = data.questions ? data.questions.length : 0;
                    const status = count === 10 ? '✅' : (count < 10 ? '❌' : '⚠️');
                    const color = count === 10 ? '#4CAF50' : (count < 10 ? '#ff4444' : '#FFC107');
                    results.innerHTML += `
                        <div style="margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                            <span style="color: ${color}">
                                ${status} ${subject}: ${count} questions
                                ${count !== 10 ? `<span style="color: #ff4444"> (Need ${10 - count} more questions)</span>` : ''}
                            </span>
                        </div>
                    `;
                } else {
                    results.innerHTML += `
                        <div style="margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                            <span style="color: #ff4444">❌ ${subject}: No questions file found</span>
                        </div>
                    `;
                }
            } catch (error) {
                results.innerHTML += `
                    <div style="margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                        <span style="color: #ff4444">❌ ${subject}: Error checking questions</span>
                    </div>
                `;
            }
        }
    }

    results.innerHTML += `
        </div>
        <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 5px;">
            <p style="color: #FFC107; margin: 0;">Legend:</p>
            <p style="margin: 5px 0;">✅ - Has exactly 10 questions</p>
            <p style="margin: 5px 0;">❌ - Has less than 10 questions</p>
            <p style="margin: 5px 0;">⚠️ - Has more than 10 questions</p>
        </div>
    `;

    questionDisplay.innerHTML = '';
    questionDisplay.appendChild(results);
} 