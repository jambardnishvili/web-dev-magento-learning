# Glossary

## Abstract class

A class meant to hold shared behavior and partial implementation for subclasses. It can contain real code, unlike an interface.

## Bootstrap

The startup process where an application loads configuration and gets itself ready to handle a request.

## Cache

Saved data kept around so the system does not have to recalculate or reload everything every time.

## Body

The main content of a request or response, such as form data, JSON, or HTML.

## Composition

Building behavior by combining smaller collaborating objects instead of inheriting from one large parent.

## Controller

An application entry point that handles a matched route and returns a response or page result.

## Dependency injection

Giving a class the collaborators it needs from outside instead of constructing them internally.

## DNS

The system that turns a domain name like `example.com` into the server address a browser can connect to.

## Database

A system for storing durable data that should still exist later, such as customers, products, orders, and settings.

## Header

Extra information sent with an HTTP request or response, such as content type, cookies, or cache instructions.

## Front controller

The entry point that receives a request and dispatches it into the framework routing flow.

## HTTP

The protocol used by browsers and servers to exchange requests and responses.

## Interface

A contract that defines what methods a class must provide without defining the actual implementation.

## Magento area

A context such as `frontend`, `adminhtml`, or `webapi_rest` that affects configuration, layout, and dependency wiring.

## nginx

A web server that receives incoming HTTP requests, can serve static files directly, and can forward PHP requests to PHP-FPM.

## PHP-FPM

The long-running PHP worker manager that executes PHP code for web requests. In simple terms: the process pool that actually runs PHP when the web server asks it to.

## Redis

An in-memory data store commonly used for cache, sessions, and fast temporary state.

## Request lifecycle

The path a request follows from browser input to application response.

## Request

The message the browser or another client sends to the server asking it to do something or return something.

## Response

What the server sends back to the client, including status code, headers, and body.

## Reverse proxy

A server in front of the application that receives incoming traffic and forwards it to the appropriate backend.

## Route

The rule that tells the application which code should handle a given URL or request pattern.

## Router

The part of the application that checks incoming requests and decides which route or action should handle them.

## Session

Server-side state associated with a client across multiple requests, usually linked through a cookie.

## Status code

The numeric part of an HTTP response that says what happened, such as `200` for success or `404` for not found.

## Static asset

A file served as-is, such as a CSS file, JavaScript file, image, or font.

## Cookie

A small piece of data stored by the browser and sent back with later requests, often used to help identify a session.

## Layout

Magento structure that defines which page pieces should appear and where they should be placed.

## Block

Magento class often used to prepare data for page rendering and connect templates to backend logic.

## Model

A class that represents or works with application data and business rules.

## Observer

Code that listens for a named event and runs when that event is triggered.

## Object manager

Magento's service container that creates objects and resolves their dependencies.

## Plugin

Magento code that runs before, after, or around a public method to change behavior without editing the original class.

## Repository

A class or interface used to load and save a certain kind of data in a consistent way.

## Service contract

Magento term for a public interface that defines stable API behavior between modules.
