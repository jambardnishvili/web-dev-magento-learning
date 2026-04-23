# Web Dev and Magento Learning Site

This site is a structured reference for learning how modern web apps work, how PHP applications are designed, how Magento fits those pieces together, and how runtime infrastructure affects real behavior.

Use it in layers:

1. Start with the web foundations pages if the request/response model is still fuzzy.
2. Move into PHP foundations to understand why code is structured in interfaces, classes, and injected dependencies.
3. Read the Magento section to see how those ideas show up in a large framework.
4. Use Runtime/DevOps to understand what nginx, PHP-FPM, Redis, and MySQL are doing around Magento.
5. Use Case Studies to connect theory back to concrete debugging patterns.

## How to read these pages

Each main page follows the same structure:

- What it is
- Why it exists
- When to use it
- Alternative approaches
- Magento-specific example
- Common mistakes
- Related pages

## Visuals

This site uses two kinds of visuals:

- Mermaid flow diagrams for end-to-end movement through systems
- Static SVG comparison graphics for concepts that are easier to see than read

## Good starting points

- [How the Web Works End to End](01-web-foundations/how-the-web-works-end-to-end.md)
- [PHP OOP Foundations](02-php-foundations/php-oop-classes-interfaces-abstract-classes-inheritance-composition.md)
- [Magento Request Lifecycle](03-magento-core/magento-request-lifecycle.md)
- [Nginx, PHP-FPM, MySQL, Redis: Who Does What](04-runtime-devops/nginx-php-fpm-mysql-redis-who-does-what.md)

