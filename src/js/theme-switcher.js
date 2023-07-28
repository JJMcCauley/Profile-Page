const primaryBackground = document.querySelectorAll(".primary-dark");
const primaryArray = [...primaryBackground];

const primaryBackgroundLighter = document.querySelectorAll(
  ".primary-dark-lighter"
);
const primaryArrayLighter = [...primaryBackgroundLighter];

const secondaryBackground = document.querySelectorAll(".secondary-dark");
const secondaryArray = [...secondaryBackground];

const secondaryBackgroundDarker = document.querySelectorAll(
  ".secondary-dark-darker"
);
const secondaryArrayDarker = [...secondaryBackgroundDarker];

const tertiaryBackground = document.querySelectorAll(".tertiary-dark");
const tertiaryArray = [...tertiaryBackground];
tertiaryArray.pop();

const gradient = document.querySelector(".gradient-dark");
console.log(gradient);

const options = document.getElementById("options-wrapper");

const removeClasses = () => {
  primaryArray.forEach((element) => {
    if (element.classList.contains("primary-pastel")) {
      element.classList.remove("primary-pastel");
    } else if (element.classList.contains("primary-vibrant")) {
      element.classList.remove("primary-vibrant");
    } else if (element.classList.contains("primary-dark")) {
      element.classList.remove("primary-dark");
    }
  });

  primaryArrayLighter.forEach((element) => {
    if (element.classList.contains("primary-pastel-lighter")) {
      element.classList.remove("primary-pastel-lighter");
    } else if (element.classList.contains("primary-vibrant-lighter")) {
      element.classList.remove("primary-vibrant-lighter");
    } else if (element.classList.contains("primary-dark-lighter")) {
      element.classList.remove("primary-dark-lighter");
    }
  });

  secondaryArray.forEach((element) => {
    if (element.classList.contains("secondary-pastel")) {
      element.classList.remove("secondary-pastel");
    } else if (element.classList.contains("secondary-vibrant")) {
      element.classList.remove("secondary-vibrant");
    } else if (element.classList.contains("secondary-dark")) {
      element.classList.remove("secondary-dark");
    }
  });

  secondaryArrayDarker.forEach((element) => {
    if (element.classList.contains("secondary-pastel-darker")) {
      element.classList.remove("secondary-pastel-darker");
    } else if (element.classList.contains("secondary-vibrant-darker")) {
      element.classList.remove("secondary-vibrant-darker");
    } else if (element.classList.contains("secondary-dark-darker")) {
      element.classList.remove("secondary-dark-darker");
    }
  });

  tertiaryArray.forEach((element) => {
    if (element.classList.contains("tertiary-pastel")) {
      element.classList.remove("tertiary-pastel");
    } else if (element.classList.contains("tertiary-vibrant")) {
      element.classList.remove("tertiary-vibrant");
    } else if (element.classList.contains("tertiary-dark")) {
      element.classList.remove("tertiary-dark");
    }
  });

  if (gradient.classList.contains("gradient-pastel")) {
    gradient.classList.remove("gradient-pastel");
  } else if (gradient.classList.contains("gradient-vibrant")) {
    gradient.classList.remove("gradient-vibrant");
  } else if (gradient.classList.contains("gradient-dark")) {
    gradient.classList.remove("gradient-dark");
  }
};

const switchToVibrant = () => {
  removeClasses();
  primaryArray.forEach((element) => {
    element.classList.add("primary-vibrant");
  });
  primaryArrayLighter.forEach((element) => {
    element.classList.add("primary-vibrant-lighter");
  });
  secondaryArray.forEach((element) => {
    element.classList.add("secondary-vibrant");
  });
  secondaryArrayDarker.forEach((element) => {
    element.classList.add("secondary-vibrant-darker");
  });
  tertiaryArray.forEach((element) => {
    element.classList.add("tertiary-vibrant");
  });
  gradient.classList.add("gradient-vibrant");
};

const switchToDark = () => {
  removeClasses();
  primaryArray.forEach((element) => {
    element.classList.add("primary-dark");
  });
  primaryArrayLighter.forEach((element) => {
    element.classList.add("primary-dark-lighter");
  });
  secondaryArray.forEach((element) => {
    element.classList.add("secondary-dark");
  });
  secondaryArrayDarker.forEach((element) => {
    element.classList.add("secondary-dark-darker");
  });
  tertiaryArray.forEach((element) => {
    element.classList.add("tertiary-dark");
  });
  gradient.classList.add("gradient-dark");
};

const switchToPastel = () => {
  removeClasses();
  primaryArray.forEach((element) => {
    element.classList.add("primary-pastel");
  });
  primaryArrayLighter.forEach((element) => {
    element.classList.add("primary-pastel-lighter");
  });
  secondaryArray.forEach((element) => {
    element.classList.add("secondary-pastel");
  });
  secondaryArrayDarker.forEach((element) => {
    element.classList.add("secondary-pastel-darker");
  });
  tertiaryArray.forEach((element) => {
    element.classList.add("tertiary-pastel");
  });
  gradient.classList.add("gradient-pastel");
};

options.addEventListener("change", (e) => {
  let target = e.target.id;
  switch (target) {
    case "pastel-radio":
      switchToPastel();
      break;
    case "vibrant-radio":
      switchToVibrant();
      break;
    case "dark-radio":
      switchToDark();
      break;
  }
});

switchToDark();
