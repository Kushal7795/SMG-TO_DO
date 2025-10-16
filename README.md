🧩 SMG-TO_DO: Task Management CRUD API

A simple yet efficient Full Stack Web Application that performs all basic CRUD (Create, Read, Update, Delete) operations for a Task Management system.

Built with Node.js, Express, and MongoDB (Mongoose), this project demonstrates how to build scalable RESTful APIs and connect them with a responsive frontend for efficient, real-world application handling.

🚀 Features

Task CRUD: Create, Read, Update, and Delete task records.

RESTful API architecture.

Interactive and responsive UI (Frontend implementation).

MongoDB database integration (via Mongoose).

Error handling and input validation.

Modular and scalable backend structure.

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript (or ReactJS)
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Version Control: Git & GitHub

⚙️ Installation & Setup

Clone the Repository:

git clone [https://github.com/Kushal7795/SMG-TO_DO.git](https://github.com/Kushal7795/SMG-TO_DO.git)


Navigate to the project directory:

cd SMG-TO_DO


Install dependencies:

npm install


Run the development server:

npm start


Access the app at http://localhost:3000

📂 Project Structure

├── backend
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── controllers/
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md


🧠 How It Works

Frontend sends requests for task management via REST APIs.

Backend handles logic for creating, fetching, updating, or deleting data.

MongoDB stores and retrieves task data securely.

The system ensures seamless CRUD functionality with real-time updates.

🔐 Environment Variables

Create a .env file in the root directory and add:

PORT=3000
MONGO_URI=your_mongodb_connection_string


🧪 Example API Endpoints

Method

Endpoint

Description

GET

/api/tasks

Fetch all tasks

POST

/api/tasks

Create new task

PUT

/api/tasks/:id

Update task by ID

DELETE

/api/tasks/:id

Delete task by ID

💡 Future Enhancements

Add authentication using JWT to protect user-specific tasks.

Implement pagination and search filters for large task lists.

Improve UI with React/Angular or a modern framework like TailwindCSS.

Add cloud database integration (MongoDB Atlas).

👨‍💻 Author

Kushal M
Full Stack Developer | AI & Cloud Enthusiast

📜 License

This project is licensed under the MIT License — feel free to use and modify it.