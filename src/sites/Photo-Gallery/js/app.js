baguetteBox.run(".gallery");

//

/**
 * Gets user input from text box
 * @return {string} Current text in text box
 */
function getUserInput() {
  const userInput = document
    .querySelector("#gallery-search")
    .value.toLowerCase();
  console.log(userInput);
  return userInput;
}

/**
 * Hides pictures that don't match having matching text in their data-caption attribute
 *
 * @param {string} userinput string to compare against data-caption text
 */
function compareText(userInput) {
  userInput = getUserInput();
  const imageList = document.querySelectorAll(".gallery-img");
  console.log(imageList);

  for (i = 0; i < imageList.length; i++) {
    let imageListText = imageList[i].getAttribute("data-caption").toLowerCase();
    if (imageListText.includes(userInput) !== true) {
      imageList[i].style.display = "none";
    } else {
      imageList[i].style.display = "grid";
    }
  }
}
