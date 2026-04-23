# Web Dev and Magento Learning Site

This site is a structured visual reference for learning how modern web apps work, how PHP applications are designed, how Magento fits those pieces together, and how runtime infrastructure affects real behavior.

It is being written for a learner, not for someone already deep in the stack. New terms should be introduced in plain language first, then named precisely.

Use it in layers:

1. Start with the web foundations pages if the request/response model is still fuzzy.
2. Move into PHP foundations to understand why code is structured in interfaces, classes, and injected dependencies.
3. Read the Magento section to see how those ideas show up in a large framework.
4. Use Runtime/DevOps to understand what nginx, PHP-FPM, Redis, and MySQL are doing around Magento.
5. Use Case Studies to connect theory back to concrete debugging patterns.

## How to read these pages

Each main page should follow this structure:

- Visual walkthrough first
- Terms used in this page
- What it is
- Why it exists
- When to use it
- Alternative approaches
- Magento-specific example
- Common mistakes
- Related pages

If a term is unfamiliar, check the [Glossary](glossary.md). The goal is that you should not need prior Magento or devops experience to start reading.

## Visuals

This site uses a visual-first teaching style:

- one animated walkthrough for the main idea
- one supporting static diagram when needed
- short text below the visual, not long text before it

Preferred visual types:

- HTML/CSS animations for reusable explainer components
- Mermaid flow diagrams for clean system paths
- Static SVG comparison graphics for concepts that are easier to see than read

## Good starting points

- [How the Web Works End to End](01-web-foundations/how-the-web-works-end-to-end.md)
- [PHP OOP Foundations](02-php-foundations/php-oop-classes-interfaces-abstract-classes-inheritance-composition.md)
- [Magento Request Lifecycle](03-magento-core/magento-request-lifecycle.md)
- [Nginx, PHP-FPM, MySQL, Redis: Who Does What](04-runtime-devops/nginx-php-fpm-mysql-redis-who-does-what.md)
