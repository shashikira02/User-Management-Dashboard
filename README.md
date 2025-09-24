# User Management Dashboard

A modern, responsive user management interface built with React 19 and Tailwind CSS 4.
The app demonstrates viewing, adding, editing, deleting, searching, sorting, filtering, and paginating user records fetched from a mock API (JSONPlaceholder). It focuses on clean architecture, modular components, and a great developer experience.

## Project Data

- Purpose: Provide a simple CRUD experience over a mock backend with real-world table UX (search, sort, filter, pagination).
- Entities: Users with fields like ID, First Name, Last Name, Email, Department.
- Data Source: JSONPlaceholder `/users` endpoint .
- Core UX:
  - Table with sorting (by ID/First/Last/Email/Department)
  - Global search and advanced filter panel
  - Pagination with selectable page sizes (10, 25, 50, 100)
  - Add/Edit via form dialog with client-side validation
  - Delete with confirmation
  - Loading and error states
  - Fully responsive design
- Architecture:
  - React 19 function components with hooks
  - Modular structure (components, hooks, utils) for reusability and clarity
  - Tailwind CSS 4 for utility-first, consistent styling


## Tech Stack

- React 19 (react, react-dom)
- Tailwind CSS 4
- Vite plugin for Tailwind (via @tailwindcss/vite)
- Node.js scripts (npm) for dev/build/preview

## Prerequisites

- Node.js 20+
- npm 10+

Verify versions:
- node -v
- npm -v

  
## Getting Started

1) Clone the repository:
   ```
   git clone https://github.com/shashikira02/User-Management-Dashboard.git
   cd User-Management-Dashboard
   ```

2) Install dependencies:
   ```
   npm install
   ```

3) Start the development server:
    ```
    npm run dev
    ```
Then open the URL from the terminal output (usually http://localhost:5173).










