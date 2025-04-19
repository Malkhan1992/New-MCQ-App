const fs = require('fs');
const path = require('path');

// Files to keep
const essentialFiles = [
  'admin.js',
  'admin.html',
  'quiz.js',
  'quiz.html',
  'index.html',
  'styles.css',
  'login.html',
  'subjects.html',
  'result.html',
  'database', // Keep the database directory
  'images',   // Keep images directory
  'medals',   // Keep medals directory
  'mindimage.png',
  'README.md'
];

// Files to remove
const filesToRemove = [
  'webpack.config.js',
  'package-lock.json',
  'server.js',
  'server.py',
  'fix_question_pool.js',
  'story.html',
  'success-story.html',
  'script.js'
];

// Directories to remove
const dirsToRemove = [
  'node_modules',
  'src',
  'dist',
  '.github'
];

console.log('Cleaning up unnecessary files...');

// Remove individual files
filesToRemove.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`Deleted: ${file}`);
    } else {
      console.log(`File not found: ${file}`);
    }
  } catch (err) {
    console.error(`Error deleting ${file}: ${err.message}`);
  }
});

// Function to recursively remove directories
function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recurse
        removeDirectory(curPath);
      } else {
        // Delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
    console.log(`Deleted directory: ${dirPath}`);
  } else {
    console.log(`Directory not found: ${dirPath}`);
  }
}

// Remove directories
dirsToRemove.forEach(dir => {
  try {
    removeDirectory(dir);
  } catch (err) {
    console.error(`Error deleting ${dir}: ${err.message}`);
  }
});

console.log('\nCleanup completed!');
console.log('\nRemaining essential files:');
essentialFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`- ${file}`);
  } else {
    console.log(`- ${file} (missing)`);
  }
});

console.log('\nYour application should now contain only the necessary files for direct browser usage.');
console.log('To run the application, simply open index.html in your browser.'); 