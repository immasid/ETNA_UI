# ETNA UI

A Linux desktop chat-interface project built with **Tauri 2**, **React 19**, **TypeScript**, **Vite**, **Tailwind CSS 4**, and **Motion**.

This repository is intended to hold the **source code and development documentation**. It is not an installer or binary-download repository. When setting up a fresh Fedora or CachyOS installation, use the commands below to install the development tools, clone the source, install dependencies, and launch the application.

> **Current application status:** the interface includes a chat-style layout, message composer, theme/settings panel, procedural UI sounds, window-activity indicators, and a deterministic local mock chat engine. The current mock engine does not connect to an AI provider, remote API, or local LLM.

## What is in the project

- Tauri 2 desktop shell with a Rust backend scaffold.
- React 19 + TypeScript frontend.
- Chat-style interface and message composer.
- Streaming-style demo responses from a local mock engine.
- Theme selection and sound preferences.
- Window activity states (active, ambient, suspended).
- Vitest and Testing Library tests.

### Demo chat commands

| Input | Behaviour |
| --- | --- |
| `/help` | Displays the local command list |
| `/code` | Displays a sample code response |
| `/error` | Triggers a simulated streaming error |
| Any other text | Displays the default local demo response |

These are mock/demo behaviours. They do not send prompts to an AI model.

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
| Testing | Vitest, Testing Library, jsdom |
| Linting | Oxlint |

## Fresh OS setup

The following steps are for reinstalling your development machine and rebuilding the environment from source. They install development dependencies only; they do not download or install a prebuilt application package.

### CachyOS (Arch-based)

#### 1. Update the system

```bash
sudo pacman -Syu
```

Do not perform a partial upgrade on an Arch-based distribution.

#### 2. Install all system dependencies

```bash
sudo pacman -S --needed \
  git \
  base-devel \
  webkit2gtk-4.1 \
  curl \
  wget \
  file \
  openssl \
  appmenu-gtk-module \
  libappindicator-gtk3 \
  librsvg \
  xdotool \
  pkgconf \
  nodejs \
  npm \
  rustup
```

These are the Linux development dependencies used by the Tauri 2 toolchain, together with Git, Node.js/npm and rustup.

#### 3. Set up Rust

```bash
rustup default stable
rustup update stable
rustc --version
cargo --version
```

If `rustup` is not found after installation, open a new terminal. For Bash/Zsh, load the environment with:

```bash
source "$HOME/.cargo/env"
```

For Fish:

```fish
fish_add_path "$HOME/.cargo/bin"
```

#### 4. Check Node.js and npm

```bash
node --version
npm --version
```

Use Node.js **26.x** for the dependency versions currently recorded in this repository's lockfile. If your distribution repository provides an older version, install Node.js 26 using a trusted Node version manager or the official Node.js downloads page: https://nodejs.org/en/download.

#### 5. Install the Tauri command-line tool

The repository uses Tauri 2. Install the Rust CLI once per OS installation:

```bash
cargo install tauri-cli --version "^2.0.0" --locked
```

Verify:

```bash
cargo tauri --version
```

#### 6. Clone the source repository

```bash
git clone https://github.com/immasid/ETNA_UI.git
cd ETNA_UI
```

#### 7. Install project dependencies

```bash
npm ci
```

#### 8. Launch the desktop application from source

```bash
cargo tauri dev
```

This compiles the Rust desktop shell and starts the configured Vite development server. Keep the terminal open while developing.

### Fedora

#### 1. Update Fedora

```bash
sudo dnf upgrade --refresh
```

#### 2. Install system dependencies

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
  pkgconf-pkg-config \
  nodejs \
  npm
```

Install the C development toolchain:

```bash
sudo dnf group install "c-development"
```

#### 3. Install Rust with rustup

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Choose the default stable toolchain when prompted. Then load the environment in Bash/Zsh:

```bash
source "$HOME/.cargo/env"
rustup default stable
rustup update stable
rustc --version
cargo --version
```

For Fish:

```fish
fish_add_path "$HOME/.cargo/bin"
```

#### 4. Check Node.js and npm

```bash
node --version
npm --version
```

Use Node.js **26.x** for the dependency versions currently recorded in this repository's lockfile. If Fedora's enabled repositories provide an older version, install Node.js 26 using a trusted Node version manager or the official Node.js downloads page: https://nodejs.org/en/download.

#### 5. Install the Tauri command-line tool

```bash
cargo install tauri-cli --version "^2.0.0" --locked
cargo tauri --version
```

#### 6. Clone the source repository

```bash
git clone https://github.com/immasid/ETNA_UI.git
cd ETNA_UI
```

#### 7. Install project dependencies

```bash
npm ci
```

#### 8. Launch the desktop application from source

```bash
cargo tauri dev
```

This compiles the Rust desktop shell and starts the configured Vite development server.

## Daily development commands

Run these from the repository root after completing the OS setup.

### Launch the native desktop window

```bash
cargo tauri dev
```

### Run only the frontend in a browser

```bash
npm run dev
```

Vite prints the local development URL in the terminal. The Tauri configuration currently uses `http://localhost:5173`.

### Build the frontend and run checks

```bash
npm run build
npm test
npm run lint
```

The build command type-checks the TypeScript project and creates frontend assets in `dist/`. It does not create an installer; compiled output is a local development/build artifact and should not be committed.

### Preview the frontend build

```bash
npm run preview
```

## Quick setup: CachyOS after a fresh install

For convenience, the essential CachyOS setup commands are collected here. Review the commands above for explanations and troubleshooting.

```bash
sudo pacman -Syu

sudo pacman -S --needed \
  git base-devel webkit2gtk-4.1 curl wget file openssl \
  appmenu-gtk-module libappindicator-gtk3 librsvg xdotool pkgconf \
  nodejs npm rustup

rustup default stable
rustup update stable

cargo install tauri-cli --version "^2.0.0" --locked

git clone https://github.com/immasid/ETNA_UI.git
cd ETNA_UI

npm ci
cargo tauri dev
```

## Quick setup: Fedora after a fresh install

```bash
sudo dnf upgrade --refresh

sudo dnf install \
  git webkit2gtk4.1-devel openssl-devel curl wget file \
  libappindicator-gtk3-devel librsvg2-devel libxdo-devel \
  pkgconf-pkg-config nodejs npm

sudo dnf group install "c-development"

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"

rustup default stable
rustup update stable

cargo install tauri-cli --version "^2.0.0" --locked

git clone https://github.com/immasid/ETNA_UI.git
cd ETNA_UI

npm ci
cargo tauri dev
```

Before running `npm ci`, verify that Node.js is version 26.x. If not, install Node.js 26 using a trusted version manager or https://nodejs.org/en/download.

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

Conversation state is managed by the chat store. Clearing local application data may remove saved preferences and conversations.

The currently inspected chat engine is a mock and does not require an AI API key. Never commit passwords, API keys, access tokens, private keys, or personal data. Keep local `.env` files and other secrets out of Git.

## Troubleshooting

### `webkit2gtk-4.1` is not found

Check whether pkg-config can locate WebKitGTK:

```bash
pkg-config --modversion webkit2gtk-4.1
```

If it cannot, install the matching Tauri WebKitGTK development dependency for your distribution. Reopen the terminal after package installation if needed.

### `cargo` or `rustup` is not found

Open a new terminal or add Cargo's bin directory to PATH:

Bash/Zsh:

```bash
source "$HOME/.cargo/env"
```

Fish:

```fish
fish_add_path "$HOME/.cargo/bin"
```

### Node.js version is too old

Check:

```bash
node --version
```

Use Node.js 26.x for the dependency versions currently locked by this repository.

### npm dependency installation fails

Reinstall from the committed lockfile:

```bash
rm -rf node_modules
npm ci
```

### The browser frontend works but the Tauri window does not

The browser dev server does not verify native Linux libraries or the Rust backend. Check the Tauri prerequisites, verify `pkg-config --modversion webkit2gtk-4.1`, and review the terminal output from `cargo tauri dev`.

### Tauri CLI is not found

Install it with:

```bash
cargo install tauri-cli --version "^2.0.0" --locked
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

## Official setup references

- [Tauri 2 Linux prerequisites](https://v2.tauri.app/start/prerequisites/)
- [Tauri 2 CLI and development workflow](https://v2.tauri.app/start/create-project/)
- [Rust installation](https://www.rust-lang.org/tools/install)
- [Node.js downloads](https://nodejs.org/en/download)
