# Travlr Getaways — Full Stack Web Application

CS 465 Full Stack Development — Final Project
Author: Allan Torres

A full stack travel booking application built with the MEAN stack (MongoDB, Express, Angular, Node.js). It includes a customer-facing website rendered server-side with Handlebars templates, a RESTful API backed by MongoDB through Mongoose, and an Angular single-page application (SPA) for administering trip inventory with JWT-based authentication.

## Architecture

### Frontend Development Comparison

This project used three distinct frontend approaches. The Express HTML pages (Rooms, Meals, News, About, Contact) are static files served directly — simplest to build, but every navigation requires a full page load and content cannot change without editing the file. The customer-facing Travel page uses Express with Handlebars templates: the server queries MongoDB, binds trip data into the template, and sends back complete HTML — dynamic content, but still a full reload per request. The admin SPA is a pure JavaScript/TypeScript client application built with Angular: it loads once, then exchanges only JSON with the API and updates the DOM in place. The SPA delivers the richest interaction — instant form validation, in-place card updates, conditional rendering based on login state — at the cost of a larger initial download, mandatory JavaScript, and CORS configuration to allow cross-origin requests to the API.

### Why NoSQL MongoDB

MongoDB was chosen because trip data is naturally document-shaped: each trip contains nested arrays (description paragraphs) and fields that evolved over development (length, start date, resort, price were added later per the client wireframe). A document database allowed the schema to evolve without migrations — new fields simply appear in new documents. MongoDB also stores data as BSON, which maps directly to the JSON the API serves and the JavaScript objects the frontend consumes, eliminating an object-relational mapping layer. Mongoose adds the structure MongoDB lacks natively: schema validation, required fields, and model methods.

## Functionality

### JSON vs. JavaScript

JavaScript is a programming language; JSON (JavaScript Object Notation) is a data format derived from JavaScript object syntax but language-independent and text-only — no functions, no methods, just structured data. JSON is the contract between the frontend and backend in this project: the Express API serializes Mongoose documents to JSON on every GET response, and the Angular SPA sends JSON payloads in every POST/PUT request body. Both sides agree on the Trip shape (code, name, length, start, resort, perPerson, image, description), so the same data flows from MongoDB → Express → JSON over HTTP → Angular components → rendered cards, and back again when an admin edits a trip.

### Code Refactoring and Reusable UI Components

Several refactors improved functionality and efficiency during development:

1. **JSON file → Mongoose models** — trip data moved from reading a JSON file per request to a proper database layer with a validated schema, enabling real persistence and data integrity.
2. **Trip list → reusable Trip Card component** — the admin trip display was refactored from an inline table into a standalone `TripCardComponent` that receives a trip through an `@Input()` binding and emits edit/delete events through `@Output()` emitters. This keeps presentation logic in one place: any change to card layout updates everywhere automatically.
3. **API calls → centralized TripDataService** — all HTTP communication lives in one injectable Angular service rather than scattered across components, so the API base URL, token headers, and error handling are defined once.
4. **Inline auth logic → JWT middleware** — token verification was extracted into an Express middleware function applied to the protected routes, so every secured endpoint gets identical authentication behavior without duplicated code.

Reusable UI components pay off in consistency (every trip card looks and behaves identically), maintainability (one file to change), and testability (components can be tested in isolation).

## Testing

### Methods, Endpoints, and Security

A full stack application is tested at the API layer by exercising each HTTP method against its endpoint: **GET** retrieves resources (`/api/trips` for the collection, `/api/trips/:tripCode` for a single trip using the Mongoose `find` method), **POST** creates resources, **PUT** updates them, and **DELETE** removes them. Each endpoint was verified to return correct HTTP status codes — 200 for successful reads and updates, 201 for creation, 204 for deletion, 404 for missing resources, and 400 for schema validation failures.

Adding JWT security introduced a new testing dimension. Protected endpoints (POST/PUT/DELETE) were tested in three states: without a token (must return 401), with an invalid or expired token (must return 401), and with a valid token obtained through `/api/login` (must succeed). End-to-end testing confirmed the full pipeline: logging in through the SPA stores the token in localStorage, the TripDataService attaches it as a Bearer token in the Authorization header of every write request, and the Express middleware validates it before any database mutation occurs. The final verification showed changes made in the admin SPA persisting to MongoDB and appearing immediately on the customer-facing Travel page.


### Reflection

This course helped me bring together the knowledge I gathered over the last two years. It gave me a more thorough insight into how the industry operates and how a full stack developer — or a freelancer — delivers an all-in-one solution, from database design to deployment. Building the Travlr Getaways application end-to-end strengthened my web programming skills across the entire stack: server-side rendering with Express, database modeling with MongoDB and Mongoose, RESTful API design, single-page application development with Angular, and securing an application with token-based authentication. Most importantly, it taught me to synergize all of these skills into a single coherent product — the ability to design, build, test, and document a complete web application on my own makes me a far more marketable candidate for full stack and freelance development roles.
---

*Development and testing were supported by GitHub Copilot (Kimi K3), an AI pair-programming tool used for debugging assistance and code review; all generated content was verified by the author (GitHub Copilot, personal communication, October 2026).*
