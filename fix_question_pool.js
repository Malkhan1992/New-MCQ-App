// Function to fix the question pool structure
async function fixQuestionPool() {
    const BASE_URL = 'http://localhost:8000';
    
    try {
        // Read the current question pool
        const response = await fetch(`${BASE_URL}/database/admin/question_pool.json`);
        const data = await response.json();
        
        // Create a new structure without difficulty levels
        const fixedData = {};
        
        // Process each subject
        for (const subject in data) {
            if (typeof data[subject] === 'object' && data[subject] !== null) {
                fixedData[subject] = [];
                // If the subject has difficulty levels
                if (data[subject].easy || data[subject].medium || data[subject].hard || data[subject].expert) {
                    for (const difficulty in data[subject]) {
                        const questions = data[subject][difficulty];
                        if (Array.isArray(questions)) {
                            // Add questions without the difficulty property
                            questions.forEach(q => {
                                if (q.question) { // Only add valid questions
                                    const { difficulty: _, ...questionWithoutDifficulty } = q;
                                    fixedData[subject].push(questionWithoutDifficulty);
                                }
                            });
                        }
                    }
                } else if (Array.isArray(data[subject])) {
                    // If the subject is already an array of questions
                    fixedData[subject] = data[subject].filter(q => q.question);
                }
            }
        }
        
        // Save the fixed data back to the file
        const saveResponse = await fetch(`${BASE_URL}/save-file`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                path: 'database/admin/question_pool.json',
                content: JSON.stringify(fixedData, null, 2)
            })
        });
        
        if (!saveResponse.ok) {
            throw new Error(`Failed to save fixed question pool: ${saveResponse.status}`);
        }
        
        console.log('Successfully fixed question_pool.json');
        return fixedData;
    } catch (error) {
        console.error('Error fixing question pool:', error);
        throw error;
    }
}

// Run the fix
fixQuestionPool().then(fixedData => {
    console.log('Fixed data structure:', fixedData);
}).catch(error => {
    console.error('Failed to fix question pool:', error);
}); 