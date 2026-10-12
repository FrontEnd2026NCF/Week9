// script.js: starter file for your interactive personal page.
// Complete each TODO. Keep one operation per line and comment every line, as in the course examples.

// ===== Data =====

const interests = [
  // TODO: replace these four with eight or more of your own interests.
  "Hiking",
  // Example item.
  "Photography",
  // Example item.
  "Board games",
  // Example item.
  "Cooking"
  // Example item.
];
// End of the interests array.

// ===== Select elements =====

const themeButton = document.querySelector("#theme-button");
// The dark mode button.
const filterInput = document.querySelector("#filter-input");
// The filter box.
const interestList = document.querySelector("#interest-list");
// The ul that will hold the interests.
const interestCount = document.querySelector("#interest-count");
// The paragraph that shows the count.
const messageForm = document.querySelector("#message-form");
// The contact form.
const senderName = document.querySelector("#sender-name");
// The name input.
const senderMessage = document.querySelector("#sender-message");
// The message textarea.
const formSummary = document.querySelector("#form-summary");
// The paragraph that shows the summary.

// ===== Requirement 1: dark mode =====

// TODO: add a click listener to themeButton.
// Inside it:
//   1. Use document.body.classList.toggle("dark-mode") to switch the class.
//   2. Use document.body.classList.contains("dark-mode") to check which mode is on.
//   3. Set themeButton.textContent to "Switch to light mode" or "Switch to dark mode".

// ===== Requirement 2: filterable list =====

// TODO: write a function renderInterests(searchText) that:
//   1. Clears interestList.innerHTML.
//   2. Uses interests.filter(...) to keep the items that include the search text (ignore capital letters).
//   3. Creates one li for each kept item with document.createElement("li") and textContent, and appends it to interestList.
//   4. Writes "Showing X of Y interests." into interestCount.

// TODO: call renderInterests("") once so the full list appears when the page loads.

// TODO: add an input listener to filterInput that calls renderInterests(filterInput.value).

// ===== Requirement 3: form summary =====

// TODO: add a submit listener to messageForm. Inside it:
//   1. Call event.preventDefault() as the first line.
//   2. Read senderName.value and senderMessage.value.
//   3. Write a sentence like "Thanks, Ada. Your message has 42 characters." into formSummary (use message.length).
//   4. Clear both fields by setting their value to an empty string.
