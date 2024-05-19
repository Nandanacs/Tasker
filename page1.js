document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".right");
    const emailInput = document.querySelector(".email input");
    const passwordInput = document.querySelector(".password input");
    const signInButton = document.querySelector(".sign-in button");
    const rememberMeCheckbox = document.getElementById("checkbox");

    signInButton.addEventListener("click", function(event) {
        event.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!validatePassword(password)) {
            alert("Please enter a valid password consisting of at least 6 characters.");
            return;
        }

        if (rememberMeCheckbox.checked) {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);
        } else {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userPassword");
        }

        window.location.href = "page2index.html";
    });

    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (storedEmail) {
        emailInput.value = storedEmail;
        rememberMeCheckbox.checked = true;
    }
    if (storedPassword) {
        passwordInput.value = storedPassword;
        rememberMeCheckbox.checked = true;
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}