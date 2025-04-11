# Quiz Application

A web-based quiz application that can be deployed to GitHub Pages.

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment to GitHub Pages

1. Fork this repository
2. Go to your repository settings
3. Under "Pages", select the "gh-pages" branch as the source
4. Update the BASE_URL in admin.js and quiz.js with your GitHub Pages URL
5. Push your changes to the main branch
6. The GitHub Action will automatically deploy your application

## Accessing the Application

- Local: http://localhost:8000
- GitHub Pages: https://your-github-username.github.io/quiz-app

## Features

- Admin panel for managing questions
- User quiz interface
- Mobile-responsive design
- Real-time question updates
- Performance tracking

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Webpack
- GitHub Pages
- GitHub Actions 