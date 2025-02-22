import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
    const [data, setData] = useState("");

    useEffect(() => {
      fetch("http://localhost:5000/api/data") // Call the backend
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);
  

const [scrolling, setScrolling] = useState(false);

const handleScroll = () => {
    setScrolling(window.scrollY > 50);
};

useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
    window.removeEventListener('scroll', handleScroll);
    };
}, []);

return (
    <div className="App">
    <h1>{data}</h1>
    <nav className={`navbar ${scrolling ? 'scrolled' : ''}`}>
        {/* Navbar items */}
    </nav>
    </div>

);
}

export default App;
