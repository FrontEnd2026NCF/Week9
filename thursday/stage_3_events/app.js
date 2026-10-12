// app.js (Stage 3): respond to events. The controls change which rows are shown.
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
// The start year number input.
const endYearInput = document.querySelector("#end-year");
// The end year number input.
const sampleSelect = document.querySelector("#sample");
// The dropdown that chooses June rows or every month.
const sortButton = document.querySelector("#sort-button");
// The button that flips the sort order.
const latestLabel = document.querySelector("#latest-label");
// Label for the latest month.
const latestMiami = document.querySelector("#latest-miami");
// Latest Miami value element.
const latestTampa = document.querySelector("#latest-tampa");
// Latest Tampa value element.
const latestNational = document.querySelector("#latest-national");
// Latest national value element.

// ===== Step 2: Data that changes while the page is open =====

let sortNewestFirst = false;
// let, because this value changes when the visitor clicks the sort button.

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Short month names; position 0 is January.

// ===== Step 3: Helper functions =====

function formatMonth(dateText) {
  // Turns "2026-06-01" into "Jun 2026".
  const parts = dateText.split("-");
  // Split at hyphens: ["2026", "06", "01"].
  const monthNumber = Number(parts[1]);
  // Convert "06" to the number 6.
  const monthName = monthNames[monthNumber - 1];
  // Arrays start at 0, so subtract 1.
  return monthName + " " + parts[0];
  // Join month name and year.
}
// End of formatMonth.

function addCell(rowElement, text) {
  // Creates a td with the given text and adds it to a row.
  const cell = document.createElement("td");
  // Make the cell in memory.
  cell.textContent = text;
  // Set its text safely.
  rowElement.append(cell);
  // Add it to the row.
}
// End of addCell.

function getFilteredRows() {
  // Reads the controls and returns the rows that match them.
  const startYear = Number(startYearInput.value);
  // The input's value is always text, so convert it to a number.
  const endYear = Number(endYearInput.value);
  // Same for the end year.
  const sampleChoice = sampleSelect.value;
  // "june" or "all", from the option's value attribute.
  message.textContent = "";
  // Clear any earlier message.
  if (startYearInput.value === "" || endYearInput.value === "") {
    // An empty input has the value "" (Number("") would wrongly give 0).
    message.textContent = "Enter both a start year and an end year.";
    // Tell the visitor what to fix.
    return [];
    // An empty array means no rows to show.
  }
  // End of the empty check.
  if (startYear > endYear) {
    // The range is backwards.
    message.textContent = "The start year must be less than or equal to the end year.";
    // Tell the visitor what to fix.
    return [];
    // No rows to show.
  }
  // End of the range check.
  const filtered = housingData.filter(function (row) {
    // Keep rows that pass both tests.
    const year = Number(row.date.slice(0, 4));
    // The first four characters of "2026-06-01" are the year.
    const inRange = year >= startYear && year <= endYear;
    // True when the year is inside the chosen range.
    const monthOk = sampleChoice === "all" || row.date.endsWith("-06-01");
    // True when we show every month, or when this row is a June row.
    return inRange && monthOk;
    // Keep the row only if both are true.
  });
  // End of filter.
  const ordered = [...filtered];
  // Copy the array so reverse() does not change the filtered array.
  if (sortNewestFirst) {
    // The visitor chose newest first.
    ordered.reverse();
    // reverse flips the array in place.
  }
  // End of the sort check.
  return ordered;
  // Send the rows back.
}
// End of getFilteredRows.

function updateSelectedCount() {
  // Counts rows that have the class "selected" and writes the number.
  const selectedRows = tableBody.querySelectorAll("tr.selected");
  // querySelectorAll returns every match, not only the first.
  selectedCount.textContent = "Selected rows: " + selectedRows.length;
  // Write the count.
}
// End of updateSelectedCount.

// ===== Step 4: Render functions =====

function renderTable(rows) {
  // Rebuilds the table body from an array of rows.
  tableBody.innerHTML = "";
  // Clear the old rows.
  for (const row of rows) {
    // Visit each data row.
    const tableRow = document.createElement("tr");
    // New table row.
    addCell(tableRow, formatMonth(row.date));
    // Month label cell.
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
  updateSelectedCount();
  // New rows start unselected, so refresh the selected count.
}
// End of renderTable.

function renderLatest() {
  // Fills the three cards with the newest month.
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

// ===== Step 5: Event handlers =====

function handleControlChange() {
  // Runs when any control changes; re-reads the controls and redraws the table.
  const rows = getFilteredRows();
  // Get the rows that match the controls.
  renderTable(rows);
  // Draw them.
}
// End of handleControlChange.

startYearInput.addEventListener("change", handleControlChange);
// addEventListener(eventName, function): run handleControlChange when the start year changes.
endYearInput.addEventListener("change", handleControlChange);
// Same for the end year.
sampleSelect.addEventListener("change", handleControlChange);
// Same for the dropdown.

sortButton.addEventListener("click", function () {
  // An unnamed function used as the click handler.
  sortNewestFirst = !sortNewestFirst;
  // ! flips true to false and false to true.
  if (sortNewestFirst) {
    // Newest first is on.
    sortButton.textContent = "Sort: newest first";
    // Button text describes the current order.
  } else {
    // Oldest first is on.
    sortButton.textContent = "Sort: oldest first";
    // Button text describes the current order.
  }
  // End of the text update.
  handleControlChange();
  // Redraw the table in the new order.
});
// End of the click handler.

tableBody.addEventListener("click", function (event) {
  // One listener on the table body handles clicks on every row, including rows added later (event delegation).
  const clickedRow = event.target.closest("tr");
  // event.target is the element that was clicked; closest("tr") finds the row that contains it.
  if (clickedRow === null) {
    // The click was not inside a row.
    return;
    // Do nothing.
  }
  // End of the null check.
  clickedRow.classList.toggle("selected");
  // toggle adds the class if it is missing and removes it if it is present.
  updateSelectedCount();
  // Update the count.
});
// End of the click handler.

// ===== Step 6: Run when the page loads =====

renderLatest();
// Fill the cards.
handleControlChange();
// Draw the table using the starting values of the controls.
