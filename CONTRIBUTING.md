# Contributing

Contributions to ETNA UI are welcome.

## Before starting

For substantial features or architecture changes, open an issue first to discuss the scope and intended behaviour.

## Development setup

The project development instructions use Fedora Linux and are maintained in the main README.

Clone the source and install the locked JavaScript dependencies:

```bash
git clone https://github.com/immasid/ETNA_UI.git
cd ETNA_UI
npm ci
```

The Tauri CLI is installed as a project development dependency. Start the native application with:

```bash
npx tauri dev
```

## Quality checks

Run these checks before opening a pull request:

```bash
npm run build
npm test
npm run lint
```

For changes to the native Tauri shell, test the application in the documented development environment and record any additional system dependencies.

## Pull requests

- Keep each pull request focused.
- Explain the motivation and user-visible impact.
- Include screenshots for interface changes.
- Add or update tests where practical.
- Document new dependencies and configuration.
- Do not commit generated build output, local environment files, credentials, or personal data.

## Implementation scope

The current chat implementation is a deterministic mock engine. Do not describe an AI provider or model integration as complete unless the provider code, safe credential handling, error handling, and tests are included.
