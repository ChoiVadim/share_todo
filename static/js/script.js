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
    const jsonData = { name: 'Mike', password: '1234' };

    loginBtn.addEventListener('click', () => {
        fetch('{{ url_for("login") }}', {
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