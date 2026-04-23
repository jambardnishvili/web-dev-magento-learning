# Visual System

This site should teach with motion first, text second.

## Core rule

Every major concept page should answer:

1. what is moving
2. what talks to what
3. where data is stored
4. what comes back
5. what breaks if this stage fails

If a concept can be animated clearly, prefer that over a large opening paragraph.

## Standard page pattern

Use this order:

1. page title
2. quick visual walkthrough
3. terms used in this page
4. short explanation sections
5. common mistakes
6. related pages

## Animation patterns to reuse

### Flow animation

Use for:

- request lifecycle
- login flow
- add to cart flow
- deploy flow
- cache hit vs cache miss

Pattern:

- one token moves through named stages
- active stage highlights
- response returns visibly
- final rendered state changes on screen

### Split-state animation

Use for:

- cookie vs session
- browser state vs server state
- cache vs database
- interface vs concrete dependency

Pattern:

- two columns or two boxes
- show what lives where
- show what gets passed between them

### Swap animation

Use for:

- interface vs implementation
- inheritance vs composition
- plugin vs preference vs observer

Pattern:

- initial setup
- one part swaps
- result still works or changes

## Writing rules for visual pages

- do not open with long abstract text
- first text block under animation should explain the loop in plain language
- first use of jargon should link to the glossary
- one animation should teach one idea only
- if animation needs too much tiny text, simplify it

## Good first visual topics

- browser request to Magento response
- cookie vs session
- what nginx, PHP-FPM, Magento, Redis, and MySQL each do
- interface vs concrete class
- Magento route to controller to page result

## What to avoid

- giant animations with too many labels
- tiny text inside visuals
- decorative motion with no teaching value
- three different ideas in one animation
