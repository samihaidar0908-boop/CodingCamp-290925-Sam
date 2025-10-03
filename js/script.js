/// initialize an empty array to store todo items
let todos = [];

function AddTodo() {
    /// Get input values
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");

    /// Validate input
    if (validateInput(todoInput.value, todoDate.value)) {
        /// Add new todo item to the array
        let todo = { task : todoInput.value, date: todoDate.value };
        todos.push(todo);

        /// render the updated todo list
        renderTodo();
        todoInput.value = '';
        todoDate.value = '';

    }
 }

 
function renderTodo() { 
    //query selector
    const todoList = document.getElementById("todo-list");

    // Clear the existing list
    todoList.innerHTML = '';

    /// Renders each todo item in the list
    todos.forEach((todo, index) => {
        todoList.innerHTML += `<li class="border p-2 mb-2 flex justify-between items-center">
            <div>
               <p class="font-bold">${todo.task}</p>
               <p class="text-sm text-gray-500">${todo.date}</p>
            </div>
            <button onclick="DeleteTodo(${index})" class="bg-red-500 text-white p-1 rounded">Delete</button>
        </li>`;
    });
}

function DeleteAllTodo() {
    /// Clear the todos array
    todos = [];
    /// Render the empty todo list
    renderTodo();
}

// ...existing code...

function DeleteTodo(index) {
    todos.splice(index, 1); // hapus todo sesuai index
    renderTodo(); // render ulang daftar todo
}

// ...existing code...

function filterTodo() {
    const today = new Date().toISOString().split('T')[0];
    const filtered = todos.filter(todo => todo.date === today);

    const todoList = document.getElementById("todo-list");
    
    todoList.innerHTML = '';

    if (filtered.length === 0) {
        todoList.innerHTML = '<p class="text-center text-gray-500">No todos for today.</p>';
    } else {
        filtered.forEach((todo, index) => {
           // ...existing code...
            todoList.innerHTML += `<li class="todo-card todo-flex">
                <div>
                    <p class="font-bold">${todo.task}</p>
                    <p class="text-sm text-gray-500">${todo.date}</p>
                </div>
                <button onclick="DeleteTodo(${index})" class="bg-red-500 text-white p-1 rounded">Delete</button>
            </li>`;
// ...existing code...
        });
    }
}




  
function searchTodo() {
  const keyword = document.getElementById("search-input").value.toLowerCase();
  const todoList = document.getElementById("todo-list");
  
  // bikin array filtered
  const filtered = todos
    .map((t, i) => ({ ...t, _idx: i }))
    .filter(item => item.task.toLowerCase().includes(keyword));

  todoList.innerHTML = '';

  if (filtered.length === 0) {
    todoList.innerHTML = '<p class="text-center text-gray-500">No matching todos found.</p>';
    return;
  }
// render hasil filter
  filtered.forEach(item => {
    todoList.innerHTML += `
      <li class="border p-2 mb-2 flex justify-between items-center">
        <div>
          <p class="font-bold">${item.task}</p>
          <p class="text-sm text-gray-500">${item.date}</p>
        </div>
        <button onclick="DeleteTodo(${item._idx})" class="bg-red-500 text-white p-1 rounded">Delete</button>
      </li>`;
  });
}
/// validate input fields
function validateInput(todo, date) {
    const errorMsg = document.getElementById("error-message");
    /// Check if input fields are empty
    if (todo === '' || date === '') {
        /// Show an alert if validation fails
       errorMsg.textContent = "this field is required";
       return false;
    }
    /// input is valid
    return true;
    }    