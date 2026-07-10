# 🥤 Rapper Clicker


<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Telegram-Mini_App-26A5E4?logo=telegram&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-success" />
</p>

**Rapper Clicker** is a browser-based idle/clicker game inspired by modern underground rap aesthetics.


<p align="center">

  <img width="384" alt="rapclicker" src="https://github.com/user-attachments/assets/e8ac5e5d-79be-44fe-aaa4-93352a29d4bf" />
</p>

[![Play Online](https://img.shields.io/badge/Play-rapper--clicker.vercel.app-purple?style=for-the-badge)](https://rapper-clicker.vercel.app/)
[![Telegram](https://img.shields.io/badge/Open_in-Telegram-26A5E4?style=for-the-badge&logo=telegram)](https://t.me/rapper_lean_clicker_bot)

---



## 🎮 Gameplay

### Clicker

* Tap the **double cup** to earn **$**
* Your click power depends on the currently active rapper
* Generate passive income every second

### Cases

Each case costs **$500**.

Drop chances:

| Rarity | Chance |
| ------ | ------ |
| Common | 60%    |
| Rare   | 30%    |
| Epic   | 8%     |
| Arcane | 2%     |

Duplicate rewards:

| Rarity | Refund |
| ------ | ------ |
| Common | $100   |
| Rare   | $200   |
| Epic   | $350   |
| Arcane | $450   |

### Collection

* Unlock rapper cards
* Click any unlocked card to make it active
* Locked cards appear in grayscale
* Active rapper receives a highlighted indicator
* Every rapper has unique click power and passive income

---

## ✨ Features

* 🃏 Animated editorial-style rapper cards
* 📦 Case opening animation with drop reveal
* 💾 Automatic save using Local Storage
* 📱 Mobile-first responsive design
* 🔊 Sound effects and short rapper previews
* 🔇 Mute option with saved preference
* 🤖 Telegram Mini App support

  * Expand on launch
  * Haptic feedback
  * Personalized welcome message

---

## 👥 Rappers

| Rapper        | Rarity | Click Power | Passive Income |
| ------------- | ------ | ----------: | -------------: |
| Yeat          | Common |           1 |          0/sec |
| ninevicious   | Rare   |           3 |          1/sec |
| Fakemink      | Rare   |           3 |          1/sec |
| Bleood        | Epic   |          25 |         10/sec |
| Playboi Carti | Arcane |         100 |         35/sec |

---

## 🛠 Tech Stack

* React 19
* TypeScript
* Vite
* Tailwind CSS 4
* Lucide React

No backend is used—everything runs entirely on the client.

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/holydynamited/Rapper-Clicker.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 📜 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Create production build  |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## 📁 Project Structure

```text
src/
├── App.tsx
├── components/
│   ├── Header.tsx
│   └── rapperCard/
├── tab/
│   ├── ClickerTab.tsx
│   ├── CasesTab.tsx
│   └── RapperCollectionTab.tsx
├── lib/
│   ├── rappers.ts
│   ├── crateDrop.ts
│   ├── save.ts
│   ├── audio.ts
│   └── telegram.ts
├── audio/
├── assets/
└── styles/

public/
└── favicon.png
```

---

## 🌐 Deployment

Deploy easily with **Vercel**.

```bash
npm run build
```

Output directory:

```
dist
```

Then import the repository into Vercel and deploy.

---

## 🤖 Telegram Mini App

The project supports Telegram Mini Apps.

Features include:

* Automatic app expansion
* Haptic feedback
* Username greeting
* Optimized mobile experience

---

## 💾 Save System

Game progress is stored in Local Storage.

Save key:

```text
rapper-clicker-save
```

Stored data includes:

* Balance
* Owned rappers
* Active rapper
* Passive income
* Audio settings

Reset your save:

```javascript
localStorage.removeItem("rapper-clicker-save");
```

---

## 🔊 Audio

Each rapper includes a short preview snippet.

The mute setting is also saved automatically.

---

## 📸 Screenshots
<p align="center">
  <img width="1513" alt="image" src="https://github.com/user-attachments/assets/d4cc9ac4-18a4-455a-9761-9845ccbd626d" />
</p>

<p align="center">
  <img width="1513" alt="image" src="https://github.com/user-attachments/assets/6a500d66-449e-4142-ba9f-f8f2e3356995" />
</p>

<p align="center">
  <img width="660" alt="image" src="https://github.com/user-attachments/assets/7acff8dc-0c05-46ea-a123-80eb38fc3a59" />
  
</p>




---

## 📌 Roadmap

* [ ] Upgrade shop
* [ ] Premium cases
* [ ] Prestige system
* [ ] Telegram cloud save
* [ ] Share drops
* [ ] PWA support
* [ ] More rappers
* [ ] More animations
* [ ] Achievements
* [ ] Leaderboards

---

## ⚠️ Disclaimer

This is a fan-made educational project created for learning and portfolio purposes.

The included music snippets are intended for personal/non-commercial use only.

This project is **not affiliated with or endorsed by any artists or record labels**.

---

## 📄 License

MIT License.

Feel free to use, modify, and learn from the project.

---

## 💜 Made with lean & purple drank
