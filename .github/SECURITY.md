# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it by opening a
GitHub issue or contacting the maintainer directly.

This is a local Alfred workflow that runs on your machine. It does not make
network requests or handle sensitive data. The primary risk surface is the
Node.js `Date.parse()` call on user-provided input.
