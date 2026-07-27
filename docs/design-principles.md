# Flagrants — Design Principles
# Written: 2026-07-27
# Status: APPROVED

---

## The Grand Contradiction

The application must look completely, genuinely serious.

Not "comedy-themed serious." Not winking. Not self-aware.
Serious. As if the College of Arms commissioned a digital portal and spent real money on it.

The comedy comes entirely from the content it produces. The design must not signal "this is funny."
If the design looks like it knows it is funny, the joke collapses.

The juxtaposition — grand institutional gravitas presenting complete absurdity —
is the product. One side of it must be held completely straight.

---

## Visual language

- **Typography:** Palatino or a genuine serif with historical weight. Not decorative. Authoritative.
- **Colour:** Deep parchment darks (#1a1008), heraldic gold (#FFD700), muted golds for secondary text. Nothing bright, nothing playful.
- **Borders and dividers:** Formal. Single lines, thin rules, the kind found in legal documents or academic journals.
- **Spacing:** Generous. Institutions have room. They do not rush.
- **Buttons and controls:** Understated. The generate button should not look like a "fun" CTA. It should look like submitting a formal application.
- **Error states:** The herald encountered a difficulty. He is investigating. He will return.
- **Loading states:** The herald is researching. He is thorough. He does not hurry.

---

## What the design must never do

- Use rounded corners that suggest friendliness
- Use bright or playful colours
- Use sans-serif fonts in primary contexts
- Animate in ways that are cute or bouncy
- Signal with visual language that the content is a joke
- Look like a SaaS product from 2023

---

## Logo

St. George — in full heraldic armour — running away from a chicken that is breathing fire.
The dragon is a chicken. George is running. He still has his sword. He has not dropped his dignity,
technically speaking. He is simply moving in a direction that happens to be away.

The logo is delivered completely straight. No winking typography. No comedy framing.
It is presented as a coat of arms might be: with gravitas.

---

## Development & Component Protocols

### Clean Relocation Protocol
Whenever moving an element, component, header, or text block from one location to another:
- **ALWAYS delete/remove the original instance completely.**
- **NEVER copy and leave behind residual duplicate elements or orphan nodes.**
- **Audit the DOM structure to ensure zero duplicate IDs or redundant footer/header clones.**

