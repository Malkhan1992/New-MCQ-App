document.addEventListener('DOMContentLoaded', () => {
    const userSelect = document.getElementById('userSelect');
    const subjectSelect = document.getElementById('subjectSelect');
    const viewBtn = document.getElementById('viewQuestions');
    const refreshBtn = document.getElementById('refreshQuestions');
    const addBtn = document.getElementById('addQuestion');
    const questionDisplay = document.getElementById('questionDisplay');
    const addQuestionForm = document.getElementById('addQuestionForm');

    // Use localStorage instead of server
    let allAvailableQuestions = [];
    let previouslySelectedQuestions = new Set();

    // Function to format subject name for storage
    function formatSubjectName(subject) {
        return subject.replace(/\s+/g, '_');
    }

    // Function to format user name for storage
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

    // Function to load and display all questions
    async function loadQuestions() {
        const user = userSelect.value;
        const subject = subjectSelect.value;
        
        if (!user || !subject) {
            showError('Please select both user and subject');
            return;
        }

        showLoading();
        
        try {
            const formattedUser = formatUserName(user);
            const formattedSubject = formatSubjectName(subject);
            
            // Get questions from localStorage
            const storageKey = `quiz_${formattedUser}_${formattedSubject}`;
            const storedData = localStorage.getItem(storageKey);
            
            if (!storedData) {
                throw new Error('No questions found for this subject. Please add some questions first.');
            }
            
            const data = JSON.parse(storedData);
            const questions = data.questions || [];
            
            if (questions.length === 0) {
                throw new Error('No questions found for this subject');
            }
            
            // Store all questions globally
            allAvailableQuestions = questions;
            previouslySelectedQuestions.clear();
            
            // Display all questions
            let html = `
                <div class="questions-header">
                    <h2>All Available Questions</h2>
                    <p>Showing all ${questions.length} questions in the database</p>
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
                        <p class="explanation"><strong>Explanation: </strong>${q.explanation || 'No explanation provided.'}</p>
                    </div>
                `;
            });
            html += '</div>';
            
            questionDisplay.innerHTML = html;
            
            // Add success message
            const successDiv = document.createElement('div');
            successDiv.className = 'success';
            successDiv.textContent = `Viewing all ${questions.length} available questions`;
            questionDisplay.insertBefore(successDiv, questionDisplay.firstChild);
            
        } catch (error) {
            console.error('Error loading questions:', error);
            showError(`Error loading questions: ${error.message}`);
        }
    }

    // Function to refresh and get 10 questions
    async function refreshQuestions() {
        const user = userSelect.value;
        const subject = subjectSelect.value;
        
        if (!user || !subject) {
            showError('Please select both user and subject');
            return;
        }

        if (allAvailableQuestions.length === 0) {
            showError('Please view all questions first');
            return;
        }

        showLoading();
        
        try {
            // Get available questions that weren't selected before
            const availableQuestions = allAvailableQuestions.filter((_, index) => 
                !previouslySelectedQuestions.has(index)
            );

            let selectedQuestions = [];
            
            if (availableQuestions.length >= 10) {
                // If we have enough new questions, select 10 random ones
                const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
                selectedQuestions = shuffled.slice(0, 10);
                
                // Add their indices to previously selected
                allAvailableQuestions.forEach((q, index) => {
                    if (selectedQuestions.includes(q)) {
                        previouslySelectedQuestions.add(index);
                    }
                });
            } else {
                // If we don't have enough new questions, reset the selection and pick random 10
                previouslySelectedQuestions.clear();
                const shuffled = [...allAvailableQuestions].sort(() => 0.5 - Math.random());
                selectedQuestions = shuffled.slice(0, 10);
            }

            // Display the selected questions with new serial numbers (1-10)
            let html = `
                <div class="questions-header">
                    <h2>Selected Quiz Questions</h2>
                    <p>These 10 questions have been selected. Review them and click "Confirm" to save for the quiz.</p>
                </div>
                <div class="question-list">
            `;
            
            selectedQuestions.forEach((q, index) => {
                html += `
                    <div class="question-item">
                        <h3>Question ${index + 1}</h3>
                        <p class="question-text"><strong>Q: </strong>${q.question}</p>
                        <p class="options-label"><strong>Options:</strong></p>
                        <ul class="options-list">
                            ${q.options.map((opt, i) => `<li>${String.fromCharCode(65 + i)}. ${opt}</li>`).join('')}
                        </ul>
                        <p class="answer"><strong>Correct Answer: </strong>${q.answer}</p>
                        <p class="explanation"><strong>Explanation: </strong>${q.explanation || 'No explanation provided.'}</p>
                    </div>
                `;
            });
            
            html += `
                </div>
                <div class="confirm-button-container">
                    <p class="info-text">Please review these 10 questions. You can get a new set or confirm these questions for the quiz.</p>
                    <div class="button-group">
                        <button id="refreshAgain" class="refresh-button">
                            Get New Set
                        </button>
                        <button id="confirmQuestions" class="confirm-button">
                            Confirm & Save These Questions
                        </button>
                    </div>
                </div>
            `;
            
            questionDisplay.innerHTML = html;
            
            // Store current selection for saving
            window.currentRefreshedQuestions = selectedQuestions;
            
            // Add event listeners to the new buttons
            document.getElementById('confirmQuestions').addEventListener('click', () => {
                if (confirm('Are you sure you want to save these 10 questions for the quiz? This will replace any existing questions.')) {
                    confirmQuestions(selectedQuestions);
                }
            });
            document.getElementById('refreshAgain').addEventListener('click', refreshQuestions);
            
        } catch (error) {
            console.error('Error refreshing questions:', error);
            showError(`Error refreshing questions: ${error.message}`);
        }
    }

    // Function to confirm and save questions
    async function confirmQuestions(questions) {
        const user = userSelect.value;
        const subject = subjectSelect.value;

        try {
            const formattedUser = formatUserName(user);
            const formattedSubject = formatSubjectName(subject);
            
            showLoading();

            // Format questions with new serial numbers 1-10
            const formattedQuestions = questions.map((q, index) => ({
                id: index + 1,
                question: q.question,
                options: q.options,
                answer: q.answer,
                explanation: q.explanation || '',
                selected: false,
                timeSpent: 0
            }));
            
            // Save to localStorage
            const storageKey = `quiz_${formattedUser}_${formattedSubject}`;
            localStorage.setItem(storageKey, JSON.stringify({ 
                questions: formattedQuestions,
                totalQuestions: formattedQuestions.length,
                subject: subject,
                user: user,
                lastUpdated: new Date().toISOString()
            }));
            
            const successMessage = `Successfully saved 10 questions to ${user}'s ${subject} quiz!`;
            
            // Display the saved questions
            let html = `
                <div class="questions-header">
                    <h2>Questions Saved Successfully</h2>
                    <p>These 10 questions have been saved and will appear in the quiz in this order.</p>
                </div>
                <div class="question-list">
            `;
            
            formattedQuestions.forEach((q) => {
                html += `
                    <div class="question-item">
                        <h3>Question ${q.id}</h3>
                        <p class="question-text"><strong>Q: </strong>${q.question}</p>
                        <p class="options-label"><strong>Options:</strong></p>
                        <ul class="options-list">
                            ${q.options.map((opt, i) => `<li>${String.fromCharCode(65 + i)}. ${opt}</li>`).join('')}
                        </ul>
                        <p class="answer"><strong>Correct Answer: </strong>${q.answer}</p>
                        <p class="explanation"><strong>Explanation: </strong>${q.explanation || 'No explanation provided.'}</p>
                    </div>
                `;
            });
            html += '</div>';
            
            questionDisplay.innerHTML = html;
            
            // Add success message
            const successDiv = document.createElement('div');
            successDiv.className = 'success';
            successDiv.textContent = successMessage;
            questionDisplay.insertBefore(successDiv, questionDisplay.firstChild);
            
            // Clear the current selection
            window.currentRefreshedQuestions = null;
            previouslySelectedQuestions.clear();
        } catch (error) {
            console.error('Error saving questions:', error);
            showError(`Error saving questions: ${error.message}`);
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
            explanation: formData.get('explanation')
        };

        try {
            const user = userSelect.value;
            const subject = subjectSelect.value;
            
            if (!user || !subject) {
                throw new Error('Please select both user and subject');
            }
            
            // Format names for storage
            const formattedUser = formatUserName(user);
            const formattedSubject = formatSubjectName(subject);
            
            // Get existing questions from localStorage
            const storageKey = `quiz_${formattedUser}_${formattedSubject}`;
            let existingQuestions = [];
            const storedData = localStorage.getItem(storageKey);
            if (storedData) {
                const data = JSON.parse(storedData);
                existingQuestions = data.questions || [];
            }
            
            // Add new question
            existingQuestions.push(newQuestion);
            
            // Save to localStorage
            localStorage.setItem(storageKey, JSON.stringify({ 
                questions: existingQuestions,
                totalQuestions: existingQuestions.length,
                subject: subject,
                user: user,
                lastUpdated: new Date().toISOString()
            }));
            
            showSuccess('Question added successfully!');
            addQuestionForm.reset();
            addQuestionForm.style.display = 'none';
        } catch (error) {
            console.error('Error adding question:', error);
            showError(`Error adding question: ${error.message}`);
        }
    });
}); 