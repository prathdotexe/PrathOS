# 🖥️ Portfolio Desktop OS

> A highly interactive, macOS-inspired desktop environment built with React, serving as a creative developer portfolio. Designed with a **Neo-Brutalism** aesthetic.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB.svg?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?style=flat&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC.svg?style=flat&logo=tailwind-css)

## ✨ Features

### 🪟 Window Management System
- **Draggable Windows**: Fully interactive windows with title bars and controls.
- **Z-Index Handling**: focusing a window brings it to the front; intelligent stacking order.
- **Minimizing/Closing**: Functional window controls.
- **Dock**: Animated application dock with tooltips and active state indicators.

### 🎨 Built-in "Apps"
1.  **About Me, Experience, Projects, Skills**: Rich content viewers with custom UI components (timelines, skill bars, project cards).
2.  **Terminal (`prath.exe`)**: A functional CLI. Try commands like `help`, `whoami`, `skills`, or `clear`.
3.  **Pixel Studio**: A fully working 16x16 pixel art editor.
    *   Draw with a palette of vibrant colors.
    *   Undo/Redo capabilities.
    *   **Export**: Saves your art as a real PNG file to your device.
4.  **Music Player**: A floating widget with:
    *   Rotating vinyl record animation with physics-based lighting.
    *   Tonearm mechanics.
    *   MP3 upload support (play your own local files!).
5.  **Contact**: Quick actions for email, calendar, and social links.

### ⚡ System Interactions
- **Global Toast Notifications**: Feedback system for actions like "Email Copied" or "Image Saved".
- **Hacker Mode (Easter Egg)**: Enter the Konami Code (`↑ ↑ ↓ ↓ ← → ← → B A`) to trigger a system-wide visual override.
- **Live Clock**: Real-time date and time display in the menu bar.

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS (Neo-Brutalism design system)
- **Animations**: Framer Motion (Spring physics for windows), CSS Keyframes
- **Icons**: Lucide React
- **Utils**: React Draggable

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/portfolio-os.git
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  Open `http://localhost:5173` in your browser.

## 🎮 Easter Eggs

- **Konami Code**: Type `ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, b, a` on your keyboard.
- **Terminal**: Type `whoami` for a philosophical response.

---

*Designed and engineered by Prathamesh.*
