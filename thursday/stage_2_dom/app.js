// app.js (Stage 2): use the DOM to build the page from the housingData array.
// housingData is defined in data.js, which index.html loads first.

// ===== Step 1: Select the elements we will change =====

const tableBody = document.querySelector("#table-body");
// querySelector finds the first element matching a CSS selector; #table-body matches id="table-body".
const rowCount = document.querySelector("#row-count");
// The paragraph that will say how many rows are shown.
const latestLabel = document.querySelector("#latest-label");
// The paragraph that will name the latest month.
const latestMiami = document.querySelector("#latest-miami");
// Element for the latest Miami value.
const latestTampa = document.querySelector("#latest-tampa");
// Element for the latest Tampa value.
const latestNational = document.querySelector("#latest-national");
// Element for the latest national value.

// ===== Step 2: Helper functions =====

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Short month names; position 0 is January.

function formatMonth(dateText) {
  // Turns "2026-06-01" into "Jun 2026".
  const parts = dateText.split("-");
  // split("-") breaks the text at each hyphen: ["2026", "06", "01"].
  const yearText = parts[0];
  // First piece is the year.
  const monthNumber = Number(parts[1]);
  // Number("06") converts the text to the number 6.
  const monthName = monthNames[monthNumber - 1];
  // Months are numbered from 1 but arrays start at 0, so subtract 1.
  return monthName + " " + yearText;
  // Join the month name and year with a space.
}
// End of formatMonth.

function getJuneRows() {
  // Returns one row per year: the June rows.
  const juneRows = housingData.filter(function (row) {
    // filter keeps rows for which this function returns true.
    return row.date.endsWith("-06-01");
    // True when the date text ends with "-06-01".
  });
  // End of filter.
  return juneRows;
  // Send the filtered array back to the caller.
}
// End of getJuneRows.

function addCell(rowElement, text) {
  // Creates a td, fills it with text, and adds it to a row.
  const cell = document.createElement("td");
  // createElement makes a new element in memory; it is not on the page yet.
  cell.textContent = text;
  // textContent sets the text inside the element, safely (it never treats the text as HTML).
  rowElement.append(cell);
  // append puts the new cell at the end of the row.
}
// End of addCell.

// ===== Step 3: Render functions =====

function renderTable(rows) {
  // Replaces the contents of the table body with one table row per data row.
  tableBody.innerHTML = "";
  // Setting innerHTML to an empty string removes all existing rows. We only use it to clear, never with user text.
  for (const row of rows) {
    // Visit each data row.
    const tableRow = document.createElement("tr");
    // Make a new table row.
    addCell(tableRow, formatMonth(row.date));
    // First cell: the month label.
    addCell(tableRow, row.miami.toFixed(3));
    // Second cell: Miami value with 3 decimal places.
    addCell(tableRow, row.tampa.toFixed(3));
    // Third cell: Tampa value.
    addCell(tableRow, row.national.toFixed(3));
    // Fourth cell: national value.
    tableBody.append(tableRow);
    // Add the finished row to the table body, which makes it appear on the page.
  }
  // End of loop.
  rowCount.textContent = "Rows showing: " + rows.length + ".";
  // Update the row count text.
}
// End of renderTable.

function renderLatest() {
  // Fills the three cards with the newest row of data.
  const newestRow = housingData[housingData.length - 1];
  // The last element of the array is the most recent month.
  latestLabel.textContent = "Newest month in the data: " + formatMonth(newestRow.date);
  // Write the month label.
  latestMiami.textContent = newestRow.miami.toFixed(3);
  // Write the Miami value.
  latestTampa.textContent = newestRow.tampa.toFixed(3);
  // Write the Tampa value.
  latestNational.textContent = newestRow.national.toFixed(3);
  // Write the national value.
}
// End of renderLatest.

// ===== Step 4: Run =====

renderLatest();
// Fill the cards when the page loads.
renderTable(getJuneRows());
// Build the table from the June rows when the page loads.
