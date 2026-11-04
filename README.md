# ETNA UI

A Linux desktop chat interface built with **Tauri 2**, **React 19**, **TypeScript**, **Vite**, **Tailwind CSS 4**, and **Motion**.

This repository contains the application source code and development documentation. The setup instructions in this README use Fedora Linux and its native development tooling. ETNA UI is built and launched from source; this repository does not distribute prebuilt installers or binary packages.

> **Application status:** ETNA UI currently provides a chat-style interface, message composer, theme and settings panel, procedural UI sounds, window-activity indicators, and a deterministic local mock chat engine. The mock engine does not connect to an AI provider, remote API, or local LLM.

## Features

- Tauri 2 desktop shell with a Rust backend scaffold.
- React 19 and TypeScript frontend.
- Chat-style interface and message composer.
- Streaming-style demo responses from a local mock engine.
- Accent theme selection and sound preferences.
- Window activity states (active, ambient, suspended).
- Automated tests using Vitest and Testing Library.

### Demo chat commands

| Input | Behaviour |
| --- | --- |
| `/help` | Displays the local command list |
| `/code` | Displays a sample code response |
| `/error` | Triggers a simulated streaming error |
| Any other text | Displays the default local demo response |

These are local mock behaviours. Prompts are not sent to an AI model.

## Technology stack

| Area | Technology |
| --- | --- |
| Desktop runtime | Tauri 2 |
| Native code | Rust |
| UI | React 19, TypeScript |
| Frontend build | Vite |
| Styling | Tailwind CSS 4 |
| Animation | Motion |
| Icons | Lucide React |
| Tests | Vitest, Testing Library, jsdom |
| Linting | Oxlint |

## Development setup — Fedora Linux

The following commands install the development dependencies, retrieve the source, install the locked project dependencies, and launch ETNA UI locally. Commands use Fedora's DNF package manager and standard Bash-compatible syntax.

### 1. Update Fedora

```bash
sudo dnf upgrade --refresh
```

### 2. Install native development dependencies

Install the libraries required by Tauri 2 on Fedora:

```bash
sudo dnf install \
  git \
  webkit2gtk4.1-devel \
  openssl-devel \
  curl \
  wget \
  file \
  libappindicator-gtk3-devel \
  librsvg2-devel \
  libxdo-devel \
  pkgconf-pkg-config
```

Install the C development toolchain:

```bash
sudo dnf group install "c-development"
```

### 3. Install Node.js and npm

Install Node.js and npm from Fedora's repositories:

```bash
sudo dnf install nodejs npm
```

Verify the versions:

```bash
node --version
npm --version
```

Use a Node.js version supported by the dependency lockfile. The current lockfile includes a dependency requiring Node.js 22.22.2 or newer in the 22.x line, 24.15.0 or newer in the 24.x line, or 26.0.0 or newer. Check the installed version before installing project dependencies.

### 4. Install Rust

Tauri uses Rust for its native desktop shell. Install the stable Rust toolchain with rustup:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Choose the default installation when prompted. Load the Rust environment in the current Bash session and update the stable toolchain:

```bash
source "$HOME/.cargo/env"
rustup default stable
rustup update stable
```

Verify the installation:

```bash
rustc --version
cargo --version
```

### 5. Clone the source repository

```bash
git clone https://github.com/immasid/ETNA_UI.git
cd ETNA_UI
```

### 6. Install project dependencies

The Tauri JavaScript CLI is included in the project's development dependencies. Install the exact dependency versions recorded in the lockfile:

```bash
npm ci
```

Verify the local Tauri CLI:

```bash
npx tauri --version
```

### 7. Launch ETNA UI

```bash
npx tauri dev
```

This starts the Vite development server, compiles the Rust desktop shell, and opens the native application window. Keep the terminal open while developing.

## Daily development commands

Run these commands from the repository root.

### Launch the native desktop application

```bash
npx tauri dev
```

### Run the frontend in a browser

```bash
npm run dev
```

Vite prints the local development URL in the terminal. The Tauri configuration currently uses `http://localhost:5173`.

### Build and validate the frontend

```bash
npm run build
```

This runs the TypeScript project build and creates frontend assets in `dist/`. It does not create an installer.

### Run automated tests

```bash
npm test
```

### Run lint checks

```bash
npm run lint
```

### Preview the frontend build

```bash
npm run preview
```

## Project structure

```text
.
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── public/
│   └── favicon.svg
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   ├── lib/
│   │   └── chat/
│   └── test/
└── src-tauri/
    ├── Cargo.toml
    ├── Cargo.lock
    ├── tauri.conf.json
    ├── capabilities/
    ├── icons/
    └── src/
```

## Local settings and data

The interface stores preferences in browser local storage. Current preference keys include:

- `ai-ui-sound-settings`
- `ai-ui-accent-theme`

Conversation state is managed by the chat store. Clearing the application's local data may remove saved preferences and conversations.

The current chat engine is a local mock and does not require an AI API key. Never commit passwords, API keys, access tokens, private keys, or personal data. Keep local `.env` files and other secrets out of Git.

## Troubleshooting

### WebKitGTK is not found

Check whether pkg-config can locate WebKitGTK 4.1:

```bash
pkg-config --modversion webkit2gtk-4.1
```

If the package cannot be found, install `webkit2gtk4.1-devel` using DNF.

### Rust or Cargo is not found

Load the rustup environment:

```bash
source "$HOME/.cargo/env"
```

### Node.js version is incompatible

Check the installed version:

```bash
node --version
```

Use a version supported by the dependency requirements listed in the development setup.

### npm dependency installation fails

Recreate the dependencies from the committed lockfile:

```bash
rm -rf node_modules
npm ci
```

### The browser frontend works but the Tauri window does not

The browser development server does not verify the native Rust and Linux dependencies. Confirm that WebKitGTK 4.1 is installed, then review the terminal output from:

```bash
npx tauri dev
```

### Tauri CLI is not found

From the repository root, reinstall the project dependencies and check the local CLI:

```bash
npm ci
npx tauri --version
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution and pull request guidelines.

## Security

Please report vulnerabilities privately. See [SECURITY.md](SECURITY.md). Never publish working credentials or secrets in issues or commits.

## License

No `LICENSE` file is currently present. Until a license is added, all rights are reserved by the copyright holder; reuse, modification, and redistribution are not automatically granted.

## Maintainer

**Sid**  
Email: [mesiddarthh@outlook.com](mailto:mesiddarthh@outlook.com)  
GitHub: [@immasid](https://github.com/immasid)

## References

- [Tauri 2 prerequisites — Fedora](https://v2.tauri.app/start/prerequisites/#fedora)
- [Rust installation](https://www.rust-lang.org/tools/install)
- [Node.js downloads](https://nodejs.org/en/download/)
