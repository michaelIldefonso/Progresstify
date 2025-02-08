// Get modal and button elements
const modal = document.getElementById("authModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.querySelector(".close-btn");

// Get the buttons to switch between Login and Signup
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

// Get the modal header title
const modalTitle = document.getElementById("modalTitle");

// Get the form sections
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex"; 
    setTimeout(() => modal.classList.add("show"), 10); // Delay to trigger animation
});

closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 400); // Wait for animation to end
});


// Switch to the Login form
loginBtn.addEventListener("click", () => {
    loginForm.style.display = "block"; 
    signupForm.style.display = "none"; 
    modalTitle.innerText = "Login"; 
});

// Switch to the Signup form
signupBtn.addEventListener("click", () => {
    signupForm.style.display = "block"; 
    loginForm.style.display = "none"; 
    modalTitle.innerText = "Signup";
});

