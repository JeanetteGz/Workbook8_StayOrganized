window.onload = () => {
    let urlParams = new URLSearchParams(location.search);
    let userid = urlParams.get('id');
    let userDropdown = document.getElementById("user-dropdown");
    let todoContainer = document.getElementById("todo-container");

    // Fetch list of registered users
    fetch("http://localhost:8083/api/users")
        .then((res) => res.json())
        .then((users) => {

            // Add a default option with "Select a user" text
            let defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.text = "Select a user";
            userDropdown.appendChild(defaultOption);

            // Add user options to the dropdown
            users.forEach((user) => {
                let option = document.createElement("option");
                option.value = user.id;
                option.text = user.name;
                userDropdown.appendChild(option);
            });

            userDropdown.addEventListener("change", (event) => {
                let selectedUserId = event.target.value;

                // Check if the default option is selected
                if (!selectedUserId) {
                    // Clear the todo container if the default option is selected
                    todoContainer.innerHTML = "";
                } else {
                    // Fetch ToDo tasks for the selected user
                    fetch(`http://localhost:8083/api/todos/byuser/${selectedUserId}`)
                        .then((res) => res.json())
                        .then((todos) => {
                            // Display ToDo tasks for the selected user
                            displayTodos(todos);
                        })
                        .catch((error) => {
                            console.error("Error fetching ToDo tasks:", error);
                            todoContainer.innerHTML = "<p>Error fetching ToDo tasks.</p>";
                        });
                }
            });
        });
};

function displayTodos(todos) {
    let todoContainer = document.getElementById("todo-container");
    todoContainer.innerHTML = "";
    // Check if there are todos to display
    if (todos.length > 0) {
        todos.forEach((todo) => {
            // Create and append elements to display each ToDo task
            let todoCard = document.createElement("div");
            todoCard.classList.add("card");
            todoCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${todo.description}</h5>
                    <p class="card-text">Category: ${todo.category}</p>
                    <p class="card-text">Deadline: ${todo.deadline}</p>
                    <p class="card-text">Priority: ${todo.priority}</p>
                    <p class="card-text">Completed: ${todo.completed ? 'Yes' : 'No'}</p>
                </div>
            `;
            todoContainer.appendChild(todoCard);
        });
    } else {
        // Display a message when there are no todos for the selected user
        todoContainer.innerHTML = "<p>No ToDo tasks available for this user.</p>";
    }
}
