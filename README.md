# React + Vite

# Atmosly - SpaceX Mission Explorer

[Live Demo](https://almoslyspacex-3x9cq3vl2-team-ezic0dess-projects.vercel.app/)

## Project Overview

Atmosly is a React-based application that fetches real-time data from the SpaceX public API to explore, filter, and favorite SpaceX launches. The application is optimized for performance and usability, leveraging React hooks, debouncing, memoization, pagination, and clean code practices.

## Features

- **Search and Filter:** Users can search for launches by mission name with an input that uses debounce to optimize API calls.
- **Year Filter:** Select launch year from a dropdown to filter results.
- **Successful Launch Toggle:** Switch to filter and display only successful launches.
- **Pagination:** Displays only 18 launches per page for optimal loading and user experience.
- **Favorites Management:** Users can mark launches as favorites directly on each card. There is also a toggle in the navbar to show only favorite launches.
- **Clean and Modular Code:** Multi-component architecture for code cleanliness and reusability.

## Optimization Techniques

- **Debouncing:** Implemented debouncing on the search input using `lodash.debounce` wrapped in `useMemo` for memorizing to prevent unnecessary re-renders and optimize API requests.
- **Pagination:** Data is paginated to avoid loading the entire dataset at once, improving loading speed and user interaction.
- **Memoization:** Use of React's `useMemo` to memoize expensive functions like the debounced search function.
- **Component Reusability:** Clear separation of components such as LaunchCard, Navbar, Filters, Modal, and Skeleton for better maintainability and scalability.
- **Comments:** Code is well-commented for better understanding and maintainability.

## Project Structure
SPACEX-MISSION-EXPLORERS/
├── public/
├── src/
│ ├── assets/
│ ├── component/
│ │ ├── Filters.jsx
│ │ ├── LaunchCard.jsx
│ │ ├── Modal.jsx
│ │ ├── Navbar.tsx
│ │ ├── Skeleton.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── LaunchDetails.jsx
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── package.json
├── README.md


## Getting Started

### Installation

git clone git@github.com:LokeshWagh/AtmoslyAssignment.git
cd AtmoslyAssignment
npm install
npm start


### Usage

- Use the search box to look up launches by mission names.
- Filter launches by year using the dropdown.
- Toggle "Successful only" to view only successful launches.
- Use the pagination controls to navigate between pages (18 launches per page).
- Click the Favorite button on any launch card to mark or unmark favorites.
- Use the "Show favorites" toggle in the navbar to filter your favorite launches.

## Live Deployment

This project is deployed on Vercel and can be accessed at https://almoslyspacex-3x9cq3vl2-team-ezic0dess-projects.vercel.app/

---

### Contact

Created by Lokesh Wagh
+91 7249659025

