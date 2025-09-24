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




# Challenges Faced

Challenges Faced While Building the React + Tailwind CRUD App with table features (search, sort, filter, pagination), and how each was addressed.

## Data & API

- **Parsing user data into the right format**  
  The API provides a single `name` and nested `company.name`, but I needed separate fields like first name, last name, email, and department. I wrote a `parseName()` function and a transformer to map `company.name` to `department`.

- **Fake mutations caused confusion**  
  POST, PUT, and DELETE requests succeed but don’t persist. This was confusing during reloads.

- **Avoiding ID conflicts for new users**  
  Since the server doesn’t assign new IDs, I had to prevent clashes. I used client-side incremental IDs and reconciled them properly during refetching.

## Sorting, Filtering, Pagination

- **Getting the order of operations right**  
  Combining filters and pagination was causing unexpected behavior. The fix was to apply operations in the correct sequence: first filter the data, then sort it, and finally paginate. I also made sure to reset the page to 1 whenever filters or search terms changed to avoid showing empty pages.

- **Case-insensitive matching**  
  Search and filters weren’t working consistently due to case mismatches and mixed data types. I created a small utility to safely lowercase values and coerce non-string fields, which made matching more reliable.

- **Sorting mixed data types**  
  Sorting fields like numeric IDs and strings together led to incorrect results. I implemented field aware comparators and used stable sorting to keep the user experience predictable and clean.

## Forms & Validation
 
- **Reusing the form for Add and Edit**  
  I wanted one form component to handle both adding and editing users without duplicating code. To do this, I separated the form state from the submit logic and used a single dialog that could accept initial values when editing.

- **Client-side validation with clear feedback**  
  Validating required fields and formats needed to be user-friendly. I centralized all validation rules in `UserForm.jsx` and used controlled inputs with helper text to show errors inline.

- **Preventing accidental deletes**  
  To avoid losing data by mistake, I added a confirmation step before deleting a user. This made the action intentional and safer for users.

## UI/UX & Responsiveness

- **Making the table mobile-friendly**  
  Keeping the table readable on smaller screens was tough. I used Tailwind’s responsive utilities, added horizontal scrolling for narrow layouts, and condensed columns to fit better on mobile viewports.

- **Communicating simulated API behavior**  
  Since the API didn’t persist changes. I added clear alert banners to explain network issues and simulated behavior, making the experience more transparent.

- **Improving action discoverability**  
  Actions like Add, Edit, Delete, and Filter. I moved them into a consistent toolbar and paired each with familiar icons and labels to make them more intuitive.


---






