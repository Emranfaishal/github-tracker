const loginBtn = document.getElementById('login-btn');
// console.log(loginBtn);
loginBtn.addEventListener('click', function () {
    // console.log('login btn');
    // username 
    const inputUsername = document.getElementById('input-username');
    const username = inputUsername.value;
    // console.log(username);
    // password
    const inputPin = document.getElementById('input-password');
    const pin = inputPin.value;
    // console.log(pin);
    if (username == "admin" && pin == "admin123") {
        // alert('login right');
        // window.location.replace('/allTracker.html');
        window.location.assign('/allTracker.html');
    } else {
        alert('login Failed');
        return;
    }
});