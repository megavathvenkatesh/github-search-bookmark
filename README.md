GitHub Repository Search and Bookmark App

This project is a small React and TypeScript web application that allows users to search and bookmark GitHub repositories. It was developed as part of the Frontend Intern assignment for Powerplay, focusing on building a production-ready, performant, and maintainable frontend app under real-world constraints.

Overview

The application uses GitHub’s public Search API to fetch repository data based on user queries. It supports live searching with debounce, bookmarking repositories with persistence using localStorage, and filtering between all and bookmarked repositories. The UI is designed with TailwindCSS for a clean, responsive, and modern appearance.

Features

Search GitHub repositories with a debounced API call (350ms)

Display top 30 results with repository details

Bookmark repositories and persist them using localStorage

Toggle between all repositories and bookmarked only

Responsive, minimal design built with TailwindCSS

Handles loading, empty, and error states gracefully

Optimized with React.memo, useCallback, and useMemo to prevent unnecessary re-renders

Tech Stack

React
TypeScript
TailwindCSS
Vite
ESLint and Prettier for linting and formatting

Installation

Clone the repository
git clone https://github.com/megavathvenkatesh/github-search-bookmark.git

cd github-search-bookmark

Install dependencies
npm install

Run the development server
npm run dev

Build for production
npm run build
npm run preview

Testing

The app has been manually tested for:

Search functionality using valid and invalid queries

Debounced API calls to prevent overfetching

Bookmark persistence after page reload

“Bookmarked only” filter toggle

Handling of empty, loading, and error states

Design Decisions and Trade-offs

Debounced API calls were implemented to optimize performance and reduce API requests.

React Context was used to manage the bookmark state, ensuring global access and simplicity without external state libraries.

localStorage was chosen for persistence because it is lightweight and avoids backend dependencies.

TailwindCSS was selected to enable fast UI development and maintain a consistent design system.

The scope was intentionally kept minimal (no pagination, authentication, or advanced search) to focus on the core requirements.

The app prioritizes readability, performance, and maintainability over pixel-perfect design.

Possible Next Steps

Add pagination for large result sets

Introduce GitHub authentication to bypass API rate limits

Write automated tests using Jest and React Testing Library

Implement dark mode and additional theming options

Add sorting or filtering by language and stars

Improve accessibility and keyboard navigation support

Deployment

The app is deployed on Vercel for easy access and live demonstration.
Live Demo: https://github-search-bookmark-p7tr.vercel.app/
