document.addEventListener("DOMContentLoaded", function () {
    const openModalBtn = document.getElementById("openModalBtn");
    const modal = document.getElementById("authModal");
    const closeModalBtn = document.querySelector(".close-btn");
    const authContainer = document.getElementById("authContainer");

    function loadAuthPage(page) {
        fetch(page)
            .then(response => response.text())
            .then(data => {
                authContainer.innerHTML = data;
                modal.style.display = "block";
            })
            .catch(error => console.error("Error loading page:", error));
    }

    openModalBtn.addEventListener("click", function () {
        loadAuthPage("login.html"); // Initially load login page
    });

    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Event delegation for switching login/signup
    authContainer.addEventListener("click", function (event) {
        if (event.target.id === "signupBtn") {
            loadAuthPage("signup.html");
        } else if (event.target.id === "loginBtn") {
            loadAuthPage("login.html");
        }
    });
});
