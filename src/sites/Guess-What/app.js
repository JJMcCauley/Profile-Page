const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const phraseUL = document.querySelector("#phrase ul");
const startButton = document.querySelector(`.btn__reset`);
const overlay = document.querySelector(".start");
const heartContainer = document.querySelector("#scoreboard ol");
let missed = 0;
const winScreenDelay = 2500;

const tvShows = [
  "Survivor",
  "The X Files",
  "American Horror Story",
  "Stranger Things",
  "RuPauls Drag Race",
  "Family Guy",
  "The Simpsons",
  "Breaking Bad",
  "The Sopranos",
  "The Golden Girls",
  "The Wheel of Fortune",
];

const movies = [
  "Casablanca",
  "Showgirls",
  "Brokeback Mountain",
  "East Of Eden",
  "King Kong",
  "The Terminator",
  "The Matrix",
  "Back To THe Future",
  "Shindlers List",
  "Men In Black",
];

const countries = [
  "United States",
  "Japan",
  "Mexico",
  "Canada",
  "The United Kingdom",
  "France",
  "South Africa",
  "Korea",
  "China",
  "Russia",
  "Germany",
  "Djibouti",
  "Nigeria",
  "Ethiopia",
  "India",
];

const videoGames = [
  "Resident Evil",
  "Skyrim",
  "Assassins Creed",
  "Battlefield",
  "Alan Wake",
  "The Last Of Us",
  "Super Mario Bros",
  "Metal Gear Solid",
  "Monster Hunter",
  "Psychonauts",
  "Pac Man",
  "Centipede",
  "Doom",
];

const celebrities = [
  "Chris Hemsworth",
  "Dame Judy Dench",
  "Rashida Jones",
  "Harrison Ford",
  "Dustin Hoffman",
  "Steve Carrell",
  "Miles Davis",
  "Jessica Alba",
  "Sean Connery",
  "Dwayne Johnson",
];

const categories = [
  "T.V. Shows",
  "Movies",
  "Countries",
  "Video Games",
  "Celebrities",
];

/**
 * Finds and returns a random category from the categories variable
 * @return {string} the name of the category the phrase will be drawn from
 */
const getRandomCategory = () => {
  const numberOfCategtories = categories.length;
  const randomArrayIndex = Math.floor(Math.random() * numberOfCategtories);
  const chosenCategory = categories[randomArrayIndex];
  return chosenCategory;
};

/**
 * Returns a random phrase based on given category
 *
 * @param {string} category The name of the category to pull the phrase from
 * @return {string} Chosen phrase to be used for the game
 */
const getPhrase = (category) => {
  let phrases = "";
  if (category === "T.V. Shows") {
    phrases = tvShows;
  } else if (category === "Movies") {
    phrases = movies;
  } else if (category === "Countries") {
    phrases = countries;
  } else if (category === "Video Games") {
    phrases = videoGames;
  } else {
    phrases = celebrities;
  }
  return phrases;
};

/**
 * Converts chosen phrase to an array of single characters
 *
 * @return {Array} chosen phrase converted to array of single characters
 */
const getRandomPhraseAsArray = () => {
  const category = getRandomCategory();
  changeHeader(category);
  let phrases = getPhrase(category);
  const numberOfPhrases = phrases.length;
  const randomArrayIndex = Math.floor(Math.random() * numberOfPhrases);
  const chosenPhrase = phrases[randomArrayIndex].toUpperCase();
  const chosenPhraseAsArray = chosenPhrase.split(``);
  return chosenPhraseAsArray;
};

/**
 * A function to create a pause before executing the next command, borrowed from https://www.sitepoint.com/delay-sleep-pause-wait/
 *
 * @param {num} ms The time (in milliseconds) the program should wait
 * @return {Object} returns a promise object
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * An asyncronous function that adds letter's from the chosen display to the board one at a time so they appear to being placed by hand
 * @param {Array} arr The phrase to be added as an array of single characters
 */
async function addPhraseToDisplay(arr) {
  disableKeyboard();
  for (let i = 0; i < arr.length; i++) {
    await sleep(150);
    const li = document.createElement("li");
    const letter = arr[i];
    li.textContent = letter;
    phraseUL.appendChild(li);
    if (letter != " ") {
      li.className = "letter";
    } else {
      li.className = "space";
    }
  }
  enableKeyboard();
}

/**
 * Disables keyboard keys
 */
const disableKeyboard = () => {
  const keyRows = document.getElementsByClassName("keyrow");
  for (let i = 0; i < keyRows.length; i++) {
    let keyboardKeys = keyRows[i].children;
    for (let y = 0; y < keyboardKeys.length; y++) {
      keyboardKeys[y].disabled = true;
      keyboardKeys[y].className = "chosen";
    }
  }
};

/**
 * Enables keyboard keys
 */
const enableKeyboard = () => {
  const keyRows = document.getElementsByClassName("keyrow");
  for (let i = 0; i < keyRows.length; i++) {
    let keyboardKeys = keyRows[i].children;
    for (let y = 0; y < keyboardKeys.length; y++) {
      keyboardKeys[y].disabled = false;
      keyboardKeys[y].className = "";
    }
  }
};

/**
 * Takes the letter of the keyboard btn that was pressed and looks for a match in the phrase array
 *
 * @param {string} btn The letter of the keyboard button that was pressed
 * @return {string} Returns the letter if there was a match
 */
const checkLetter = (btn) => {
  let match = null;
  let letters = document.querySelectorAll("li");
  for (let i = 0; i < letters.length; i++) {
    const checkedLetter = letters[i].textContent.toLowerCase();
    if (btn == checkedLetter) {
      letters[i].classList.add("show");
      match = checkedLetter;
    }
  }
  return match;
};

/**
 * Displays all letters of the phrase that have "show" in their classlist
 */
const displayLetter = (letter) => {
  if (!letter.classList.contains("show")) {
    letter.classList.add("show");
    letter.classList.add("wrong");
  }
};

/**
 * Displays the letters of the phrase
 */
const displayPhrase = () => {
  let letters = document.querySelectorAll("li.letter");
  letters.forEach(displayLetter);
};

/**
 * Replaces the "Start Game" button with a "Replay" button for multiple games ina row
 */
const showResetButton = () => {
  startButton.textContent = "Replay";
  startButton.className = "reset";
};

/**
 * Checks if all letters have been revealed or all attempts have been used, shows the entire phrase, and after a delay shows either the win screen or the lose screen
 */
async function checkWin() {
  const letterLI = document.querySelectorAll(".letter").length;
  const showLI = document.querySelectorAll(".show").length;
  if (letterLI === showLI) {
    disableKeyboard();
    await sleep(winScreenDelay);
    overlay.classList.add("win");
    const winMessage = "Congratulations!<br>You're a winner, baby!!";
    overlay.firstElementChild.innerHTML = winMessage;
    overlay.style.display = "flex";
    showResetButton();
  } else if (missed == 5) {
    disableKeyboard();
    displayPhrase();
    await sleep(winScreenDelay);
    overlay.classList.add("lose");
    overlay.firstElementChild.textContent =
      "Sorry, you ran out of guesses, want to try again?";
    overlay.style.display = "flex";
    showResetButton();
  }
}

/**
 * After a wrong choice has been made it increases the count of missed and replaces a full heart with a lost heart
 *
 * @param {Object} btn The keyboard button element that was pressed
 */
const wrongchoice = (btn) => {
  missed++;
  btn.classList.add("wrong");
  let hearts = heartContainer.children;
  heartIndex = hearts.length - missed;
  let heart = hearts[heartIndex].firstElementChild;
  heart.src = "images/lostHeart.png";
};

/**
 * Resets keyboard to its beginning state
 */
const resetKeyboard = () => {
  const keyRows = document.getElementsByClassName("keyrow");
  for (let i = 0; i < keyRows.length; i++) {
    let keyboardKeys = keyRows[i].children;
    for (let y = 0; y < keyboardKeys.length; y++) {
      keyboardKeys[y].className = "";
      keyboardKeys[y].disabled = false;
    }
  }
};

/**
 * Refills the heart count to full
 */
async function refillHearts() {
  const hearts = heartContainer.children;
  for (let i = 0; i < hearts.length; i++) {
    await sleep(300);
    const heart = hearts[i].firstElementChild;
    heart.src = "images/liveHeart.png";
  }
  missed = 0;
}

/**
 * Removed the current phrase from the DOM
 */
const removePhrase = () => {
  while (phraseUL.firstChild) {
    phraseUL.removeChild(phraseUL.firstChild);
  }
};

/**
 * Changes the header to the category of the current phrase
 *
 * @param {string} category The name of the category of the current phrase
 */
const changeHeader = (category) => {
  const header = document.querySelector(".header");
  header.innerHTML = `<h2 style="display: none" id="category-display">${category}</h2>`;
};

/**
 * Displays the category header
 */
const displayHeader = () => {
  const header = document.getElementById("category-display");
  header.style.display = "block";
};

/**
 * Removes the opening overlay, displays the header and starts the game
 */
const startGame = () => {
  overlay.style.display = "none";
  displayHeader();
  addPhraseToDisplay(phraseArray);
};

/**
 * Calls all the methods required to reset the game when replay game is chosen
 */
const resetGame = () => {
  overlay.style.display = "none";
  overlay.className = "";
  resetKeyboard();
  refillHearts();
  removePhrase();
  phraseArray = getRandomPhraseAsArray();
  displayHeader();
  addPhraseToDisplay(phraseArray);
};

/**
 * event listener for the button that starts/resets teh game
 */
startButton.addEventListener("click", () => {
  if (startButton.classList.contains(`btn__reset`)) {
    startGame();
  } else if (startButton.className == "reset") {
    resetGame();
  }
});

/**
 * Event listener for onscreen keyboard
 */
qwerty.addEventListener("click", (e) => {
  const clickedButton = e.target;
  if (
    clickedButton.tagName === "BUTTON" &&
    clickedButton.className != "chosen"
  ) {
    clickedButton.className = "chosen";
    clickedButton.classList.add("shake");
    clickedButton.disabled = true;
    let match = checkLetter(clickedButton.textContent);
    if (match == null) {
      wrongchoice(e.target);
    } else {
      clickedButton.classList.add("right");
    }
  }
  checkWin();
});

/**
 * Sets initial phrase
 */
let phraseArray = getRandomPhraseAsArray();
disableKeyboard();
