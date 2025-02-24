import React, { useState, useEffect } from 'react';
import './style.css';

// Custom Hooks for Managing Tasks & Team Members
function useTasks() {
  const [tasks, setTasks] = useState({
    socialMedia: [
      "📌 Instagram Post - New Product Launch",
      "📌 Twitter Poll - Audience Engagement",
    ],
    blogPosts: [
      "📝 Draft: 'Top 10 Marketing Strategies in 2025'",
      "✅ Published: 'SEO Best Practices for 2024'",
    ],
  });

  const removeTask = (category, index) => {
    const updatedTasks = [...tasks[category]];
    updatedTasks.splice(index, 1);
    setTasks({ ...tasks, [category]: updatedTasks });
  };

  return { tasks, setTasks, removeTask };
}

function useTeamMembers() {
  const [members, setMembers] = useState([
    { name: "Johanz Abhie", role: "Writer" },
    { name: "Marc Franco", role: "Designer" },
  ]);
  const [newMember, setNewMember] = useState("");

  const addMember = () => {
    if (newMember.trim() !== "") {
      setMembers([...members, { name: newMember, role: "New Member" }]);
      setNewMember("");
    }
  };

  const removeMember = (name) => {
    setMembers(members.filter((member) => member.name !== name));
  };

  return { members, newMember, setNewMember, addMember, removeMember };
}
//DITO LALAGAY HOMEPAGE DEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLDDDDDDDDDDDDDDDDDDDDDSSSSSSSSSSSSSSSSSSSSSSSSSSSS
function HomePage() {
  return (
    <div>
      <div className="content1">
        <div className="words1">
          <h1>Speed up your progress by working in efficient way</h1>
          <p>
            See your projects from every angle with Board, Timeline, Table, Calendar, Dashboard, Map and Workspace views that will bring a fresh perspective to the task at hand.
          </p>
        </div>
      </div>

      <div className="content2">
        <div className="words1">
          <h1>Speed up your progress by working in efficient way</h1>
          <p>
            See your projects from every angle with Board, Timeline, Table, Calendar, Dashboard, Map and Workspace views that will bring a fresh perspective to the task at hand.
          </p>
        </div>
      </div>
    </div>
  );
  }
// ✨ Workspace Component
function Workspace() {
  const { tasks, removeTask } = useTasks();
  const { members, newMember, setNewMember, addMember, removeMember } = useTeamMembers();
  const [showTasks, setShowTasks] = useState(true);
  const [showTeam, setShowTeam] = useState(true);

  return (
    <div className="Workspace">
      <div className="sidebarWorkspace p-4 w-64 bg-gray-800 text-white h-full flex flex-col">
        <h2 className="text-lg font-bold">📢 Workspace</h2>

        <div className="tasks mt-4">
          <button className="w-full text-left font-semibold" onClick={() => setShowTasks(!showTasks)}>
            📌 Tasks {showTasks ? "▼" : "▶"}
          </button>
          {showTasks && (
            <div className="pl-2 mt-2">
              {Object.keys(tasks).map((category) => (
                <div key={category} className="mb-2">
                  <h4 className="font-semibold">{category}</h4>
                  <ul className="ml-2">
                    {tasks[category].map((task, index) => (
                      <li key={index} className="flex justify-between items-center">
                        {task}
                        <button className="text-red-500" onClick={() => removeTask(category, index)}>❌</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="team mt-4">
          <button className="w-full text-left font-semibold" onClick={() => setShowTeam(!showTeam)}>
            👥 Team Members {showTeam ? "▼" : "▶"}
          </button>
          {showTeam && (
            <div className="pl-2 mt-2">
              <ul>
                {members.map((member, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {member.name} ({member.role})
                    <button className="text-red-500" onClick={() => removeMember(member.name)}>❌</button>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Add new member"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  className="p-1 text-black w-full rounded"
                />
                <button className="bg-green-500 px-2 py-1 rounded" onClick={addMember}>➕</button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="WorkspaceContent">
        {/* Main workspace content goes here */}
      </div>
    </div>
  
  );
}

// 🌟 Main App Component
function App() {
  const [view, setView] = useState("home");
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then((data) => setData(data.message))
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="App">
        <h1>{error ? error : data}</h1>
        <nav className={`navbar ${scrolling ? "scrolled" : ""}`}>
          <div className="logo">
            <img src="./img/final_logo.png" alt="Logo" />
          </div>
          <ul>
            <li><a href="#" onClick={() => setView("home")}>Home</a></li>
            <li><a href="#" onClick={() => setView("workspace")}>Workspace</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Plans</a></li>
          </ul>
          <div className="login">
            <button className="btn" onClick={() => togglePopup()}>Login</button>
          </div>
        </nav>
      </div>

      {/* Dynamic View Rendering */}
      {view === "home" && <HomePage />}
      {view === "workspace" && <Workspace />}

      <div className="popup" id="loginPopup">
        <div className="popup-content">
          <span className="close-btn" onClick={() => togglePopup()}>&times;</span>
          <h2>Login</h2>
          <input type="email" placeholder="Enter your email" />
          <input type="password" placeholder="Enter your password" />
          <label><input type="checkbox" /> Remember me</label>
          <div className="action-buttons">
            <button className="btn blue">Log in</button>
            <button className="btn green">Sign Up</button>
          </div>
          <p>Or Continue With:</p>
          <button className="social-btn google" onClick={() => loginWithGoogle()}>Google</button>
          <button className="social-btn facebook">Facebook</button>
        </div>
      </div>
    </>
  );
}

// 🔄 Toggle Popup
const togglePopup = () => {
  const popup = document.getElementById("loginPopup");
  if (popup) popup.style.display = popup.style.display === "flex" ? "none" : "flex";
};

// 🔑 Google Login
const loginWithGoogle = () => {
  window.location.href = "http://localhost:5000/auth/google";
};

export default App;
