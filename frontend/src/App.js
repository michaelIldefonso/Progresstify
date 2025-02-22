import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
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
    <nav className={`navbar ${scrolling ? 'scrolled' : ''}`}>
        {/* Navbar items */}
    </nav>
    </div>
);
}

export default App;
