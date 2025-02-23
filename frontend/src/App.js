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
    { name: "Alice", role: "Writer" },
    { name: "Bob", role: "Designer" },
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
        <h2>Welcome to the Dashboard</h2>
        <p>This is your main content for the home view.</p>
      </div>
    );
  }
// ✨ Marketing Workspace Component
function MarketingWorkspace() {
  const { tasks, removeTask } = useTasks();
  const { members, newMember, setNewMember, addMember, removeMember } = useTeamMembers();

  return (
    <div className="workspace">
      <h2>📢 Marketing Workspace</h2>
      <div className="tasks">
        <h3>📌 Tasks</h3>
        {Object.keys(tasks).map((category) => (
          <div key={category}>
            <h4>{category}</h4>
            <ul>
              {tasks[category].map((task, index) => (
                <li key={index}>
                  {task} <button onClick={() => removeTask(category, index)}>❌</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="team">
        <h3>👥 Team Members</h3>
        <ul>
          {members.map((member, index) => (
            <li key={index}>
              {member.name} ({member.role})
              <button onClick={() => removeMember(member.name)}>❌</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add new member"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
        />
        <button onClick={addMember}>➕ Add</button>
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
            <li><a href="#" onClick={() => setView("marketing")}>Marketing Workspace</a></li>
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
      {view === "marketing" && <MarketingWorkspace />}

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
