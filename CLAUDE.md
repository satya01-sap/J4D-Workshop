# Workshop Project Instructions

This is a **docsify-based SAP hands-on workshop site**. Follow these instructions for every task in this project.

---

## Project Structure

```
RRWorkshop/
├── index.html            ← docsify config, plugins, runtime PDF generation
├── README.md             ← Workshop landing page (description, business value, exercise table)
├── agenda-sidebar.md     ← Docsify sidebar navigation
├── agenda-for-pdf.md     ← PDF TOC — links to all exercise READMEs
├── _assets/
│   ├── files/            ← exercises.pdf (pre-built static, also generated at runtime)
│   ├── images/           ← SAP logos and favicons
│   ├── js/               ← Credential substitution, exercise submission, form handling
│   └── styles/           ← iac.css custom styles
└── pages/
    ├── ex1-cap-app-gen/README.md
    └── ex2-rap-app-gen/README.md
        └── img/
```

Each exercise lives at `pages/exN-<short-slug>/README.md` with an `img/` subfolder.

---

## Adding a New Exercise

When asked to add a new exercise, always update **all five** of these touch points:

### 1. `pages/exN-<slug>/README.md` — Exercise content

Use this structure:

```markdown
# Exercise N: <Title> 💎

## Introduction

<2–3 sentences. Use full SAP product name on first use, then abbreviation.>

### Exercises

- [N.1 - <Step title>](#exercise-n1-<anchor>)
- [Summary & Next exercise](#summary--next-exercise)

> ℹ️ **Reminder:** Replace **`###`** with your group ID throughout.

---

## Exercise N.1: <Step title>

[^Top of page](#introduction)

> <One-line context sentence.>

<details>
  <summary>🔵 Click to expand!</summary>

1. Step instructions here.

</details>

---

## Summary & Next exercise

[^Top of page](#introduction)

Congratulations! In this exercise you used **<SAP Product>** to:

- <Outcome 1>
- <Outcome 2>

---

Continue to [Exercise N+1: <title>](../exN+1-<slug>/README.md).
```

### 2. `agenda-sidebar.md` — Sidebar navigation

Add under `Hands-on Exercises`:
```markdown
  - [N <Short title>](pages/exN-<slug>/README.md)
```

### 3. `agenda-for-pdf.md` — PDF table of contents

Add:
```markdown
- [Exercise N: <Title>](pages/exN-<slug>/README.md)
```

### 4. `index.html` — Runtime PDF generator

Add the new path to the `files` array in the `hook.ready` click listener:
```js
const files = [
  'pages/ex1-cap-app-gen/README.md',
  'pages/ex2-rap-app-gen/README.md',
  'pages/exN-<slug>/README.md',  // ← add here
];
```

### 5. `README.md` — Workshop landing page

Add a row to the exercises table:
```markdown
| N | [Exercise N: <Title>](pages/exN-<slug>/README.md) | <One-line description> |
```

---

## SAP Writing Standards

- **Product names:** SAP Business Application Studio (BAS), ABAP Development Tools (ADT), SAP Business Technology Platform (BTP), SAP Fiori elements, Joule for Developers (J4D), CAP (Cloud Application Programming model), RAP (RESTful ABAP Programming model)
- Use 💎 after "Joule for Developers" on first mention per section
- Use `> ℹ️ **Note:**` for informational callouts
- Use `> ✅ **Expected result:**` for verification steps
- Code blocks: ` ```ABAP ``` ` for ABAP, ` ```PROMPT ``` ` for Joule prompts, ` ```sh ``` ` for terminal
- Use `###` as the participant group ID placeholder in all ABAP artifact names
- Always wrap exercise steps in `<details><summary>🔵 Click to expand!</summary>` blocks

---

## PDF Download

- The "Exercises in PDF" sidebar link is intercepted at runtime in `index.html` — no static PDF is served
- On click: fetches all exercise markdown files → strips `<details>`/`<summary>` → compiles via `vm.compiler.compile` → opens print window → `window.print()`
- **Do not add any npm PDF library** — the browser's native print-to-PDF is intentional

## Hard Rules

- Do not rename `pages/` or `_assets/`
- Do not change the docsify plugin chain in `index.html` unless the task is specifically about site infrastructure
- Do not create documentation files unless explicitly asked
