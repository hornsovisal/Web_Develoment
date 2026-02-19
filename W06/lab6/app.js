function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 86400000);

  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

// Check if already logged in, redirect to register
function checkAlreadyLoggedIn() {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    if (cookie.trim().startsWith("username=")) {
      // Already logged in, redirect to register page
      window.location.href = "./register.html";
      return;
    }
  }
}

function login() {
  const username = document.getElementById("username").value;

  if (!username.trim()) {
    alert("Please enter a username");
    return;
  }

  setCookie("username", username, 1);
  window.location.href = "./register.html";
}

// Run check when page loads
checkAlreadyLoggedIn();
