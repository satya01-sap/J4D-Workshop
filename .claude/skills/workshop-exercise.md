# Skill: workshop-exercise

## Trigger
Use this skill when the user asks to create a new exercise, add an exercise page, or scaffold exercise content for an SAP workshop. Examples: "add exercise 3", "create a new exercise for BTP", "scaffold exercise page for ABAP Cloud".

## Context

This project is a **docsify-based SAP workshop site** with the following conventions:

### Folder structure
```
RRWorkshop/
├── index.html                  ← docsify config, plugins, PDF generation
├── README.md                   ← Workshop landing page (description, business value, exercise table)
├── agenda-sidebar.md           ← Docsify sidebar navigation
├── agenda-for-pdf.md           ← PDF TOC — links to all exercise READMEs
├── _assets/
│   ├── files/exercises.pdf     ← Pre-built static PDF (regenerated via npm run build)
│   ├── images/                 ← SAP logos and favicons
│   ├── js/                     ← Credential substitution, exercise submission, form handling
│   └── styles/                 ← iac.css custom styles
└── pages/
    ├── ex1-cap-app-gen/
    │   └── README.md
    └── ex2-rap-app-gen/
        ├── README.md
        └── img/
```

Each new exercise lives at `pages/exN-<short-slug>/README.md` with an `img/` subfolder.

### PDF download
- The "Exercises in PDF" sidebar link (`_assets/files/exercises.pdf`) is intercepted at runtime in `index.html`.
- On click it fetches all exercise markdown files, strips `<details>`/`<summary>` tags, compiles via `vm.compiler.compile`, and opens a print-ready window with `window.print()`.
- No external PDF library is used — the browser's native print-to-PDF is the mechanism.
- After adding a new exercise, register its path in the click handler's `files` array inside `index.html`.

### Credential / placeholder substitution
- `${variableName}` syntax in markdown is replaced at runtime via `_assets/js/substitute-creds.js`.
- Use `###` as the participant group ID placeholder throughout exercise steps for ABAP artifact names.

---

## Steps to follow when creating a new exercise

### 1. Create the exercise folder and README

Path: `pages/exN-<slug>/README.md`

Use this structure exactly:

```markdown
# Exercise N: <Title> 💎

## Introduction

<2–3 sentences describing the exercise in SAP product language. Reference the SAP product (BAS, ADT, BTP, Joule, CAP, RAP, Fiori, etc.) by full name on first use, then abbreviation.>

### Exercises

- [N.1 - <Step title>](#exercise-n1-<anchor>)
- [N.2 - <Step title>](#exercise-n2-<anchor>)
- [Summary & Next exercise](#summary--next-exercise)

> ℹ️ **Reminder:**
> - Replace all occurrences of **`###`** with your group ID.
> - Use ADT **Replace All** (**Ctrl+F**) for ABAP artifacts.

---

## Exercise N.1: <Step title>

[^Top of page](#introduction)

> <One-line context sentence — what the participant is about to do.>

<details>
  <summary>🔵 Click to expand!</summary>

1. Step one instruction.

2. Step two instruction.

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

**SAP language rules:**
- Products: SAP Business Application Studio (BAS), ABAP Development Tools (ADT), SAP BTP, SAP Fiori elements, Joule for Developers (J4D), CAP (Cloud Application Programming model), RAP (RESTful ABAP Programming model)
- Use 💎 after "Joule for Developers" and any AI-powered step title on first mention per section
- Use `> ℹ️ **Note:**` for informational callouts, `> ✅ **Expected result:**` for verification steps
- Code blocks: use ` ```ABAP ``` ` for ABAP, ` ```PROMPT ``` ` for Joule prompts, ` ```sh ``` ` for terminal

### 2. Register in `agenda-sidebar.md`

Add a line under `Hands-on Exercises`:

```markdown
  - [N <Exercise short title>](pages/exN-<slug>/README.md)
```

### 3. Register in `agenda-for-pdf.md`

Add a line:

```markdown
- [Exercise N: <Title>](pages/exN-<slug>/README.md)
```

### 4. Register in the runtime PDF handler (`index.html`)

Locate the `files` array in the `hook.ready` click listener and add the new path:

```js
const files = [
  'pages/ex1-cap-app-gen/README.md',
  'pages/ex2-rap-app-gen/README.md',
  'pages/exN-<slug>/README.md',   // ← add here
];
```

### 5. Update the workshop landing page (`README.md`)

Add a row to the exercises table:

```markdown
| N | [Exercise N: <Title>](pages/exN-<slug>/README.md) | <One-line description> |
```

---

## Checklist before finishing

- [ ] `pages/exN-<slug>/README.md` created with correct structure
- [ ] `pages/exN-<slug>/img/` folder created (add a `.gitkeep` if no images yet)
- [ ] `agenda-sidebar.md` updated
- [ ] `agenda-for-pdf.md` updated
- [ ] `index.html` `files` array updated
- [ ] `README.md` exercises table updated
- [ ] SAP product names and jargon used consistently
- [ ] `###` group ID placeholder used for all ABAP artifact names
- [ ] All exercise steps wrapped in `<details><summary>🔵 Click to expand!</summary>` blocks

---

## Do NOT do

- Do not add new npm dependencies for PDF generation — the browser print mechanism is intentional.
- Do not rename the `pages/` folder or change the `_assets/` structure.
- Do not change the docsify plugin chain in `index.html` unless the task is specifically about the site infrastructure.
