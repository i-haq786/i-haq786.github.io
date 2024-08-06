"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  // console.log(filterItems, "\n\n\n", selectedValue);
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else if (
      filterItems[i].dataset.category
        .split(",")
        .find((item) => item === selectedValue)
    ) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

//successIcon
const successIcon = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "svg"
);
successIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
successIcon.setAttribute("viewBox", "0 0 512 512");
successIcon.setAttribute("stroke-width", "0");
successIcon.setAttribute("fill", "currentColor");
successIcon.setAttribute("stroke", "currentColor");
successIcon.setAttribute("class", "icon");

const pathSuccess = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "path"
);
pathSuccess.setAttribute(
  "d",
  "M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
);

successIcon.appendChild(pathSuccess);

//errorIcon
const errorIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
errorIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
errorIcon.setAttribute("viewBox", "0 0 512 512");
errorIcon.setAttribute("stroke-width", "0");
errorIcon.setAttribute("fill", "currentColor");
errorIcon.setAttribute("stroke", "currentColor");
errorIcon.setAttribute("class", "icon");

const pathError = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "path"
);
pathError.setAttribute(
  "d",
  "M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
);

errorIcon.appendChild(pathError);

const sendEmail = (e) => {
  e.preventDefault();

  // EmailJS service configuration
  emailjs.sendForm("service_623wr1b", "template_ba5d4uj", form).then(
    (result) => {
      console.log("Email sent successfully!", result.text);

      showCard(
        "success",
        "Success!",
        "Email sent successfully.",
        successIcon
      );

       form.reset(); // Optional: Reset the form after successful submission
    },
    (error) => {
      console.error("Error sending email:", error.text);
      showCard(
        "error",
        "Error!",
        "Failed to send. Retry!",
        errorIcon
      );
    }
  );
};

function showCard(type, message, subMessage, newSVG) {
  // Get all elements with the card class
  var cards = document.getElementsByClassName("card");

  // Ensure there is at least one element with the class "card"
  if (cards.length > 0) {
    var card = cards[0];

    // Update the card type
    card.classList.remove("success", "error");
    card.classList.add(type);

    // Update the message and sub-message
    var messageText = card.querySelector(".message-text");
    var subText = card.querySelector(".sub-text");
    const iconContainer = document.querySelector(".icon-container");

    messageText.textContent = message;
    subText.textContent = subMessage;
    iconContainer.replaceChild(newSVG, iconContainer.querySelector('svg'));
    
    // Show the card
    card.classList.add("show");

    // Add click event listener to the cross icon
    var closeIcon = card.querySelector(".cross-icon");
    if (closeIcon) {
      closeIcon.addEventListener("click", function () {
        card.classList.remove("show");
      });
    }

    // After 3 seconds, remove the "show" class
    setTimeout(function () {
      card.classList.remove("show");
    }, 3000);
  }
}

form.addEventListener("submit", sendEmail);

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}
