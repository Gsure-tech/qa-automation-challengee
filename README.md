# QA Automation Challenge

This project demonstrates a full-stack application with automated QA coverage, including:
- React frontend
- Node.js/Express backend
- Cypress tests for UI
- Postman API tests
- CI integration via GitHub Actions

---

## Project Structure

```
.
├── backend/                # Node.js Express API
├── qa-frontend/            # React frontend with Tailwind CSS and Cypress
├── postman/                # Postman collection
└── .github/workflows/      # GitHub Actions CI pipeline
```

---

## Requirements

- Node.js (v18+)
- npm
- Git
- Cypress CLI (optional for local testing)
- Postman or Newman CLI

---

## Running the App

```bash
# Start backend
cd qa-backend-task
npm install
npm start

# Start frontend (in new terminal)
cd ../qa-frontend-task
npm install
npm start
```

---

## Running Tests

### Cypress (UI)
```bash
cd qa-frontend-task
npx cypress open  # or use `npx cypress run` for headless mode
```

### Postman API Tests
Use the provided Postman collection:


---

## GitHub CI

The `.github/workflows/ci.yml` file runs Cypress tests on:
- Push to `main`
- Pull requests

It installs dependencies, starts both apps, and executes Cypress UI tests automatically.

---

## Author Notes

This is a demo QA project built for showcasing:
- Functional test automation
- Test coverage
- CI/CD integration

## Cypress Test Screenshots
- Login Test Page:


Contact: abubakarabdul9023@gmail.com
