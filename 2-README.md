# Stacknity.ai website

One-page static site. No build step, no dependencies - plain HTML/CSS/JS.

## Files
- `index.html` - the whole site (styles and scripts inline)
- `mascot-robot.webp` - hero robot (transparent)
- `orb-core.webp` - manifesto orb (transparent)

## Run locally
Open `index.html` in a browser, or `python3 -m http.server` in this folder.

## Deploy (GitHub Pages)
1. Push this folder to the repo root (branch `main`).
2. Repo Settings -> Pages -> Source: "Deploy from a branch" -> `main` / root.
3. Live at `https://<username>.github.io/<repo>/` within a minute.

## Later: custom domain stacknity.ai
1. Buy the domain (registrar of choice).
2. Add 4 A records to GitHub Pages IPs (185.199.108.153, .109.153, .110.153, .111.153).
3. Add a `CNAME` file containing `stacknity.ai`, set the domain in Pages settings, enable HTTPS.
