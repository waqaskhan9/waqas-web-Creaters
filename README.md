# Waqas Web Design — Full-Stack Starter

## Project structure
- `server.js` — Node.js + Express backend server
- `public/` — website frontend (HTML, CSS, JavaScript)
- `public/images/` — your supplied logo and design reference
- `data/messages.json` — created automatically after the first contact form submission

## Run on a computer
1. Install Node.js.
2. Open this project folder in a terminal.
3. Run `npm install`
4. Run `npm start`
5. Open `http://localhost:3000`

## Important: Android / Acode
Acode can edit the HTML, CSS and JavaScript files, and its preview can show the frontend. The Express backend needs a Node.js runtime to run. If you only open `index.html` directly, the design will show, but the contact form API will not work until the server is running.

## Before publishing
- Replace the placeholder email text on `public/contact.html` with your real business email.
- Add real project screenshots and descriptions to `public/portfolio.html`.
- Deploy the Node.js app to a host that supports Node.js. Static-only hosting will show the pages but will not run the Express contact API.
- Add spam protection and a privacy notice before using the form for real client data.

## API
`POST /api/contact` accepts JSON:
`{ "name": "...", "email": "...", "subject": "...", "message": "..." }`

Messages are saved to `data/messages.json` on the server.
