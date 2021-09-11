const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("todos-list");

const LS = JSON.parse(localStorage.getItem("todos"));

if(LS){
    LS.forEach((text) => {
        newToDo(text);
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    newToDo();
})

function newToDo(text = ''){

    let todo = input.value;

    if(text){
        todo = text.text;
    }

    if(todo){
        input.value = '';

        const li = document.createElement("li");
        li.innerHTML = `<span>${todo}</span><i class="fas fa-times"></i>`;

        const span = li.querySelector('span');
        const closeBtn = li.querySelector("i");

        if(text.done){
            span.classList.add("done");
        }

        li.addEventListener("click", () => {
            span.classList.toggle("done");
            saveLS();
        })
        
        closeBtn.addEventListener("click", () => {
            li.remove();
            saveLS();
        })

        ul.appendChild(li);

        saveLS();
    }
}

function saveLS(){
    const todos = document.querySelectorAll("li");

    const text = [];

    todos.forEach((i) => {
        text.push({
            text: i.innerText,
            done: i.querySelector("span").classList.contains("done")
        });
    });

    localStorage.setItem("todos", JSON.stringify(text));
}