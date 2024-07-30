// Change the container based on the button clicked
function toggleContainer(container) {
    const loginContainer = document.querySelector('.login-container');
    const registerContainer = document.querySelector('.register-container');

    if (container === 'login') {
        loginContainer.classList.add('active');
        registerContainer.classList.remove('active');
        loginContainer.style.transform = 'translateX(0)';
        registerContainer.style.transform = 'translateX(100%)';
    } else if (container === 'register') {
        registerContainer.classList.add('active');
        loginContainer.classList.remove('active');
        loginContainer.style.transform = 'translateX(100%)';
        registerContainer.style.transform = 'translateX(0)';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');

    // Add an event listener to the login button
    loginBtn.addEventListener('click', () => {
        let name = document.getElementById('username_login').value;
        let password = document.getElementById('password_login').value;
        const jsonData = { username: name, password: password };
        const url = loginBtn.getAttribute('data-url');

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => alert(JSON.stringify(data)))
        .catch(error => alert('There was a problem with the fetch operation: ' + error.message));
    });

    // Add an event listener to the register button
    registerBtn.addEventListener('click', () => {
        let name = document.getElementById('username_register').value;
        let password = document.getElementById('password_register').value;
        const jsonData = { username: name, password: password };
        const url = registerBtn.getAttribute('data-url');

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => alert(JSON.stringify(data)))
        .catch(error => alert('There was a problem with the fetch operation: ' + error.message));
    });
});