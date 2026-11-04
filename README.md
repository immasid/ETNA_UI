# ETNA UI

A Linux desktop chat-interface project built with **Tauri 2**, **React 19**, **TypeScript**, **Vite**, **Tailwind CSS 4**, and **Motion**.

This repository contains the application's **source code and developer documentation**. It is not a binary-download or installer repository. The development setup in this README is written for **Fedora Linux**, the maintainer's primary development environment.

> **Current application status:** ETNA UI includes a chat-style interface, message composer, theme/settings panel, procedural UI sounds, window-activity indicators, and a deterministic local mock chat engine. The mock engine does not connect to an AI provider, remote API, or local LLM.

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

## Fedora development setup

These instructions recreate the development environment after a fresh Fedora installation. They install the tools needed to build and run the application **from source**. No prebuilt application package is downloaded or installed.

### 1. Update Fedora

```bash
sudo dnf upgrade --refresh
```

### 2. Install Tauri and native build dependencies

The following packages are required for the Tauri 2 Linux development environment:

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

Install Node.js and npm from Fedora's enabled repositories:

```bash
sudo dnf install nodejs npm
```

Verify the versions:

```bash
node --version
npm --version
```

The maintainer's current development environment uses **Node.js 26.12.1**. Use Node.js 26.x for the closest match. If Fedora's enabled repositories provide an older version, install a compatible release from the [official Node.js download page](https://nodejs.org/en/download/).

### 4. Install Rust

Tauri uses Rust for its native desktop shell. Install the stable Rust toolchain with rustup:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Choose the default installation when prompted. Then load the Rust environment in the current Bash/Zsh session and update the stable toolchain:

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

For Fish shell, add Cargo to the shell's PATH:

```fish
fish_add_path "$HOME/.cargo/bin"
```

### 5. Clone the source repository

```bash
git clone https://github.com/immasid/ETNA_UI.git
cd ETNA_UI
```

### 6. Install JavaScript dependencies

The Tauri JavaScript CLI is already listed in the project's development dependencies. Install the exact dependency versions recorded in the lockfile:

```bash
npm ci
```

Verify the local Tauri CLI:

```bash
npx tauri --version
```

### 7. Launch ETNA UI from source

```bash
npx tauri dev
```

This starts the Vite development server, compiles the Rust desktop shell, and opens the native application window. Keep the terminal open while developing.

## Daily development commands

Run these commands from the repository root after completing the Fedora setup.

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

## Quick setup after a fresh Fedora installation

For convenience, the complete source-development setup is collected here. It assumes a Bash or Zsh terminal and that the Fedora Node.js package provides a version compatible with the project.

```bash
# Update Fedora
sudo dnf upgrade --refresh

# Install native build dependencies and Git
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

# Install the C development toolchain
sudo dnf group install "c-development"

# Install Node.js and npm
sudo dnf install nodejs npm

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
rustup default stable
rustup update stable

# Clone ETNA UI
git clone https://github.com/immasid/ETNA_UI.git
cd ETNA_UI

# Install locked project dependencies, including the Tauri CLI
npm ci

# Launch the desktop application from source
npx tauri dev
```

The maintainer currently develops with Node.js 26.12.1. Check `node --version` before installing project dependencies; use the [official Node.js downloads](https://nodejs.org/en/download/) if the Fedora package is older than the version required by the project's toolchain.

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

If the package cannot be found, install `webkit2gtk4.1-devel` and reopen the terminal.

### Rust or Cargo is not found

Load the rustup environment:

```bash
source "$HOME/.cargo/env"
```

For Fish shell:

```fish
fish_add_path "$HOME/.cargo/bin"
```

### Node.js is too old

Check the installed version:

```bash
node --version
```

The maintainer's current environment uses Node.js 26.12.1. Install a compatible release from the [official Node.js downloads](https://nodejs.org/en/download/) if necessary.

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

## Official references

- [Tauri 2 prerequisites — Fedora setup](https://v2.tauri.app/start/prerequisites/#fedora)
- [Rust installation](https://www.rust-lang.org/tools/install)
- [Node.js downloads](https://nodejs.org/en/download/)
