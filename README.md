# Jamol Shoymurzaev, portfolio

Static site. No build step.

## Files

- `index.html` – home page
- `abusahiy-go.html` – case study
- `css/style.css` – all styles. Colours and fonts are at the top under `:root`
- `js/i18n.js` – every sentence on the site, in EN, RU and UZ. Edit copy here
- `js/main.js` – language switch (follows the browser language, remembers the choice), theme toggle, Tashkent clock
- `assets/` – photo and CV PDF

## Edit copy

Find the key in `js/i18n.js` and change the text in each language. The HTML
carries the English text as a fallback; the script replaces it on load.

## Add a CV in another language

1. Put the PDF in `assets/`.
2. In `index.html`, duplicate the "Download CV" link in the contact card and
   point it at the new file. Add a translation key for its label in `js/i18n.js`.

## Publish on GitHub Pages

The site lives in the `JamolsHyper/jamol-cv` repository and is served at
https://jamolshyper.github.io/jamol-cv/ from the `main` branch (Settings →
Pages → Deploy from a branch → `main` / root).

To publish a change:

```
git add -A
git commit -m "Describe the change"
git push
```

The site updates within a minute or two.

## Run locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.
