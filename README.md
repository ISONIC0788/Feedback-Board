
# Feedback Board App

## Goal
A public feedback board where users can post suggestions or feedback, and other users can upvote them. This application allows for dynamic content filtering, sorting, and searching to enhance user experience.

## Features

### Required Features:
* **Submit Feedback:**
    * A user-friendly form to submit feedback including a title, detailed description, and category.
    * All submissions are stored persistently in a **MongoDB database**.
* **View Feedbacks:**
    * Feedback items are displayed in a responsive list/card format.
    * Each item clearly shows the number of upvotes it has received.
* **Upvote System:**
    * Any user can upvote a feedback item.
    * Implemented a mechanism to prevent multiple upvotes from the same "session" or device using local storage to track voter IDs.

### Bonus Features Implemented:
* **Sorting:**
    * Ability to sort feedback by "Most Upvoted" and "Most Recent".
* **Responsive Layout:**
    * The application's layout adjusts gracefully to different screen sizes, from mobile devices to desktops.
    * The header is fixed at the top for consistent navigation.

*(Note: Category Filter and Search Bar features were removed from the `FeedbackList.js` in our previous edits, but I'll keep them in the `README` as "Bonus Features" if you intend to re-implement them later. If not, you might want to remove them here too.)*

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
    * **Mongoose** (MongoDB object modeling for Node.js)
* **Database:**
    * **MongoDB Atlas (cloud-hosted MongoDB)**

## Installation & Setup

Follow these steps to get the Feedback Board App running on your local machine.

### Prerequisites

* Node.js (LTS version recommended)
* npm (comes with Node.js) or Yarn
* **A MongoDB Atlas account (free tier is sufficient)**

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

3.  **MongoDB Atlas Setup:**
    * **Create a Cluster:** Go to [cloud.mongodb.com](https://cloud.mongodb.com/), log in, and create a new free-tier cluster.
    * **Create a Database User:** In your Atlas project, navigate to "Database Access" under "Security" and add a new database user. Remember the username and password (e.g., `feedback_board` for username, and a strong password).
    * **Configure Network Access:** In "Network Access" under "Security," add your current IP address (or allow access from anywhere `0.0.0.0/0` for development, though less secure).
    * **Get Connection String:** Go to your cluster overview, click "Connect", choose "Connect your application", select "Node.js" and a recent version, then **copy the provided connection string**.

4.  **Create a `.env` file:**
    In the `backend` directory, create a file named `.env` and add your MongoDB Atlas connection string and port:
    ```env
    MONGODB_URI="mongodb+srv://feedback_board:YOUR_ATLAS_PASSWORD@cluster0.qhbugok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    PORT=5000
    ```
    * **IMPORTANT:** Replace `YOUR_ATLAS_PASSWORD` with the actual password for your MongoDB Atlas user. Ensure the rest of the URI matches exactly what you copied from Atlas.

5.  **Start the backend server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The backend server will run on `http://localhost:5000` (or the `PORT` specified in your `.env` file). You should see `MongoDB Connected: <your_atlas_host>` in your terminal.

### 2. Frontend Setup

1.  **Navigate to the frontend directory:**
    *(Assuming your React app is in a `frontend` folder from the main project directory. If your React app code is in the root, you can skip `cd frontend`.)*
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
    This will usually open the application in your browser at `http://localhost:5173`.

## Usage

1.  **View Feedbacks:** Upon opening the application, you will see a list of existing feedback items.
2.  **Submit Feedback:** Click the "Add Feedback" button (if available) to open a form. Fill in the details and submit.
3.  **Upvote:** Click the "Upvote" button on any feedback item to increase its vote count. You can upvote each item only once per device/session.
4.  **Sort:** Use the "Most Upvoted" or "Most Recent" buttons to change the order of displayed feedback.

---