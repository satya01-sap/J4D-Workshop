# SAP Build and Joule for Developers Workshop

## About this Workshop

This is a hands-on workshop focused on using **Joule for Developers (J4D)** inside SAP Business Application Studio to generate full-stack applications from natural language prompts — without writing boilerplate code manually.

You will build two real-world applications from scratch:
- A **CAP (Cloud Application Programming model)** full-stack app with a Fiori Elements UI
- A **RAP (RESTful ABAP Programming model)** transactional app with OData service

---

## Business Value of Joule for Developers

**Joule for Developers (J4D)** is SAP's AI copilot embedded directly in the developer toolchain. It accelerates development by:

- **Generating complete applications** — data models, OData services, and Fiori UI — from a single natural language prompt
- **Reducing boilerplate** — no manual scaffolding of CDS entities, service definitions, or UI annotations
- **Accelerating logic authoring** — annotations like `/cap-gen-logic` and `/cap-data-gen` let developers add validation and test data through conversation
- **Lowering the skill barrier** — developers new to CAP or RAP can be productive immediately, guided by AI rather than documentation
- **Shortening iteration cycles** — changes that previously took hours of manual coding can be done in minutes

---

## Exercises

| # | Exercise | Description |
|---|---|---|
| 1 | [Exercise 1: Generate a Full-Stack CAP Application Using Joule](pages/ex1-cap-app-gen/README.md) | Use Joule's Project Accelerator to generate a CAP app with data model, OData service, Fiori UI, and custom validation logic |
| 2 | [Exercise 2: Generate a RAP Transactional App from Scratch](pages/ex2-rap-app-gen/README.md) | Use Joule to generate a RAP business object, OData service, and Fiori Elements app in ADT |
