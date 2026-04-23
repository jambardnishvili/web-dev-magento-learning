# Learning Path

This path is designed for someone who wants to understand not just how to write code, but why the stack is shaped the way it is.

Rule for this site: if a word feels too advanced, stop and check the [Glossary](glossary.md). Early pages should teach the idea before expecting the jargon.

## Stage 1: Web basics first

Read these in order:

1. [How the Web Works End to End](01-web-foundations/how-the-web-works-end-to-end.md)
2. [HTTP, Headers, Cookies, and Sessions](01-web-foundations/http-requests-responses-headers-cookies-sessions.md)

Goal: understand what really happens between browser, server, app, and storage.

## Stage 2: PHP design fundamentals

Read these in order:

1. [PHP OOP Foundations](02-php-foundations/php-oop-classes-interfaces-abstract-classes-inheritance-composition.md)
2. [Why Interfaces Exist](02-php-foundations/why-interfaces-exist-and-when-not-to-use-them.md)

Goal: understand why PHP code uses interfaces, composition, and dependency injection instead of just large classes and inheritance chains.

## Stage 3: Magento core flow

Read:

1. [Magento Request Lifecycle](03-magento-core/magento-request-lifecycle.md)

Goal: map Magento internals back to the web and PHP concepts that came before.

## Stage 4: Runtime and ops context

Read:

1. [Nginx, PHP-FPM, MySQL, Redis: Who Does What](04-runtime-devops/nginx-php-fpm-mysql-redis-who-does-what.md)

Goal: understand which layer owns which job, and where to look when behavior is slow, stale, broken, or inconsistent.

## Stage 5: Revisit with debugging mindset

After finishing the first pass, go back through the diagrams and ask:

- Where does this request start?
- Which layer terminates HTTP?
- Which layer runs PHP?
- Which layer stores durable business data?
- Which layer stores fast transient data?
- Which layer can make the application look wrong even when code is right?

That loop turns the site from passive reading into a usable mental model.
