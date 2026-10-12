// basics.js: JavaScript fundamentals, practiced with the Case-Shiller housing data.
// Run this file by opening index.html in a browser and reading the Console tab.
// The array housingData comes from data.js, which index.html loads before this file.

// ===== Part 1: Variables and data types =====

// const creates a variable that cannot be reassigned; use it by default.
const cityName = "Miami";
// A string is text inside quotes.
const latestMiami = 447.519;
// A number: JavaScript has one number type for whole numbers and decimals.
let monthsLoaded = 0;
// let creates a variable that CAN be reassigned later.
monthsLoaded = housingData.length;
// Reassigning a let variable is allowed.
const isRecent = true;
// A boolean is true or false (lowercase, unlike Python's True and False).
const nothingYet = null;
// null means "intentionally empty".
let notSetYet;
// A variable declared with no value holds undefined.

console.log("Part 1: variables and types");
// console.log prints to the browser console, like print() in Python.
console.log(cityName, typeof cityName);
// typeof reports the type of a value: "string".
console.log(latestMiami, typeof latestMiami);
// typeof reports "number".
console.log(monthsLoaded, isRecent, nothingYet, notSetYet);
// Prints: 474 true null undefined.
console.log(`The latest ${cityName} index value is ${latestMiami}.`);
// A template literal uses backticks and ${ } to insert values, like a Python f-string.

// ===== Part 2: Operators and equality =====

console.log("Part 2: operators and equality");
// Section label in the console.
console.log(10 / 4);
// Division gives 2.5 (there is no separate integer division operator).
console.log(Math.round(447.519));
// Math.round rounds to the nearest whole number: 448.
console.log(5 === 5, 5 === "5");
// === compares value AND type: true, false.
console.log(5 == "5");
// == converts types first and gives true; avoid ==, always use ===.
console.log(Boolean(0), Boolean(""), Boolean("text"), Boolean([]));
// Falsy values (0, "", null, undefined, NaN) become false; most others become true.
console.log(true && false, true || false, !true);
// && is "and", || is "or", ! is "not".

// ===== Part 3: Conditionals =====

console.log("Part 3: conditionals");
// Section label in the console.
const latestRow = housingData[housingData.length - 1];
// The last element has index length - 1 (JavaScript has no negative index like Python's [-1]).
if (latestRow.miami > latestRow.national) {
  // The condition goes in parentheses; the body goes in braces.
  console.log("Miami is above the national index.");
  // Runs when the condition is true.
} else if (latestRow.miami === latestRow.national) {
  // else if is written as two words (Python uses elif).
  console.log("Miami equals the national index.");
  // Runs when the first condition is false and this one is true.
} else {
  // else handles everything left over.
  console.log("Miami is below the national index.");
  // Runs when no earlier condition was true.
}
// End of the if statement.
const trend = latestRow.tampa > 370 ? "above 370" : "at or below 370";
// The ternary operator is condition ? valueIfTrue : valueIfFalse.
console.log("Tampa is " + trend);
// + joins strings (a template literal is usually easier to read).

// ===== Part 4: Loops =====

console.log("Part 4: loops");
// Section label in the console.
for (let i = 0; i < 3; i++) {
  // Three parts: start (let i = 0), keep going while (i < 3), step (i++ adds 1).
  console.log("Row", i, housingData[i].date);
  // Reads the row at position i and prints its date.
}
// End of the counting loop.
for (const row of housingData.slice(0, 3)) {
  // for...of visits each element directly, like Python's for row in list.
  console.log("Miami in", row.date, "was", row.miami);
  // Prints one line per row.
}
// End of the for...of loop.
let yearsCounted = 0;
// Counter for the while loop.
let yearToCheck = 2000;
// Starting year.
while (yearToCheck <= 2005) {
  // A while loop repeats as long as the condition is true.
  yearsCounted = yearsCounted + 1;
  // Add 1 to the counter.
  yearToCheck = yearToCheck + 1;
  // Move to the next year, or the loop would never stop.
}
// End of the while loop.
console.log("Years counted from 2000 through 2005:", yearsCounted);
// Prints 6.

// ===== Part 5: Functions =====

console.log("Part 5: functions");
// Section label in the console.
function percentChange(startValue, endValue) {
  // A function declaration: keyword, name, parameters in parentheses, body in braces.
  const difference = endValue - startValue;
  // Named intermediate value.
  const ratio = difference / startValue;
  // Change as a fraction of the start.
  const percent = ratio * 100;
  // Convert the fraction to a percent.
  return percent;
  // return sends a value back to the code that called the function.
}
// End of the function.
const rowJan2000 = housingData.find(function (row) {
  // find returns the first element for which the function returns true; here the function has no name.
  return row.date === "2000-01-01";
  // Compare the date string to the one we want.
});
// End of the find call.
const miamiGrowth = percentChange(rowJan2000.miami, latestRow.miami);
// Calls our function with two numbers and stores the result.
console.log("Miami change since Jan 2000 (%):", miamiGrowth.toFixed(1));
// toFixed(1) rounds to 1 decimal place and returns text.

function describeCity(city, value, decimals = 1) {
  // decimals = 1 is a default parameter, used when the caller leaves it out.
  return `${city}: ${value.toFixed(decimals)}`;
  // Builds and returns a string.
}
// End of the function.
console.log(describeCity("Tampa", latestRow.tampa));
// Uses the default of 1 decimal place.
console.log(describeCity("Tampa", latestRow.tampa, 3));
// Overrides the default with 3.

const doubleIt = (number) => {
  // An arrow function: parameters, then =>, then the body. It is a value stored in a constant.
  return number * 2;
  // Returns twice the input.
};
// End of the arrow function.
console.log("Arrow function result:", doubleIt(21));
// Prints 42.

// ===== Part 6: Arrays and array methods =====

console.log("Part 6: arrays and array methods");
// Section label in the console.
console.log("Number of rows:", housingData.length);
// .length is a property, not a function call (Python uses len()).
console.log("First date:", housingData[0].date);
// Index 0 is the first element.
const smallList = [10, 20, 30];
// An array literal uses square brackets.
smallList.push(40);
// push adds an element to the end (Python: append).
console.log(smallList);
// Prints [10, 20, 30, 40].

const juneRows = housingData.filter(function (row) {
  // filter keeps the elements for which the function returns true.
  return row.date.endsWith("-06-01");
  // endsWith checks whether the string ends with the given text.
});
// End of the filter call.
console.log("June rows:", juneRows.length);
// One June per year: 40.

const miamiValues = juneRows.map(function (row) {
  // map builds a NEW array by running the function on every element.
  return row.miami;
  // Keep only the Miami value from each row.
});
// End of the map call.
console.log("First three June Miami values:", miamiValues.slice(0, 3));
// slice(0, 3) copies positions 0, 1, and 2.

const firstAbove300 = housingData.find((row) => row.miami > 300);
// Arrow function with one expression: the result is returned automatically.
console.log("First month Miami passed 300:", firstAbove300.date);
// Prints the date of that row.

const years = [2000, 2006, 2012];
// A small array to test membership.
console.log(years.includes(2006), years.includes(1999));
// includes returns true or false: true, false.

const sortedValues = [...miamiValues].sort((a, b) => b - a);
// [...miamiValues] copies the array first (sort changes the original); the comparison puts larger numbers first.
console.log("Highest June Miami value:", sortedValues[0]);
// Position 0 now holds the largest value.

housingData.slice(0, 2).forEach((row) => {
  // forEach runs the function once per element and returns nothing.
  console.log("forEach saw", row.date);
  // Prints the date for each of the two rows.
});
// End of the forEach call.

// ===== Part 7: Objects =====

console.log("Part 7: objects");
// Section label in the console.
const sampleRow = housingData[0];
// Each row is an object: a set of key and value pairs (like a Python dict).
console.log(sampleRow.date, sampleRow["miami"]);
// Dot notation and bracket notation both read a value.
const { date, tampa } = sampleRow;
// Destructuring pulls properties into variables with the same names.
console.log(date, tampa);
// Prints the date and the Tampa value.
const rowWithNote = { ...sampleRow, note: "first month in the data" };
// The spread operator copies every property into a new object, then we add one more.
console.log(rowWithNote);
// Prints the new object.
console.log(Object.keys(sampleRow));
// Object.keys lists the property names.

// ===== Part 8: JSON =====

console.log("Part 8: JSON");
// Section label in the console.
const jsonText = JSON.stringify(housingData.slice(0, 2));
// JSON.stringify turns JavaScript data into JSON text.
console.log(jsonText);
// JSON text is a string, which is how APIs send data.
const parsedBack = JSON.parse(jsonText);
// JSON.parse turns JSON text back into JavaScript data.
console.log(parsedBack[1].miami);
// Reads the Miami value from the second row.

// ===== Part 9: Scope =====

console.log("Part 9: scope");
// Section label in the console.
const outerValue = "visible everywhere below this line";
// Declared at the top level of the file, so every later line can use it.
if (true) {
  // Braces create a block. let and const variables declared inside stay inside.
  const innerValue = "visible only inside these braces";
  // This constant exists only until the closing brace.
  console.log(outerValue);
  // Allowed: an inner block can read outer variables.
  console.log(innerValue);
  // Allowed: we are still inside the block.
}
// End of the block. innerValue no longer exists.
console.log(typeof innerValue);
// typeof reports "undefined" for a name that does not exist here.
try {
  // try runs code that might fail, so one error does not stop the whole script.
  cityName = "Tampa";
  // cityName was declared with const in Part 1, so reassigning it is an error.
} catch (error) {
  // catch runs only if the try block threw an error.
  console.log("Error:", error.message);
  // error.message holds the plain-language description of what went wrong.
}
// End of try and catch.
