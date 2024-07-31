document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
});

function initializeEventListeners() {
    document.getElementById('loginBtn').addEventListener('click', handleLogin);
    document.getElementById('registerBtn').addEventListener('click', handleRegister);
}

function toggleContainer(container) {
    const loginContainer = document.querySelector('.login-container');
    const registerContainer = document.querySelector('.register-container');

    if (container === 'login') {
        activateContainer(loginContainer, registerContainer);
    } else if (container === 'register') {
        activateContainer(registerContainer, loginContainer);
    }
}

function activateContainer(activeContainer, inactiveContainer) {
    activeContainer.classList.add('active');
    inactiveContainer.classList.remove('active');
    activeContainer.style.transform = 'translateX(0)';
    inactiveContainer.style.transform = 'translateX(100%)';
}

function handleLogin() {
    const username = document.getElementById('username_login').value;
    const password = document.getElementById('password_login').value;
    const jsonData = { username, password };
    const url = document.getElementById('loginBtn').getAttribute('data-url');

    fetchData(url, jsonData)
        .then(data => {
            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
                const userId = data.user_id;
                getHtmlContent(userId, data.access_token);
                alert('Login successful');
                fetchTodos(userId, data.access_token);
            } else {
                alert('Login failed: ' + (data.message || 'Unknown error'));
            }
        })
        .catch(error => alert('There was a problem with the fetch operation: ' + error.message));    
}

function handleRegister() {
    const username = document.getElementById('username_register').value;
    const password = document.getElementById('password_register').value;
    const jsonData = { username, password };
    const url = document.getElementById('registerBtn').getAttribute('data-url');

    fetchData(url, jsonData)
        .then(data => {
            alert(JSON.stringify(data));
            toggleContainer('login');
        })
        .catch(error => alert('There was a problem with the fetch operation: ' + error.message));
}

function fetchData(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

function getHtmlContent(userId, token) {
    fetch(`/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text(); // Assuming the response is HTML
    })
    .then(html => {
        document.open();
        document.write(html);
        document.close();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}


function fetchTodos(userId, token) {
    fetch(`/${userId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
        .then(data => {
            console.log(data);
            displayTodos(data.todos);
    })
    .catch(error => alert('There was a problem with the fetch operation: ' + error.message));
}

function displayTodos(todos) {
    document.addEventListener('DOMContentLoaded', () => {
        // Your initialization code here
        const todoList = document.getElementById('todo-list');
    
        // Clear previous list items
        todoList.innerHTML = '';
    
        // Append new todo items
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title; // Display the title of the todo
            todoList.appendChild(li);
        });
    });
}