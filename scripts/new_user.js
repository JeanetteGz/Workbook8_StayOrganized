window.onload = () => {
    let registrationForm = document.getElementById("registration-form");
    let passwordInput = document.getElementById("password");
    let confirmPasswordInput = document.getElementById("confirm-password");
    let passwordError = document.getElementById("password-error");

    registrationForm.onsubmit = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (passwordInput.value !== confirmPasswordInput.value) {
            passwordError.textContent = "Passwords do not match.";
            return;
        }

        // Clear any previous password error
        passwordError.textContent = "";

        let currentFormData = {
            name: document.getElementById("name").value,
            username: document.getElementById("username").value,
            password: passwordInput.value,
        };

        fetch("http://localhost:8083/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentFormData),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 403) {
                throw new Error("Username is already in use.");
            } else {
                throw new Error("Error registering user.");
            }
        })
        .then((userDetails) => {
            console.log("User registered successfully:", userDetails);
            // Redirect to the home page or any other page
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Error registering user:", error.message);
        });
    };
};


