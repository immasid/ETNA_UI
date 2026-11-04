# Contributing

Contributions to ETNA UI are welcome.

## Before starting

For substantial features or architecture changes, open an issue first to discuss scope and intended behaviour.

## Development setup

Follow the Fedora or CachyOS setup in the main README, then:

```bash
git clone https://github.com/immasid/ETNA_UI.git
cd ETNA_UI
npm ci
```

For native desktop development, install the Tauri CLI and platform dependencies as described in the README.

## Quality checks

Run the relevant checks before opening a pull request:

```bash
npm run build
npm test
npm run lint
```

For Tauri changes, also test the native application on a Linux desktop with the required system libraries installed.

## Pull requests

- Keep each pull request focused.
- Explain the motivation and user-visible impact.
- Include screenshots for interface changes.
- Add or update tests where practical.
- Document new dependencies, configuration, and platform requirements.
- Do not commit generated build output, local environment files, credentials, or personal data.

## Implementation scope

The current chat implementation is a deterministic mock engine. Do not describe a provider/model integration as complete unless the provider code, safe credential handling, error handling, and tests are included.
