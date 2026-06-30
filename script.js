const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span class="task">${text}</span>
        <span class="actions">
            <button class="edit">✏️</button>
            <button class="fav">⭐</button>
            <button class="delete">🗑</button>
        </span>
    `;

    taskList.appendChild(li);
    taskInput.value = "";

    const taskSpan = li.querySelector(".task");
    const editBtn = li.querySelector(".edit");

       taskSpan.onclick = function () {
        taskSpan.classList.toggle("completed");
    };

       li.querySelector(".fav").onclick = function () {
        li.classList.toggle("favorite");
    };

        li.querySelector(".delete").onclick = function () {
        li.remove();
    };

       editBtn.onclick = function () {

        if (li.classList.contains("editing")) return;

        li.classList.add("editing");

        const currentText = taskSpan.textContent;

        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.className = "editInput";

    
        taskSpan.replaceWith(input);

        editBtn.textContent = "💾";

        editBtn.onclick = function () {
            const newText = input.value.trim();

            if (newText !== "") {
                const newSpan = document.createElement("span");
                newSpan.className = "task";
                newSpan.textContent = newText;

                input.replaceWith(newSpan);

                li.classList.remove("editing");

                editBtn.textContent = "✏️";

                newSpan.onclick = function () {
                    newSpan.classList.toggle("completed");
                };

                editBtn.onclick = arguments.callee;
            }
        };
    };
}

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function showAll() {
    document.querySelectorAll("#taskList li").forEach(li => {
        li.style.display = "flex";
    });
}

function showFavorites() {
    document.querySelectorAll("#taskList li").forEach(li => {
        if (li.classList.contains("favorite")) {
            li.style.display = "flex";
        } else {
            li.style.display = "none";
        }
    });
}