const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', function () { 
    const inputUsername = document.getElementById('input-username');
    const username = inputUsername.value;
    const inputPin = document.getElementById('input-password');
    const pin = inputPin.value;
    if (username == "admin" && pin == "admin123") {
        window.location.assign('/allTracker.html');
    } else {
        alert('login Failed');
        return;
    }
});