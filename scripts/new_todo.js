
//Still needs work
window.onload = () => {
    let createTodoForm = document.getElementById("createTodo-form");
    // All form fields
    let userIdInputEl = document.getElementById("userId");
    let categoryInputEl = document.getElementById("category");
    let descriptionInputEl = document.getElementById("description");
    let deadlineInputEl = document.getElementById("deadline");
    let priorityInputEl = document.getElementById("priority");

    createTodoForm.onsubmit = (e) => {
        e.preventDefault();

        let currentFormData = {
            userid: userIdInputEl.value,
            category: categoryInputEl.value,
            description: descriptionInputEl.value,
            deadline: deadlineInputEl.value,
            priority: priorityInputEl.value,
        };

        fetch("http://localhost:8083/api/todos", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(currentFormData),
        })
            .then((res) => res.json())
            .then(() => {
                // Redirect to todos.html
                window.location.href = "todos.html";
            })
            .catch((err) => {
                console.error(err);
            });
    };
};

