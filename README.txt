ALPHABET CHALLENGE — OFFLINE WEB APP

CONTENTS: index.html, styles.css, app.js, answers.json, manifest.webmanifest, sw.js, and two icons.

EASIEST WAY TO PUT IT ON AN IPHONE:
1. Create a new PUBLIC GitHub repository (for example alphabet-challenge).
2. Upload the CONTENTS of this folder to the repository root (not the folder itself).
3. Repository Settings > Pages > Deploy from a branch > main > /(root) > Save.
4. Wait for GitHub Pages to publish, then open its HTTPS address in Safari on iPhone.
5. Wait for the page to load fully once. Safari Share > Add to Home Screen > Add.
6. Open it from the Home Screen. After first successful load and caching, it should work offline.

Note: On GitHub Pages, a public repository makes the answer database publicly accessible. This is a free test edition, not a paywalled product.

ON WINDOWS FOR LOCAL TESTING:
From this folder run: python -m http.server 8000
Open http://localhost:8000 on your Windows PC. Do NOT double-click index.html; service workers require localhost or HTTPS.

GAME RULES:
Leader runs the phone. One to four answering players, round-robin. Each turn moves to the next letter A-Z and next player. Correct +1, Pass +0. Timer is manually started, and timeouts require leader judgment. At Z, click New round. New round keeps scores. Restart A-Z keeps the category and scores. Setup changes player count and resets scores. Previous letter undoes the last advancement and its scoring.

EDITING DATABASE:
Edit the master spreadsheet, export as JSON with keys c (category), a (answer), t (tier), and replace answers.json. When deploying an updated app, increment the cache name in sw.js (v1 to v2) so installed devices fetch the update.
