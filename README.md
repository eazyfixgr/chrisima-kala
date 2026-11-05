# Χρήσιμα & Καλά — market (demo)

Static market website (HTML/CSS/JS) with a product catalogue and a product landing
page for the first item, the **Solar Emergency Power Kit**. Temporary host: GitHub Pages.

## Δομή

```
index.html                      Κεντρική σελίδα (κατάλογος προϊόντων)
assets/
  css/main.css                  Κοινό design system (tokens, header, footer, κάρτες)
  css/product.css               Στυλ σελίδας προϊόντος
  js/i18n.js                    Μηχανισμός γλωσσών (GR προεπιλογή, EN έτοιμο)
  js/main.js                    Κοινά scripts (reveal, ασφάλεια links)
  js/product.js                 Λογική παραγγελίας (πακέτα, σύνοψη, validation, preview)
  images/*.svg                  Ενδεικτικές εικονογραφήσεις (placeholders)
products/
  solar-kit/index.html          Σελίδα προϊόντος Solar Emergency Power Kit
```

## Τοπική προβολή

Άνοιγμα του `index.html` σε browser αρκεί. Για πιο σωστή συμπεριφορά:

```powershell
python -m http.server 8000
# http://localhost:8000
```

## Δημοσίευση σε GitHub Pages (προσωρινά)

1. `git init` και commit όλων των αρχείων.
2. Δημιουργία repo στο GitHub και `git remote add origin <url>`.
3. `git push -u origin main`.
4. Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / root.
5. Το site θα είναι διαθέσιμο στο `https://<user>.github.io/<repo>/`.

Όλες οι διαδρομές είναι σχετικές (χωρίς leading `/`), οπότε δουλεύει και σε subpath.
Το `.nojekyll` είναι παρόν ώστε να μη τρέχει επεξεργασία Jekyll.

## Γλώσσες (i18n)

- Τα ελληνικά είναι η πηγή και βρίσκονται inline στο HTML (progressive enhancement).
- Κάθε μεταφράσιμο στοιχείο έχει `data-i18n="key"` (ή `data-i18n-html`,
  `data-i18n-placeholder`, `data-i18n-aria`, `data-i18n-title`).
- Οι αγγλικές μεταφράσεις βρίσκονται στο `assets/js/i18n.js` (dict `en`).
  Ό,τι λείπει πέφτει αυτόματα στα ελληνικά.
- Για νέα γλώσσα: προσθήκη locale στο `SUPPORTED`, στο `dict`, και κουμπί `data-lang`.
- Η επιλογή αποθηκεύεται στο `localStorage` (`xk-lang`).

## Σημειώσεις

Ενδεικτικό demo: ονόματα, εικόνες, τιμές και προδιαγραφές είναι placeholders.
Πριν από πραγματική λειτουργία απαιτούνται στοιχεία επιχείρησης, όροι πώλησης,
πολιτική απορρήτου, πραγματικές φωτογραφίες και επιβεβαιωμένα χαρακτηριστικά.
