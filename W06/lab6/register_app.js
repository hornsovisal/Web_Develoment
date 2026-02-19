// Check if user has login cookie, if not redirect to login
function checkLoginCookie() {
  const cookies = document.cookie.split(";");
  let hasUsername = false;

  for (let cookie of cookies) {
    if (cookie.trim().startsWith("username=")) {
      hasUsername = true;
      break;
    }
  }

  if (!hasUsername) {
    window.location.href = "./login.html";
  }
}

function createRegisteredUserTable() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const tableBody = document.getElementById("registerDetailsTable");

  // Clear existing rows to prevent duplicates
  tableBody.innerHTML = "";

  users.forEach((user) => {
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).innerText = user.fname;
    newRow.insertCell(1).innerText = user.lname;
    newRow.insertCell(2).innerText = user.email;
    newRow.insertCell(3).innerHTML =
      `<button onclick="deleteUser('${user.email}')" class="delete-btn">Delete</button>`;
  });
}

function deleteUser(email) {
  let users = JSON.parse(localStorage.getItem("users"));
  users.forEach((user) => {
    if (user.email === email) {
      users.splice(users.indexOf(user), 1);
    }
  });
  localStorage.setItem("users", JSON.stringify(users));
  createRegisteredUserTable();
}

// Logout function - clear cookie and redirect to login
function logout() {
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "./login.html";
}

// Register function to handle form submission
function register() {
  // Get form values
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm_password").value;
  //list of language
  let language = document.querySelectorAll(
    'input[name="programming-language"]:checked',
  );

  let languageArray = [];
  language.forEach((checkbox) => {
    languageArray.push(checkbox.value);
  });
  let dateOfBirth = document.getElementById("dateofbirth").value;

  // Validate required fields
  if (!fname.trim()) {
    alert("Please enter your first name");
    return;
  }
  if (!lname.trim()) {
    alert("Please enter your last name");
    return;
  }
  if (!email.trim()) {
    alert("Please enter your email");
    return;
  }
  if (!password.trim()) {
    alert("Please enter a password");
    return;
  }
  if (!confirmPassword.trim()) {
    alert("Please confirm your password");
    return;
  }
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  //iif no language is selected, alert user
  if (languageArray.length === 0) {
    alert("Please select at least one programming language");
    return;
  }

  //if province is not selected, alert user
  let province = document.getElementById("province").value;
  if (!province) {
    alert("Please select your province");
    return;
  }
  if (!dateOfBirth) {
    alert("Please select your date of birth");
    return;
  }

  let newUser = {
    fname: fname,
    lname: lname,
    email: email,
    dateOfBirth: dateOfBirth,
    province: province,
    language: languageArray,
  };

  //Create an array of users in local storage, if it doesn't exist, create an empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];
  //Push Our User to the array and save it back to local storage
  users.push(newUser);
  //Save to local storage as a string
  localStorage.setItem("users", JSON.stringify(users));

  // Insert into table body
  createRegisteredUserTable();

  // Clear form
  document.querySelector("form").reset();
  alert("Registration successful!");
}

// Run check when page loads
checkLoginCookie();
// Load existing users from localStorage
createRegisteredUserTable();
