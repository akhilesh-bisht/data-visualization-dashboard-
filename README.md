# 📊 MERN Data Visualization Dashboard

An interactive and responsive full-stack dashboard application built with the **MERN stack** (MongoDB, Express, React, Node.js). It features a modern UI, real-time data filtering, and dynamic charts (Bar, Pie, Line) to visualize complex data in a clean and actionable format.

## 🚀 Live Demo

- **Frontend (Vercel)**: [data-visualization-dashboard-mauve.vercel.app](https://data-visualization-dashboard-mauve.vercel.app/)
- **Backend API (Render)**: [data-visualization-dashboard-29c2.onrender.com](https://data-visualization-dashboard-29c2.onrender.com/)

---

## 🔧 Tech Stack

### 🌐 Frontend (React)
- React + Vite
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide Icons
- Axios for API requests

### 🌍 Backend (Node + Express)
- Node.js
- Express.js
- MongoDB + Mongoose for data modeling
- CORS & dotenv for secure config

---

## 📁 Project Structure

root/
├── client/ # React frontend
│ ├── src/
│ └── ...
├── server/ # Node.js + Express backend
│ ├── models/
│ ├── routes/
│ └── server.js
├── .env
└── README.md

yaml
Copy
Edit

---

## 📦 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/mern-dashboard.git
cd mern-dashboard
2. Setup Backend (Express + MongoDB)
bash
Copy
Edit
cd server
npm install
🔐 Create .env file
bash
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
▶️ Run the Backend
bash
Copy
Edit
npm start
API will be available at: http://localhost:5000/api/data

3. Setup Frontend (React + Tailwind)
bash
Copy
Edit
cd client
npm install
🧩 Configure API Endpoint
In client/src/services/api.js, update the base URL if needed:

js
Copy
Edit
const BASE_URL = "http://localhost:5000/api";
▶️ Run the Frontend
bash
Copy
Edit
npm run dev
Frontend runs at: http://localhost:5173

🧠 Features
📈 Bar, Pie, and Line charts with Recharts

📊 Advanced filtering via sidebar (Topic, Sector, Region, etc.)

📋 Paginated DataTable

🔄 Retry on backend failure

🌓 Sidebar toggle (open/close)

⚡ Fast, responsive UI with Tailwind

🌐 Deployment
Frontend
Deployed on Vercel:
➡️ https://data-visualization-dashboard-mauve.vercel.app

Backend
Deployed on Render:
➡️ https://data-visualization-dashboard-29c2.onrender.com

📄 API Routes
Method	Endpoint	Description
GET	/api/data	Fetch all dashboard records

📸 Screenshots
Add screenshots of the dashboard UI, filters, and chart sections here.

✍️ Author
Akhilesh Bisht
🌐 akhileshbisht.netlify.app
📧 akhileshbisht2020@gmail.com


📄 License
This project is licensed under the MIT License.
