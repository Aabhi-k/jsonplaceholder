# JSONPlaceholder API Integration Project

## Live Demo
[View the live demo here](https://jsonplaceholder-xi.vercel.app/)

## Overview
This project is a React application that integrates with the JSONPlaceholder API to display, create, and interact with post data. Built with React and Vite, it features a responsive user interface with pagination, a post creation form, and interactive elements with smooth animations.

## Features
- **Post Browsing**: View posts from the JSONPlaceholder API in a responsive grid layout
- **Pagination**: Navigate through posts with an adaptive pagination system that adjusts to screen size
  - Mobile-optimized pagination with centered current page
  - Full pagination on desktop devices
- **Post Creation**: Create new posts using the integrated form with validation
- **Toast Notifications**: Receive feedback on actions like successful post creation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Glass Morphism UI**: Modern UI design with glass-like effects




## Technologies Used
- React 18
- Vite
- CSS3 with responsive design
- JSONPlaceholder API
- Vercel for deployment

## Screenshots
<!-- Add screenshots here if available -->
  ![image](https://github.com/user-attachments/assets/5420a791-8e2e-48b0-92ed-b9b9ee3af106)
  ![image](https://github.com/user-attachments/assets/0eb602c8-02a4-433d-ba45-1aa87781ce20)


## Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn package manager

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aabhi-k/jsonplace.git
   cd jsonplace
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173/`

### Building for Production
1. Create a production build:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Preview the production build locally:
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## Project Structure
```
jsonplace/
│
├── public/               # Public assets
├── src/
│   ├── components/
│   │   ├── Api/          # API service functions
│   │   ├── Form/         # Form components
│   │   └── Home/         # Main page components
│   ├── assets/           # Static assets like images
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Entry point
└── index.html            # HTML template
```

## Deployment
This project is deployed on Vercel. You can view it live at [https://jsonplaceholder-xi.vercel.app/](https://jsonplaceholder-xi.vercel.app/)
