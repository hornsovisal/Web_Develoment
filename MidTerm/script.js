//Visblity Password
const togglePassword = document.querySelector(".toggle");
const passwordInput = document.querySelector("#password");

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("change", function () {
    if (this.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });
}

const passwordField = document.querySelector("#password");
const strengthIndicator = document.querySelector("#password-strength");
if (passwordField && strengthIndicator) {
  passwordField.addEventListener("input", function () {
    const password = passwordField.value;
    let strength = "Weak";
    if (password.length < 8) {
      strength = "Weak";
    } else if (password.length < 12) {
      strength = "Medium";
    } else {
      strength = "Strong";
    }
    strengthIndicator.textContent = strength;

    // Update the strength indicator's styling based on password strength
    strengthIndicator.className = "text-sm font-semibold mt-2";
    if (strength === "Weak") {
      strengthIndicator.style.color = "red";
    } else if (strength === "Medium") {
      strengthIndicator.style.color = "orange";
    } else {
      strengthIndicator.style.color = "green";
    }
  });
}

// Session management, save selected user to cookie name: active_role upon successful login

const loginBtn = document.querySelector("#login-btn");
if (loginBtn) {
  loginBtn.addEventListener("click", function () {
    const selectedRole = document.querySelector("#role").value;
    document.cookie = `active_role=${selectedRole}; path=/`;
    // Redirect admin to admin.html, others to index.html
    if (selectedRole === "Admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  });
}

// Auto Login if cookie exists and we're on the login page, redirect to Dashboard
window.addEventListener("load", function () {
  const cookies = document.cookie.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {});
  if (cookies.active_role && window.location.pathname.endsWith("login.html")) {
    window.location.href = "index.html";
  }
});
//Logout functionality, clear cookie and redirect to landing page
const logoutBtn = document.querySelector("#logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    document.cookie =
      "active_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "landing.html";
  });
}

const resetBtn = document.querySelector("#reset-btn");
if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    document.cookie =
      "active_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "login.html";
  });
}

// Security Guard
// if cookie is missing on protected pages, go to error
// if nurse tries to access admin pages, go to error page

window.addEventListener("load", function () {
  const cookies = document.cookie.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {});
  const activeRole = cookies.active_role;
  const currentPage = window.location.pathname;

  // Only enforce security on protected pages
  if (
    (currentPage.endsWith("index.html") ||
      currentPage.endsWith("admin.html")) &&
    !activeRole
  ) {
    window.location.href = "error.html";
  }

  // Admin page access control - only admins can access admin.html
  if (currentPage.endsWith("admin.html") && activeRole !== "Admin") {
    window.location.href = "error.html";
  }

  // Dashboard (index.html) is accessible to all authenticated users
  // No additional check needed here since we already verified activeRole exists above
});
