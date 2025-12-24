# 🧩 ProManage UI — Modern Project & Task Management Dashboard

A fully polished, modern, animated **Project & Task Management UI** built with:

- ⚛️ React (v19)
- ⚡ Vite
- 🔥 Firebase (Auth-less login simulation, Firestore CRUD)
- 🎨 Material UI (Custom styled)
- 📊 Recharts (Analytics)
- ✨ Framer Motion (Animations)
- 🧊 Glassmorphism + Gradients
- 📁 Kanban Board with Drag & Drop

This is a **front-end + Firestore-driven admin panel** with a modern UI suitable for portfolio/demo purposes.

---

## 🚀 Live Features

### ✅ **1. Authentication (Username/Password check)**

- Custom glassmorphic login screen
- Show/Hide password toggle  
- Floating labels  
- Error shake animation  
- Pulsing login button  

### ✅ **2. Dashboard**

- Animated Stat Cards  
- Task Status Pie Chart  
- Weekly Productivity Chart  
- Real-time data sync from Firestore  
- Drag & Drop KanbanBoard connected to Firestore  

### ✅ **3. Projects Page**

- CRUD operations  
- Clean card layout  
- Role-based access (admin only)  

### ✅ **4. Tasks Page**

- Add, update status, delete  
- Smooth UI interactions  
- Same styling consistency  

### ✅ **5. Teams Page**

- Add teams  
- Track number of members per team  

### ✅ **6. User Management (Admin Only)**

- Add users  
- Edit users  
- Delete users  
- Glass UI cards  

### ✅ **7. Light / Dark Mode**

- Custom-designed theme switch  
- Light mode uses a **premium animated background image**  
- Dark mode uses clean deep contrast  

---

## 🛠 Tech Stack

| Layer    | Tools Used |

|--------------|--------------------------------|
| Frontend     | React 19, React Router 7       |
| UI | Material UI (MUI 7), Custom CSS          |
| Animations   | Framer Motion                  |
| Charts       | Recharts                       |
| Database     | Firebase Firestore             |
| Build Tool   | Vite                           |
| Auth         | Custom username/password check |

---

## 📂 Project Structure

promanage-ui/
│── public/
│ └── bg-light.jpeg
│── src/
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── Login.jsx
│ │ ├── Projects.jsx
│ │ ├── Tasks.jsx
│ │ └── Teams.jsx
│ ├── components/
│ │ ├── KanbanBoard.jsx
│ │ ├── StatCard.jsx
│ │ ├── TaskStatusChart.jsx
│ │ └── WeeklyChart.jsx
│ ├── layout/
│ │ └── MainLayout.jsx
│ ├── firebase.js
│ ├── global.css
│ └── App.jsx
└── README.md
