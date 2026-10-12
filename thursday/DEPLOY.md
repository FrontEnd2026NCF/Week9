# Deploying your page with GitHub Pages

GitHub Pages hosts static websites for free. A static website is a set of files (HTML, CSS, JavaScript, images) that the browser downloads and runs. GitHub Pages does not run Python, so Streamlit apps cannot be hosted there, but everything you wrote this week can.

## Before you start

- You need a GitHub account (you created one in Week 2).
- Your repository must be public (free accounts can only publish public repositories).
- Your main page must be named `index.html` and must be in the top folder of the repository, not inside a subfolder.
- Every path inside your files must be relative, for example `images/photo.jpg` or `styles.css`. A path that starts with `C:\` or `/Users/` only works on your own computer.

## Steps

1. Create a new public repository on GitHub named `personal-page` (any name works; this guide uses `personal-page`).
2. Copy your files into a local folder. The folder should contain `index.html`, `styles.css`, `script.js`, and an `images` folder.
3. Open a terminal in that folder and run:
   ```
   git init
   git add .
   git commit -m "First version of my personal page"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/personal-page.git
   git push -u origin main
   ```
   Replace `YOUR-USERNAME` with your GitHub username.
4. On GitHub, open the repository and choose **Settings**.
5. In the left sidebar choose **Pages**.
6. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
7. Under **Branch**, choose **main** and the folder **/ (root)**, then choose **Save**.
8. Wait one to two minutes. Refresh the Pages settings screen. A message appears at the top: "Your site is live at ...".
9. Your site address has this form: `https://YOUR-USERNAME.github.io/personal-page/`

## Updating your site

Every time you push to the `main` branch, GitHub Pages publishes the new version automatically, usually within a minute or two:

```
git add .
git commit -m "Describe what you changed"
git push
```

## If your page does not look right

- A blank page or a 404 error: check that the file is named `index.html` (all lowercase) and sits in the top folder.
- Styles or images missing: filenames are case-sensitive on the server. `Styles.css` and `styles.css` are different files there, even if your computer treats them as the same.
- JavaScript not working: open the browser console (F12) and read the first red error message. It names the file and line.
- Changes not appearing: wait two minutes, then do a hard refresh (Ctrl + Shift + R on Windows, Command + Shift + R on Mac).
