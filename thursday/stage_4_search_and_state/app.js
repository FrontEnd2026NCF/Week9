// app.js (Stage 4): keep the page's data in one state object and redraw from it with render().
// housingData is defined in data.js, which index.html loads first.

// ===== Step 1: Select the elements we will use =====

const tableBody = document.querySelector("#table-body");
// The table body that receives the rows.
const rowCount = document.querySelector("#row-count");
// Text showing how many rows are displayed.
const selectedCount = document.querySelector("#selected-count");
// Text showing how many rows are selected.
const message = document.querySelector("#message");
// Text for messages about invalid input.
const startYearInput = document.querySelector("#start-year");
// The start year input.
const endYearInput = document.querySelector("#end-year");
// The end year input.
const sampleSelect = document.querySelector("#sample");
// The June or every-month dropdown.
const searchInput = document.querySelector("#search");
// The live search box.
const sortButton = document.querySelector("#sort-button");
// The sort button.
const latestLabel = document.querySelector("#latest-label");
// Label for the latest month.
const latestMiami = document.querySelector("#latest-miami");
// Latest Miami value element.
const latestTampa = document.querySelector("#latest-tampa");
// Latest Tampa value element.
const latestNational = document.querySelector("#latest-national");
// Latest national value element.
const compareForm = document.querySelector("#compare-form");
// The compare form.
const compareCity = document.querySelector("#compare-city");
// City dropdown in the compare form.
const compareFrom = document.querySelector("#compare-from");
// From-year input in the compare form.
const compareTo = document.querySelector("#compare-to");
// To-year input in the compare form.
const compareResult = document.querySelector("#compare-result");
// Paragraph that shows the comparison result.

// ===== Step 2: State =====

const state = {
  // One object holds everything the table display depends on.
  startYearText: "1987",
  // Start year, kept as the text from the input.
  endYearText: "2026",
  // End year, kept as text.
  sample: "june",
  // "june" or "all".
  searchText: "",
  // What the visitor typed in the search box.
  sortNewestFirst: false,
  // Sort direction.
  selectedDates: []
  // Dates of the rows the visitor clicked, for example "2006-06-01".
};
// End of the state object. The rule: handlers change state, and render() draws from state.

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Short month names.

const cityLabels = { miami: "Miami", tampa: "Tampa", national: "United States" };
// Maps the option values to display names.

// ===== Step 3: Helper functions =====

function formatMonth(dateText) {
  // Turns "2026-06-01" into "Jun 2026".
  const parts = dateText.split("-");
  // Split at hyphens.
  const monthNumber = Number(parts[1]);
  // "06" becomes 6.
  const monthName = monthNames[monthNumber - 1];
  // Arrays start at 0.
  return monthName + " " + parts[0];
  // Join month name and year.
}
// End of formatMonth.

function percentChange(startValue, endValue) {
  // Percent change from startValue to endValue.
  const difference = endValue - startValue;
  // How much the value changed.
  const ratio = difference / startValue;
  // Change as a fraction of the start.
  return ratio * 100;
  // Convert to percent.
}
// End of percentChange.

function findJuneRow(year) {
  // Returns the June row for a year, or undefined when there is none.
  const wantedDate = year + "-06-01";
  // Build the date text, for example "2006-06-01".
  const match = housingData.find(function (row) {
    // find returns the first row where the function returns true.
    return row.date === wantedDate;
    // Compare the row's date to the one we want.
  });
  // End of find.
  return match;
  // The row, or undefined.
}
// End of findJuneRow.

function addCell(rowElement, text) {
  // Creates a td with text and adds it to a row.
  const cell = document.createElement("td");
  // Make the cell.
  cell.textContent = text;
  // Set its text safely.
  rowElement.append(cell);
  // Add it to the row.
}
// End of addCell.

function getVisibleRows() {
  // Uses state to decide which rows to show. It reads state only, never the page.
  const startYear = Number(state.startYearText);
  // Convert the start year text to a number.
  const endYear = Number(state.endYearText);
  // Convert the end year text to a number.
  const search = state.searchText.trim().toLowerCase();
  // trim removes spaces at the ends; toLowerCase makes the search ignore capital letters.
  const filtered = housingData.filter(function (row) {
    // Keep rows that pass every test.
    const year = Number(row.date.slice(0, 4));
    // Year of this row.
    const inRange = year >= startYear && year <= endYear;
    // Inside the chosen years?
    const monthOk = state.sample === "all" || row.date.endsWith("-06-01");
    // Matches the June or every-month choice?
    const label = formatMonth(row.date).toLowerCase();
    // For example "jun 2026".
    const matchesSearch = search === "" || label.includes(search);
    // Empty search matches everything; otherwise the label must contain the typed text.
    return inRange && monthOk && matchesSearch;
    // Keep the row only if all three are true.
  });
  // End of filter.
  const ordered = [...filtered];
  // Copy before reversing.
  if (state.sortNewestFirst) {
    // Newest first requested.
    ordered.reverse();
    // Flip the order.
  }
  // End of the sort check.
  return ordered;
  // Send the rows back.
}
// End of getVisibleRows.

function getMessage() {
  // Returns the message to show for invalid input, or an empty string.
  if (state.startYearText === "" || state.endYearText === "") {
    // A year input is empty.
    return "Enter both a start year and an end year.";
    // Message for empty input.
  }
  // End of the empty check.
  if (Number(state.startYearText) > Number(state.endYearText)) {
    // The range is backwards.
    return "The start year must be less than or equal to the end year.";
    // Message for a backwards range.
  }
  // End of the range check.
  return "";
  // No problem found.
}
// End of getMessage.

// ===== Step 4: render() draws the page from state =====

function render() {
  // Redraws the message, the table, and the counts. Call it after every change to state.
  const messageText = getMessage();
  // Check the year range.
  message.textContent = messageText;
  // Show the message, or clear it.
  let rows = [];
  // Start with no rows.
  if (messageText === "") {
    // Only compute rows when the input is valid.
    rows = getVisibleRows();
    // Get the rows that match the state.
  }
  // End of the validity check.
  tableBody.innerHTML = "";
  // Clear the old rows.
  for (const row of rows) {
    // Visit each row.
    const tableRow = document.createElement("tr");
    // New table row.
    tableRow.dataset.date = row.date;
    // Store the date on the element as data-date so a click can tell which row it was.
    if (state.selectedDates.includes(row.date)) {
      // This row was selected earlier.
      tableRow.classList.add("selected");
      // Mark it as selected.
    }
    // End of the selected check.
    addCell(tableRow, formatMonth(row.date));
    // Month cell.
    addCell(tableRow, row.miami.toFixed(3));
    // Miami cell.
    addCell(tableRow, row.tampa.toFixed(3));
    // Tampa cell.
    addCell(tableRow, row.national.toFixed(3));
    // National cell.
    tableBody.append(tableRow);
    // Put the row on the page.
  }
  // End of loop.
  rowCount.textContent = "Rows showing: " + rows.length + ".";
  // Update the row count.
  selectedCount.textContent = "Selected rows: " + state.selectedDates.length;
  // Count comes from state, so selections survive filtering and sorting.
}
// End of render.

function renderLatest() {
  // Fills the three cards with the newest month. It runs once.
  const newestRow = housingData[housingData.length - 1];
  // Last element of the array.
  latestLabel.textContent = "Newest month in the data: " + formatMonth(newestRow.date);
  // Month label.
  latestMiami.textContent = newestRow.miami.toFixed(3);
  // Miami value.
  latestTampa.textContent = newestRow.tampa.toFixed(3);
  // Tampa value.
  latestNational.textContent = newestRow.national.toFixed(3);
  // National value.
}
// End of renderLatest.

// ===== Step 5: Event handlers update state, then call render() =====

startYearInput.addEventListener("change", function () {
  // The start year changed.
  state.startYearText = startYearInput.value;
  // Copy the input's text into state.
  render();
  // Redraw.
});
// End of handler.

endYearInput.addEventListener("change", function () {
  // The end year changed.
  state.endYearText = endYearInput.value;
  // Copy the input's text into state.
  render();
  // Redraw.
});
// End of handler.

sampleSelect.addEventListener("change", function () {
  // The dropdown changed.
  state.sample = sampleSelect.value;
  // Copy the choice into state.
  render();
  // Redraw.
});
// End of handler.

searchInput.addEventListener("input", function () {
  // The input event fires on every keystroke, unlike change, which waits until the box loses focus.
  state.searchText = searchInput.value;
  // Copy the text into state.
  render();
  // Redraw, so the table filters as the visitor types.
});
// End of handler.

sortButton.addEventListener("click", function () {
  // The sort button was clicked.
  state.sortNewestFirst = !state.sortNewestFirst;
  // Flip the direction in state.
  if (state.sortNewestFirst) {
    // Newest first is on.
    sortButton.textContent = "Sort: newest first";
    // Describe the current order.
  } else {
    // Oldest first is on.
    sortButton.textContent = "Sort: oldest first";
    // Describe the current order.
  }
  // End of the text update.
  render();
  // Redraw.
});
// End of handler.

tableBody.addEventListener("click", function (event) {
  // One listener handles clicks on every row.
  const clickedRow = event.target.closest("tr");
  // Find the row that contains the clicked element.
  if (clickedRow === null) {
    // The click was not inside a row.
    return;
    // Do nothing.
  }
  // End of the null check.
  const date = clickedRow.dataset.date;
  // Read back the date stored in data-date.
  if (state.selectedDates.includes(date)) {
    // The row is already selected, so unselect it.
    const remaining = state.selectedDates.filter(function (savedDate) {
      // Keep every date except the clicked one.
      return savedDate !== date;
      // True for all other dates.
    });
    // End of filter.
    state.selectedDates = remaining;
    // Replace the list in state.
  } else {
    // The row is not selected yet.
    state.selectedDates.push(date);
    // Add its date to state.
  }
  // End of the selection update.
  render();
  // Redraw.
});
// End of handler.

compareForm.addEventListener("submit", function (event) {
  // Runs when the visitor presses Calculate or presses Enter inside the form.
  event.preventDefault();
  // Stops the browser's default action, which would reload the page and erase everything.
  const city = compareCity.value;
  // "miami", "tampa", or "national".
  const fromYear = Number(compareFrom.value);
  // Starting year as a number.
  const toYear = Number(compareTo.value);
  // Ending year as a number.
  const fromRow = findJuneRow(fromYear);
  // June row for the starting year, or undefined.
  const toRow = findJuneRow(toYear);
  // June row for the ending year, or undefined.
  if (fromRow === undefined || toRow === undefined) {
    // At least one year is outside the data.
    compareResult.textContent = "Choose years from 1987 to 2026.";
    // Tell the visitor what to fix.
    return;
    // Stop here.
  }
  // End of the missing-row check.
  if (fromYear === toYear) {
    // The two years are the same, so there is nothing to compare.
    compareResult.textContent = "Choose two different years.";
    // Tell the visitor what to fix.
    return;
    // Stop here.
  }
  // End of the same-year check.
  const percent = percentChange(fromRow[city], toRow[city]);
  // fromRow[city] reads the property whose name is stored in the variable city.
  let direction = "rose";
  // Default wording.
  if (percent < 0) {
    // The index went down.
    direction = "fell";
    // Change the wording.
  }
  // End of the direction check.
  const size = Math.abs(percent).toFixed(1);
  // Math.abs drops the minus sign; toFixed(1) keeps one decimal place.
  compareResult.textContent = cityLabels[city] + " index " + direction + " " + size + "% between June " + fromYear + " and June " + toYear + ".";
  // Build the sentence and show it.
});
// End of handler.

// ===== Step 6: Run when the page loads =====

renderLatest();
// Fill the cards once.
render();
// Draw the table from the starting state.
