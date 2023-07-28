const skillsDescription = document.getElementById("skill-description");
const skills = document.querySelectorAll(".skill");

const htmlDescription = `HTML, or Hypertext Markup Language, is the language used to build the basic structure of a website.`;
const cssDescription = `CSS, or Cascading Style Sheets, is what's responsible for the look and feel of a website as well as providing basic interactivity.`;
const jsDescription = `JS, or JavaScript, is a programming language that provides most of the functionality and user interactivity of a website such as programming the behavior of buttons.`;
const reactDescription =
  "React, developed by FaceBook, is an open-source JavaScript framework that allows sites to be broken into reusable components that allows websites to be easily put together, updated, and maintainted.";
const typeScriptDescription =
  "TypeScript is an open-source programming language built by Microsoft that uses strict typing to keep errors and bugs from being created which is transpiled into JavaScript when a website is deployed.";
const sassDescription = `Sass, or Syntantically Awesome Stylesheets, is an extension of CSS that allows the look of a website to be written using more powerful programming tools which is then compiled into normal CSS.`;
const apiDescription = `API, or application programming interface, is a tool that enables websites to communicate and share information with eachother, such as populating a website with information from an external database`;
const frameworksDescription = `In addition to the ones above I have also used other frameworks and libraries to get websites up quickly, such as Chakra UI for React or bootstrap for pure HTML and CSS`;

let description = htmlDescription;

if (skillsDescription) {
  skillsDescription.innerText = description;
}

skills.forEach((element) => {
  element.addEventListener("mouseenter", (e) => {
    let target = e.target.id;
    setSelected(target);
    switch (target) {
      case "HTML":
        description = htmlDescription;
        skillsDescription.innerText = description;
        break;
      case "CSS":
        description = cssDescription;
        skillsDescription.innerText = description;
        break;
      case "JAVASCRIPT":
        description = jsDescription;
        skillsDescription.innerText = description;
        break;
      case "REACT":
        description = reactDescription;
        skillsDescription.innerText = description;
        break;
      case "TYPESCRIPT":
        description = typeScriptDescription;
        skillsDescription.innerText = description;
        break;
      case "API":
        description = apiDescription;
        skillsDescription.innerText = description;
        break;
      case "SCSS":
        description = sassDescription;
        skillsDescription.innerText = description;
        break;
      case "LIBRARIES":
        description = frameworksDescription;
        skillsDescription.innerText = description;
        break;
    }
  });
});

function setSelected(element) {
  skills.forEach((skill) => {
    if (skill.classList.contains("selected-skill")) {
      skill.classList.remove("selected-skill");
    }
    if (skill.id === element) {
      skill.classList.add("selected-skill");
    }
  });
}

setSelected("HTML");
