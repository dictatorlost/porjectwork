// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Add functionality for the Task List Page
    const taskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");
    const taskContainer = document.getElementById("task-container");

    if (addTaskButton && taskInput && taskContainer) {
        addTaskButton.addEventListener("click", () => {
            const taskText = taskInput.value.trim();
            if (taskText) {
                const taskItem = document.createElement("div");
                taskItem.className = "task-item";
                taskItem.innerHTML = `
                    <span>${taskText}</span>
                    <button class="complete-task">Complete</button>
                `;
                taskContainer.appendChild(taskItem);
                taskInput.value = "";

                // Add functionality to mark tasks as completed
                const completeTaskButton = taskItem.querySelector(".complete-task");
                completeTaskButton.addEventListener("click", () => {
                    taskItem.remove();
                    saveCompletedTask(taskText);
                });
            }
        });
    }

    // Save completed tasks to localStorage
    function saveCompletedTask(task) {
        const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
        completedTasks.push(task);
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }

    // Load completed tasks for the Completed Tasks Page
    const completedTaskContainer = document.getElementById("completed-task-container");
    const clearCompletedButton = document.getElementById("clear-completed");

    if (completedTaskContainer) {
        const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
        completedTasks.forEach(task => {
            const taskItem = document.createElement("div");
            taskItem.className = "task-item completed";
            taskItem.textContent = task;
            completedTaskContainer.appendChild(taskItem);
        });
    }

    if (clearCompletedButton) {
        clearCompletedButton.addEventListener("click", () => {
            localStorage.removeItem("completedTasks");
            if (completedTaskContainer) {
                completedTaskContainer.innerHTML = "";
            }
        });
    }

    // Basic form submission handling for the Contact Page
    const contactForm = document.querySelector("form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Thank you for your message! We will get back to you soon.");
            contactForm.reset();
        });
    }
});
