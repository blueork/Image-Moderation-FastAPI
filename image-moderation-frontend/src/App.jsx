// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AdminPage from './pages/AdminPage';
// import UserPage from './pages/UserPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/admin" element={<AdminPage />} />
//         <Route path="/" element={<UserPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminPage from "./pages/AdminPage";
// import UserPage from "./pages/UserPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<UserPage />} />
//         <Route path="/admin" element={<AdminPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminDashboard from "./pages/AdminDashboard";
// import ModerateImage from "./pages/ModerateImage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<ModerateImage />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import { useState } from "react";
// import ImageUploadForm from "./components/User/ImageUploadForm";
// import CreateTokenForm from "./components/Admin/CreateTokenForm";
// import TokenList from "./components/Admin/TokenList";

// function App() {
//   const [activeTab, setActiveTab] = useState("user");

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <nav className="mb-6">
//         <button
//           onClick={() => setActiveTab("user")}
//           className={`mr-4 px-4 py-2 rounded ${
//             activeTab === "user" ? "bg-blue-600 text-white" : "bg-gray-300"
//           }`}
//         >
//           Image Moderation
//         </button>
//         <button
//           onClick={() => setActiveTab("admin")}
//           className={`px-4 py-2 rounded ${
//             activeTab === "admin" ? "bg-blue-600 text-white" : "bg-gray-300"
//           }`}
//         >
//           Admin Panel
//         </button>
//       </nav>

//       {activeTab === "user" && <ImageUploadForm />}

//       {activeTab === "admin" && (
//         <div>
//           <CreateTokenForm />
//           <TokenList />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import ImageUploadForm from "./components/User/ImageUploadForm";
// import AdminPanel from "./components/Admin/AdminPanel";
import AdminTab from "./components/AdminTab";

function App() {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="mb-6">
        <button
          onClick={() => setActiveTab("user")}
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === "user" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
        >
          Image Moderation
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          className={`px-4 py-2 rounded ${
            activeTab === "admin" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
        >
          Admin Panel
        </button>
      </nav>

      {activeTab === "user" && <ImageUploadForm />}

      {activeTab === "admin" && <AdminTab />}
    </div>
  );
}

export default App;
