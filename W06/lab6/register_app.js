// Check if user has login cookie, if not redirect to login
function checkLoginCookie() {
  const cookies = document.cookie.split(";");
  let hasUsername = false;

  if (cookie.trim().startsWith("username=")) {
    hasUsername = true;
  }

  if (!hasUsername) {
    window.location.href = "./login.html";
  }
}

function createRegisteredUserTable() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const tableBody = document.getElementById("registerDetailsTable");

  users.forEach((user) => {
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).innerText = user.fname;
    newRow.insertCell(1).innerText = user.lname;
    newRow.insertCell(2).innerText = user.email;
  });
}

// Register function to handle form submission
function register() {
  // Get form values
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  let newUser = {
    fname: fname,
    lname: lname,
    email: email,
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
