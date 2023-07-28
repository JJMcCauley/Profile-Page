const mainDiv = document.getElementById("main");
const employees = [];

/**
 * Fetch's API data from a given URL and creates an Employee object and their cards with each one
 *
 * @param {string} url Url API
 * @return {Object} the promise object from the fetch request
 */
function fetchEmployeeData(url) {
  return fetch(url)
    .then(checkStatus)
    .then((res) => res.json())
    .then((data) => {
      const results = data.results;
      results.forEach((person) => {
        const employee = createEmployee(person);
        employees.push(employee);
      });
      createEmployeeCards();
    })
    .catch((err) => console.log("Looks like there was a problem.", err));
}

/**
 * Checks status of fetch request
 *
 * @param {Object} response A promise object
 * @return {object} if successful the response object is returned, otherwise the objects status text is returned
 */
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

/**
 * Creates an employee object and fills out all it's information
 *
 * @param {Object} person The raw returned data from the API
 * @return {Object} returns the employee object with all the information meaningfully parsed
 */
function createEmployee(person) {
  const employee = new Employee();
  const name = `${person.name.first} ${person.name.last}`;
  employee.name = name;
  employee.email = person.email;
  employee.location = person.location.city;
  employee.imgUrl = person.picture.medium;
  employee.phone = person.phone;
  const street = `${person.location.street.number} ${person.location.street.name}`;
  employee.street = street;
  const dob = `${person.dob.date.substring(5, 7)}/${person.dob.date.substring(
    8,
    10
  )}/${person.dob.date.substring(0, 4)}`;
  employee.dob = dob;
  employee.state = person.location.state;
  employee.postCode = person.location.postcode;
  return employee;
}

/**
 * Creates the visual employee card thumbnails for all employees and appends them to the DOM
 */
function createEmployeeCards() {
  employees.forEach((employee, index) => {
    const div = document.createElement("div");
    div.className = "min-employee-card";
    div.classList.add("card");
    div.dataset.index = index;
    div.id = employee.name;
    div.innerHTML = `  
            <div class='min-profile-img-container'>
                <img class='min-profile-img' src='${employee.imgUrl}' alt='Photo of ${employee.name}'>
            </div>
            <div class='min-profile-info' >
                <h3>${employee.name}</h3>
                <p>${employee.email}</p>
                <p>${employee.location}</p>
            </div>
        `;
    mainDiv.append(div);
  });
}

/**
 * Creates and displays a modal with all an employee's information when clicked
 *
 * @param {object} employee The employee object that was clicked
 * @param {number} index The index of the employee's thumbnail to keep them connected
 */
function displayOverlay(employee, index) {
  const div = document.createElement("div");
  div.className = "overlay";
  div.dataset.index = index;
  div.innerHTML = `
        <div class="c-modal">
            <button class="modal-close">X</button>
            <div class="modal-content">
                <img class="avatar" src="${employee.imgUrl}">
                <div class="text-container">
                    <h2 class="name">${employee.name}</h2>
                    <p class="email">${employee.email}</p>
                    <p class="city">${employee.location}</p>
                    <hr>
                    <p class="phone">${employee.phone}</p>
                    <p class="street">${employee.street}, ${employee.state} ${employee.postCode}</p>
                    <p class="dob">Birthday: ${employee.dob}</p>
                </div>
                <div class='overlay-nav' id='nav-left'><</div>
                <div class='overlay-nav' id='nav-right'>></div>
            </div>
        </div>
    `;
  mainDiv.append(div);
}

/**
 * Removes modal overlay
 */
function removeOverlay() {
  const overlay = document.querySelector(".overlay");
  mainDiv.removeChild(overlay);
}

/**
 * Returns current user input
 * @return {string} lower case version of user input
 */
function getUserInput() {
  const userInput = document.querySelector("#directory-search").value;
  return userInput.toLowerCase();
}

/**
 * Shows all cards matching input text and hides the rest
 *
 * @param {string} userInput The text to compare against image card id text
 */
function compareText(userInput) {
  userInput = getUserInput();
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const textToMatch = card.id.toLowerCase();
    if (textToMatch.includes(userInput) !== true) {
      card.style.display = "none";
    } else {
      card.style.display = "flex";
    }
  });
}

/**
 * Primary event handler, handles closing modal, cycling through modal overlays, cycling through pages, and listening for search input
 */
mainDiv.addEventListener("click", (e) => {
  if (
    e.target !== mainDiv &&
    e.target.className !== "modal-close" &&
    e.target.className !== "overlay-nav"
  ) {
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");
    displayOverlay(employees[index], index);
  } else if (e.target.className === "modal-close") {
    removeOverlay();
  } else if (e.target.id === "nav-right") {
    const overlay = e.target.closest(".overlay");
    let index = parseInt(overlay.getAttribute("data-index"));
    removeOverlay();
    if (index < employees.length - 1) {
      index++;
    } else {
      index = 0;
    }
    displayOverlay(employees[index], index);
  } else if (e.target.id === "nav-left") {
    const overlay = e.target.closest(".overlay");
    let index = parseInt(overlay.getAttribute("data-index"));
    removeOverlay();
    if (index > 0) {
      index--;
    } else {
      index = employees.length - 1;
    }
    displayOverlay(employees[index], index);
  }
});

fetchEmployeeData("https://randomuser.me/api/?results=12");
