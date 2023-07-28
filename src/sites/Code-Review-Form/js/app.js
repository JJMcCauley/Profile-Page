/**
 * Pops up an alert when document is submitted to inform user that nothing has been done.
 * Custom alert borrowed from - swal (sweet alert): https://github.com/t4t5/sweetalert
 */

const btn = document.getElementById("sign-up-btn");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const msg = `Thank you for your interest in this fake newsletter.
    Nothing has been done with your information.
    Please look forward to not hearing from us.`;
  swal(msg);
});

//set initial focus to name element
document.getElementById("name_input").focus();

//form validation
const form = document.querySelector("form");

// validates an chosen field based on it's id
const validateField = (field = "name_input") => {
  let errors = 0;
  const fieldToCheck = document.getElementById(field);
};
