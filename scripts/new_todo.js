
//Still needs work
window.onload = () => {
    let createTodoForm = document.getElementById("createTodo-form");
    // All form fields
    let userIdInputEl = document.getElementById("userId");
    let categoryInputEl = document.getElementById("category");
    let descriptionInputEl = document.getElementById("description");
    let dateInputEl = document.getElementById("date");
    let priorityInputEl = document.getElementById("priority");
    let completedInputEl = document.getElementById("completed");

    createTodoForm.onsubmit = (e) => {
        e.preventDefault();

        let currentFormData = {
            userid: userIdInputEl.value,
            category: categoryInputEl.value,
            description: descriptionInputEl.value,
            date: dateInputEl.value,
            priority: priorityInputEl.value,
            completed: completedInputEl.value
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

