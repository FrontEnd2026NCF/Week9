// calculations.js: a module that shares two functions with other files.

export function percentChange(startValue, endValue) {
  // The export keyword makes this function available to files that import it.
  const difference = endValue - startValue;
  // How much the value changed.
  const ratio = difference / startValue;
  // Change as a fraction of the start value.
  return ratio * 100;
  // Convert the fraction to a percent.
}
// End of percentChange.

export function describeChange(cityName, percent) {
  // A second shared function that builds a sentence.
  let direction = "rose";
  // Default wording.
  if (percent < 0) {
    // The value went down.
    direction = "fell";
    // Change the wording.
  }
  // End of the direction check.
  return cityName + " index " + direction + " " + Math.abs(percent).toFixed(1) + "%";
  // Join the pieces into one sentence.
}
// End of describeChange.
