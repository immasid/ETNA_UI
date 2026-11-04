# ETNA UI (linux_ui_forAI)

A Linux-oriented desktop chat interface built with **Tauri 2**, **React 19**, **TypeScript**, **Vite**, **Tailwind CSS 4**, and **Motion**.

This repository currently contains an early-stage desktop UI prototype: a chat-style interface, message composer, theme/settings panel, procedural interface sounds, window activity indicators, and a deterministic local mock chat engine.

> **Important:** This is currently a UI prototype, not a connected AI assistant. The checked-in chat engine returns local demo responses; it does not call an LLM, an AI API, or a local inference server. Native package generation is also disabled in the current Tauri configuration.

## Project status

| Area | Current state |
| --- | --- |
| React frontend | Implemented |
| Tauri 2 shell | Scaffolded |
| Chat interface and composer | Implemented |
| Local deterministic mock responses | Implemented |
| Theme and sound settings | Implemented |
| Automated frontend tests | Present |
| AI provider / local model integration | Not implemented in the inspected code |
| Native Linux bundle generation | Disabled in current Tauri config |
| Published installable release | Not available in this repository yet |

## Features

- Desktop-oriented chat layout with a collapsible sidebar.
- Message composer with Enter-to-send and Shift+Enter for a newline.
- Streaming-style output from a deterministic mock engine.
- Local demo commands: `/help`, `/code`, and `/error`.
- Accent theme selection and interface settings.
- Procedural sound feedback generated with the Web Audio API.
- Window activity states (active, ambient, suspended).
- React component-based frontend, TypeScript checks, and tests.

### Demo commands

| Input | Current behaviour |
| --- | --- |
| `/help` | Shows the local command index |
| `/code` | Shows a sample code-oriented response |
| `/error` | Triggers a simulated streaming error |
| Any other text | Returns the default demo response |

These are local mock behaviours. No prompt is currently sent to a model.

## Technology

- **Desktop shell:** Tauri 2 / Rust
- **Frontend:** React 19, TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS 4
- **Animation:** Motion
- **Icons:** Lucide React
- **Tests:** Vitest, Testing Library, jsdom
- **Linting:** Oxlint

## Requirements

For frontend development:

- Git
- Node.js and npm (use a supported Node.js LTS release; Node 22 or newer is recommended for this toolchain)
- The npm lockfile included in the repository

For the native Tauri Linux shell:

- Rust stable toolchain and Cargo
- C/C++ compiler and build tools
- GTK/WebKitGTK development dependencies
- A supported Linux desktop session

Official prerequisite reference: https://v2.tauri.app/start/prerequisites/

## Fedora setup

The commands below follow the Tauri 2 Fedora prerequisite list.

### 1. Update the system

```bash
sudo dnf check-update
sudo dnf upgrade --refresh
```

### 2. Install native build dependencies

```bash
sudo dnf install \
  webkit2gtk4.1-devel \
  openssl-devel \
  curl \
  wget \
  file \
  libappindicator-gtk3-devel \
  librsvg2-devel \
  libxdo-devel
```

Install the C development toolchain group:

```bash
sudo dnf group install "c-development"
```

If your Fedora release uses a different translated group name, inspect available groups with `dnf group list`.

### 3. Install Node.js and npm

Install a supported Node.js LTS release using Fedora packages or another trusted Node.js distribution method. Then verify:

```bash
node --version
npm --version
```

### 4. Install Rust

Install Rust using rustup:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
rustup update stable
rustup default stable
rustc --version
cargo --version
```

### 5. Verify WebKitGTK

```bash
pkg-config --modversion webkit2gtk-4.1
```

A version number should be printed. If the package is not found, check the installed Fedora development packages before continuing.

## CachyOS setup

CachyOS is Arch-based and uses `pacman`.

### 1. Update the system

```bash
sudo pacman -Syu
```

Do not perform a partial system upgrade on an Arch-based distribution.

### 2. Install native build dependencies

```bash
sudo pacman -S --needed \
  webkit2gtk-4.1 \
  base-devel \
  curl \
  wget \
  file \
  openssl \
  appmenu-gtk-module \
  libappindicator-gtk3 \
  librsvg \
  xdotool
```

### 3. Install Node.js and npm

```bash
sudo pacman -S --needed nodejs npm
node --version
npm --version
```

### 4. Install Rust

Install rustup from the CachyOS/Arch repositories:

```bash
sudo pacman -S --needed rustup
rustup default stable
rustup update
rustc --version
cargo --version
```

Alternatively, use the official rustup installer from https://www.rust-lang.org/tools/install.

### 5. Verify WebKitGTK

```bash
pkg-config --modversion webkit2gtk-4.1
```

If this command cannot find WebKitGTK, confirm that `webkit2gtk-4.1` and `pkgconf` are installed.

## Get the source

The repository's current canonical GitHub URL is:

```bash
git clone https://github.com/immasid/ETNA_UI.git
cd ETNA_UI
```

The former `linux_ui_forAI` repository URL may redirect to this renamed repository.

## Install frontend dependencies

From the repository root:

```bash
npm ci
```

Use `npm ci` for a reproducible install from `package-lock.json`. It recreates `node_modules` from the committed lockfile.

## Run the frontend in a browser

```bash
npm run dev
```

Vite prints the local URL in the terminal. The Tauri configuration currently expects `http://localhost:5173`.

This command starts only the frontend development server. It does not open the native Tauri desktop window.

## Run the native Tauri development shell

The current `package.json` includes the Tauri JavaScript API but does not declare the Tauri CLI. Add the CLI to the project once:

```bash
npm install --save-dev @tauri-apps/cli
```

This updates `package.json` and `package-lock.json`. Commit both files if you intend to keep native Tauri development as a supported project workflow.

Then launch the desktop shell:

```bash
npx tauri dev
```

Make sure the Fedora or CachyOS native prerequisites above are installed first.

## Build, test, and lint

Build and type-check the frontend:

```bash
npm run build
```

Run the automated tests:

```bash
npm test
```

Run Oxlint:

```bash
npm run lint
```

Preview the compiled frontend:

```bash
npm run preview
```

The frontend build output is written to `dist/`.

## Native Linux packaging status

**Installable Linux packages are not enabled yet.** The inspected `src-tauri/tauri.conf.json` currently contains:

```json
"bundle": {
  "active": false
}
```

This means a normal Tauri build is not configured to produce distributable Linux bundles such as RPM or AppImage. A successful `npm run build` only creates the frontend assets; it is not an installable desktop release.

Before publishing native installers, the project still needs a reviewed release configuration, a stable product name and application identifier, suitable icons, explicit bundle targets, and clean-machine testing on Fedora and CachyOS. Do not advertise an RPM, AppImage, or other installer until the artifact has actually been built and tested.

Tauri distribution documentation: https://v2.tauri.app/distribute/

## Repository structure

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
│   │   ├── ChatViewport.tsx
│   │   ├── Composer.tsx
│   │   ├── MarkdownView.tsx
│   │   ├── MessageItem.tsx
│   │   ├── SettingsPanel.tsx
│   │   └── VMark*.tsx
│   ├── lib/
│   │   ├── chat/
│   │   ├── themes.ts
│   │   ├── uiSounds.ts
│   │   └── window activity modules
│   └── test/
└── src-tauri/
    ├── Cargo.toml
    ├── Cargo.lock
    ├── tauri.conf.json
    ├── capabilities/
    ├── icons/
    └── src/
```

## Local data and privacy notes

The inspected frontend persists selected UI preferences in browser local storage, including the keys:

- `ai-ui-sound-settings`
- `ai-ui-accent-theme`

The chat store also manages conversation state. Clearing the application's local data may remove saved preferences and conversations.

No AI API key is needed for the current mock implementation because it does not contact an AI provider. Never commit API keys, access tokens, passwords, private keys, or personal data. If a future provider integration introduces environment variables, provide a sanitised `.env.example` and keep real `.env` files out of Git.

## Troubleshooting

### WebKitGTK is missing

Check the pkg-config entry:

```bash
pkg-config --modversion webkit2gtk-4.1
```

Install the matching Fedora or Arch/CachyOS development package if it is missing.

### Rust or Cargo is not found

For rustup installations, load the environment:

```bash
source "$HOME/.cargo/env"
```

### npm install reports lockfile or dependency errors

Recreate dependencies from the lockfile:

```bash
rm -rf node_modules
npm ci
```

### Browser UI works but Tauri does not start

The browser preview does not validate GTK/WebKitGTK or Rust native dependencies. Check the Tauri prerequisite packages and read the terminal output from `npx tauri dev`.

### No RPM or AppImage is produced

This is expected while `bundle.active` is `false`. Native packaging has not yet been enabled in the checked-in configuration.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development and pull request guidelines.

## Security

Please report vulnerabilities privately. See [SECURITY.md](SECURITY.md). Do not publish working credentials or exploitable details in public issues.

## License

There is no `LICENSE` file in the inspected repository. Until a license is added, all rights are reserved by the copyright holder; permission to reuse, modify, or redistribute the code should not be assumed. Add an explicit license before accepting external reuse.

## Maintainer

**Sid**  
Email: [mesiddarthh@outlook.com](mailto:mesiddarthh@outlook.com)  
GitHub: [@immasid](https://github.com/immasid)

---

Tauri Linux package prerequisites and package names are based on the [official Tauri 2 prerequisites guide](https://v2.tauri.app/start/prerequisites/).