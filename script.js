const input = document.querySelector('.inputText');
const submit = document.querySelector('.submitText');
const todoList = document.querySelector('.todo-list');
const modal = document.getElementById('confirmModal');
const confirmBtn = document.querySelector('.confirm');
const cancelBtn = document.querySelector('.cancel');


let data = [
    { id: 'da124', text: 'React', done: false },
    { id: '1d68v', text: 'Vue', done: true },
    { id: 'sd4876', text: 'Angular', done: false },
];

let deleteId = null;  // ID of the todo to be deleted

// Event listeners 
document.addEventListener('DOMContentLoaded', onLoadHtml);
submit.addEventListener('click', addTodo);
todoList.addEventListener('click', handlerTodoList);
confirmBtn.addEventListener('click', confirmDelete);
cancelBtn.addEventListener('click', () => modal.style.display = 'none');

function onLoadHtml() {
    renderTodoList();
}

function renderTodoList() {
    todoList.innerHTML = '';
    data.forEach(elem => {
        const todo = document.createElement('div');
        todo.className = elem.done ? 'todo active' : 'todo';
        todo.id = elem.id;

        const check = document.createElement('input');
        check.type = 'checkbox';
        check.className = 'check'
        check.checked = elem.done;
        todo.appendChild(check);

        const text = document.createElement('span');
        text.className = 'text';
        text.innerText = elem.text;
        todo.appendChild(text);

        const deleteTodo = document.createElement('span');
        deleteTodo.className = 'delete';
        deleteTodo.innerHTML = '&times;';
        todo.appendChild(deleteTodo);

        todoList.appendChild(todo);
    });
}

function addTodo(event) {
    event.preventDefault();

    if (!input.value.trim()) {
        return alert('Please enter a todo item!');
    }

    const newTodo = {
        id: Date.now().toString(),
        text: input.value,
        done: false,
    };

    data.push(newTodo);
    renderTodoList();
    input.value = '';
}

function handlerTodoList(event) {
    const currentId = event.target.parentElement.id;

    if (event.target.className === 'check') {
        doneTodo(currentId);
    }

    if (event.target.className === 'delete') {
        deleteId = currentId;  
        modal.style.display = 'flex';  
    }
}

function doneTodo(id) {
    data.forEach(elem => {
        if (elem.id === id) {
            elem.done = !elem.done;
        }
    });
    renderTodoList();
}

function confirmDelete() {
    if (deleteId) {
        data = data.filter(elem => elem.id !== deleteId);
        renderTodoList();
        deleteId = null;
        modal.style.display = 'none';  
    }
}



