// Sidebar Toggle
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');

// Toggle sidebar visibility
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-open');
});

// Expandable menu items
const expandButtons = document.querySelectorAll('.expand-btn');

expandButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const submenu = document.getElementById(targetId);
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        button.textContent = submenu.style.display === 'block' ? '-' : '+';
    });
});

