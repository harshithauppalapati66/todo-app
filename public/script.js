document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");

    async function fetchTodos() {
        const res = await fetch("/todos");
        const todos = await res.json();
        todoList.innerHTML = "";
        todos.forEach(todo => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${todo.text}
                <button class="delete-btn" data-id="${todo._id}">X</button>
            `;
            todoList.appendChild(li);
        });
    }

    addBtn.addEventListener("click", async () => {
        const text = todoInput.value.trim();
        if (text) {
            await fetch("/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });
            todoInput.value = "";
            fetchTodos();
        }
    });

    todoList.addEventListener("click", async (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = e.target.getAttribute("data-id");
            await fetch(`/todos/${id}`, { method: "DELETE" });
            fetchTodos();
        }
    });

    fetchTodos();
});
