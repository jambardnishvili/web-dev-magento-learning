# Web Dev and Magento Learning Site

Reference-first learning site for web development, PHP, Magento, and runtime/devops concepts.

## Local setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
npm install
npx playwright install chromium
mkdocs serve
```

## Verify before push

```bash
source .venv/bin/activate
mkdocs build --strict
npm run docs:test
```

Or run both in one command:

```bash
npm run docs:verify
```

## Publish

Push to the default branch on GitHub. The included GitHub Actions workflow builds the site and deploys it to GitHub Pages.
