# MiraiEdge Admin Dashboard

## Architecture Overview

This project is a modern React admin dashboard built with Vite and Tailwind CSS. It features a modular, scalable architecture using React Context for state management, and leverages several best practices for maintainability and performance.

### Key Architectural Elements

- **Component-Based Structure:**

  - All UI elements are organized as reusable components in `src/components` (e.g., Header, Sidebar, PostCard, SearchBar).
  - Route-level views are in `src/pages` (e.g., Dashboard, Users, Reports, Account, SearchResult).

- **Routing & Layout:**

  - Uses `react-router-dom` for client-side routing.
  - A main `Layout` component provides a consistent header, sidebar, and mobile navigation across all protected routes.
  - **Mobile Navigation:** Optimized mobile navigation with a collapsible sidebar and bottom navigation bar for seamless access on smaller screens.

- **State Management:**

  - Global state is managed using React Context (`src/context`).
    - `AuthContext` for authentication (with Firebase Google sign-in)
    - `DashboardContext` for posts and dashboard data
    - `UsersContext` for user data
    - `SearchContext` for search queries and results

- **Authentication:**

  - Firebase authentication is integrated for secure login/logout.
  - Protected routes redirect unauthenticated users to the login page.

- **Data Fetching:**

  - Posts are fetched from `https://dummyjson.com/posts` and users from `https://randomuser.me/api`.
  - Images are dynamically assigned and preloaded for performance.
  - **Notifications:** Real-time notification system for user alerts and updates.
  - **Users & Posts Management:** Dedicated modules for managing users and posts, including CRUD operations and moderation tools.
  - **Data Analytics:** Dashboard features analytics widgets and charts for visualizing user activity, post engagement, and other key metrics.

- **Styling & Theming:**

  - Tailwind CSS is used for utility-first, responsive styling.
  - Supports dark mode, toggled via the header.

- **Error Handling:**
  - An `ErrorBoundary` component catches and displays UI errors gracefully.

### Techniques Used

- **React Context API** for scalable, global state management.
- **React Router** for nested, protected routing.
- **Firebase Auth** for secure authentication.
- **API Integration** for dynamic data (posts, users).
- **Tailwind CSS** for rapid, consistent styling and dark mode support.
- **Component composition** for reusability and maintainability.
- **Debounced search** and suggestion dropdowns for UX.
- **Responsive design** for desktop and mobile navigation.
- **Mobile navigation** with adaptive UI components for touch devices.
- **Notification system** for real-time user alerts and updates.
- **User & post management** with moderation features.
- **Data analytics** and visualization for actionable insights.

---

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/deepak-101-dev/MiraIEdgeFE.git
   cd admin-dashboard
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

4. **Build for production:**

   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Preview the production build:**

   ```bash
   npm run preview
   # or
   yarn preview
   ```

6. **Lint the codebase:**
   ```bash
   npm run lint
   # or
   yarn lint
   ```
