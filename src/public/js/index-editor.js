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

// Open the modal
openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex"; 
    modalTitle.innerText = "Login"; 
    loginForm.style.display = "block"; 
    signupForm.style.display = "none"; 
});

// Close the modal when close button is clicked
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none"; 
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
