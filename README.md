# alfred-time-since

[![CI](https://github.com/blackboxprogramming/alfred-time-since/actions/workflows/ci.yml/badge.svg)](https://github.com/blackboxprogramming/alfred-time-since/actions/workflows/ci.yml)
[![CodeQL](https://github.com/blackboxprogramming/alfred-time-since/actions/workflows/codeql.yml/badge.svg)](https://github.com/blackboxprogramming/alfred-time-since/actions/workflows/codeql.yml)

Alfred workflow to conveniently get the duration since a UTC time.

## Install

Download the latest `Time_Since.alfredworkflow` from [Releases](https://github.com/blackboxprogramming/alfred-time-since/releases) and double-click to install.

## Requirements

- [Alfred](https://www.alfredapp.com/) with Powerpack
- [Node.js](https://nodejs.org/) >= 14

## Usage

Type `ts` followed by a UTC timestamp in Alfred:

```
ts 2021-10-29 04:14:50Z
```

Two results appear:
1. **Duration** — how long ago the timestamp was (e.g. "3 years")
2. **Exact time** — the UTC timestamp converted to your local time

## Development

```bash
# Run tests
npm test

# Lint
npm run lint
```

## Releasing

Push a version tag to trigger a release:

```bash
git tag v0.0.2
git push origin v0.0.2
```

This packages the workflow and creates a GitHub Release with the `.alfredworkflow` file attached.

## License

MIT
