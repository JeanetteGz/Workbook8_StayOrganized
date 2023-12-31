window.onload = () => {
    let registrationForm = document.getElementById("registration-form");
    let nameInputEl = document.getElementById("name");
    let usernameInputEl = document.getElementById("username");
    let passwordInputEl = document.getElementById("password");


    registrationForm.onsubmit = (e) => {
        e.preventDefault();

        let currentFormData = {
            name: nameInputEl.value,
            username: usernameInputEl.value,
            password: passwordInputEl.value,
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
                    res.json()
                }
            })
            .then((data) => {
                console.log(data);
                location.href = 'index.html';
            })
            .catch((err) => {
                console.error(err);
            });
    };
};

