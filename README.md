# Feedback Board App

## Goal
A public feedback board where users can post suggestions or feedback, and other users can upvote them. This application allows for dynamic content filtering, sorting, and searching to enhance user experience.

## Features

### Required Features:
* **Submit Feedback:**
    * A user-friendly form to submit feedback including a title, detailed description, and category.
    * All submissions are stored persistently in a MySQL database.
* **View Feedbacks:**
    * Feedback items are displayed in a responsive list/card format.
    * Each item clearly shows the number of upvotes it has received.
* **Upvote System:**
    * Any user can upvote a feedback item.
    * Implemented a mechanism to prevent multiple upvotes from the same "session" or device using local storage to track voter IDs.
* **Category Filter:**
    * Users can easily filter feedback items by predefined categories (e.g., Bug Report, Feature Request, Improvement, Other).

### Bonus Features Implemented:
* **Sorting:**
    * Ability to sort feedback by "Most Upvoted" and "Most Recent".
* **Responsive Layout:**
    * The application's layout adjusts gracefully to different screen sizes, from mobile devices to desktops.
    * The header is fixed at the top for consistent navigation.
* **Search Bar:**
    * Users can search for feedback items by keywords present in their title or description.

## Tech Stack

* **Frontend:**
    * React.js
    * Tailwind CSS (for styling)
    * Axios (for API requests)
* **Backend:**
    * Node.js
    * Express.js
    * `dotenv` (for environment variables)
    * `cors` (for Cross-Origin Resource Sharing)
    * `mysql2/promise` (MySQL client for Node.js)
* **Database:**
    * MySQL

## Installation & Setup

Follow these steps to get the Feedback Board App running on your local machine.

### Prerequisites

* Node.js (LTS version recommended)
* npm (comes with Node.js) or Yarn
* MySQL Server (e.g., XAMPP, Docker, or a direct installation)

### 1. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Create a `.env` file:**
    In the `backend` directory, create a file named `.env` and add your MySQL database credentials:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_root_password # IMPORTANT: Change this to your actual MySQL root password
    DB_NAME=feedback_board
    PORT=5000
    ```
    *Replace `your_mysql_root_password` with your actual MySQL root password.*

4.  **Database Setup (MySQL):**
    * Access your MySQL server (e.g., via MySQL Workbench, phpMyAdmin, or the command line).
    * Create a new database named `feedback_board`:
        ```sql
        CREATE DATABASE feedback_board;
        ```
    * Switch to the new database:
        ```sql
        USE feedback_board;
        ```
    * Create the `feedback` table:
        ```sql
        CREATE TABLE feedback (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            category VARCHAR(50) NOT NULL,
            upvotes INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        ```
    * Create the `upvotes_log` table to prevent multiple votes from the same user/device:
        ```sql
        CREATE TABLE upvotes_log (
            id INT AUTO_INCREMENT PRIMARY KEY,
            feedback_id INT NOT NULL,
            voter_identifier VARCHAR(255) NOT NULL, -- A unique ID generated client-side (e.g., stored in localStorage)
            upvoted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(feedback_id, voter_identifier), -- Ensures a unique upvote per feedback item per voter
            FOREIGN KEY (feedback_id) REFERENCES feedback(id) ON DELETE CASCADE
        );
        ```

5.  **Start the backend server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The backend server will run on `http://localhost:5000` (or the `PORT` specified in your `.env` file).

### 2. Frontend Setup

1.  **Navigate to the frontend directory:**
    Assuming your React app is in the root or a `frontend` folder from the main project directory. If the React app code provided is in the root, you can skip `cd frontend`.
    ```bash
    cd .. # Go back to the root if you were in 'backend'
    # If your React app is in a 'frontend' folder:
    # cd frontend
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the frontend development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    This will usually open the application in your browser at `http://localhost:3000`.

## Usage

1.  **View Feedbacks:** Upon opening the application, you will see a list of existing feedback items.
2.  **Submit Feedback:** Click the "Add Feedback" button in the header to open a modal form. Fill in the title, description, and select a category, then click "Submit Feedback".
3.  **Upvote:** Click the "Upvote" button on any feedback item to increase its vote count. You can upvote each item only once per device/session.
4.  **Filter by Category:** Use the category buttons above the feedback list (All, Bug, Feature, Improvement, Other) to filter items.
5.  **Sort:** Use the "Most Upvoted" or "Most Recent" buttons to change the order of displayed feedback.
6.  **Search:** Use the search bar to find feedback items by keywords in their title or description.

---