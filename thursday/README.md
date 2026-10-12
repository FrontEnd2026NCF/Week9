# Week 9 Thursday: JavaScript, the DOM, Events, and GitHub Pages

Each stage folder is a complete page you can open on its own. `data/case_shiller_florida.csv` is the original data; each stage has its own copy as `data.js` so the page works without a server.

| Folder | What it covers |
| --- | --- |
| `stage_1_js_basics/` | Variables, types, conditionals, loops, functions, arrays, objects, JSON, scope. Open the browser console to see the output of `basics.js`. |
| `stage_2_dom/` | Selecting elements and building a table from the data with the DOM. |
| `stage_3_events/` | Event listeners: year range, sample choice, sort button, clickable rows. |
| `stage_4_search_and_state/` | A `state` object and a `render()` function, live search, and a form handled with `preventDefault`. |
| `modules_demo/` | `export` and `import` between two files. Modules need a server: open with VS Code Live Server, not by double-clicking (file:// is blocked by the browser). |
| `starter/` | Skeleton for the in-class activity. |

Other files:

- `PYTHON_TO_JAVASCRIPT.md`: side-by-side cheat sheet.
- `DEPLOY.md`: how to publish your page with GitHub Pages.

## In-class activity: add JavaScript to your personal page and publish it

Copy your Tuesday page into the `starter/` folder and complete `script.js`. Your page must have:

- [ ] A button that toggles dark mode with `classList.toggle`, and the button text changes to match
- [ ] A list built in JavaScript from an array of at least eight items, with a search box that filters it as you type and a count of the items showing
- [ ] A form that uses `event.preventDefault()` and shows a summary on the page
- [ ] Dark mode colors that still have a contrast ratio of at least 4.5 to 1
- [ ] No errors in the browser console
- [ ] Published with GitHub Pages (follow `DEPLOY.md`)

Submit the address of your live page.

## References

- [MDN: JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN: Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)
- [javascript.info](https://javascript.info/)
- [GitHub Pages documentation](https://docs.github.com/en/pages)
