// main.js: imports the shared functions and uses them.

import { percentChange, describeChange } from "./calculations.js";
// import names exactly as they were exported; the path starts with ./ for a file in this folder.

const miamiJan2000 = 99.943;
// Miami index value for January 2000, copied from data/case_shiller_florida.csv.
const miamiJun2026 = 447.519;
// Miami index value for June 2026, from the same file.

const percent = percentChange(miamiJan2000, miamiJun2026);
// Call the imported function.
console.log(describeChange("Miami", percent));
// Prints: Miami index rose 347.8%
