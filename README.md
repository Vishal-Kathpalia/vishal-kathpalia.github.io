# Vishal Kathpalia — Portfolio

Personal portfolio website for **Vishal Kathpalia**, Software Engineer II at Tekion Corp.
Built from scratch with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies.

## Live

- [vishal-kathpalia.github.io](https://vishal-kathpalia.github.io/)
- [vishalkathpalia.qzz.io](https://vishalkathpalia.qzz.io/)

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Animated intro with typing effect, particle background, and terminal prompt |
| **About** | Background, interests, and a bit about who I am beyond code |
| **Experience** | Professional timeline — roles at Tekion Corp with key achievements |
| **Skills** | Tech stack organized by category — backend, frontend, cloud, databases, tools |
| **Projects** | Side projects and college experiments — URL Shortener, Speech-to-Text, Library Management, and more |
| **Education** | B.Tech in CSE (Hons.) from Lovely Professional University, schooling details |
| **Certifications** | Verified credentials with links |
| **Contact** | Built-in contact form that sends messages directly |

## Features

### Theme
- Dark / Light mode toggle with smooth transitions
- Theme preference persisted across sessions

### Interactive Terminal
Click the terminal icon (bottom-right) or press `` ` `` to open. Type `help` for the full command list. Highlights:
- `about`, `experience`, `skills`, `contact`, `social`, `resume` — quick portfolio navigation
- `party` — Party mode with rainbow effects, neon glows, and beat animations
- `matrix` — Matrix rain overlay
- `snake`, `tetris`, `pong` — playable mini games right in the terminal
- `weather <city>` — live weather lookup
- `joke`, `quote`, `flip` — fun commands
- Tab autocomplete and command history (arrow keys)

### Easter Eggs (Google-style)
Type these in the terminal for some fun:
- `do a barrel roll` — spins the entire page
- `gravity` — elements fall with real physics, drag and throw them around
- `thanos` — snaps away half the page elements
- `askew` — tilts the page
- `blink` — portfolio content blinks in and out
- `recursion` — recursive function that "crashes" with a stack overflow
- `comic sans` — the entire site in Comic Sans

### Animations
- Scroll-based reveal animations on all sections
- Floating geometric shapes in the hero background
- Cursor glow trail (desktop)
- Smooth scroll progress bar
- Loading screen with progress animation

### Responsive
Fully responsive across desktop, tablet, and mobile. Touch-friendly interactions.

## Project Structure

```
portfolio/
├── index.html                          # Main HTML — all sections
├── css/
│   └── styles.css                      # All styles — themes, animations, responsive
├── js/
│   └── script.js                       # Terminal, games, Easter eggs, animations
├── images/
│   ├── profile.jpeg                    # Profile photo
│   └── favicon.svg                     # Site icon
├── docs/
│   ├── Vishal-Kathpalia-Resume.pdf     # Downloadable resume
│   └── Coding-Blocks-DSA-Certificate.pdf  # DSA certificate
└── README.md
```

## Run Locally

```bash
# Any static file server works — specify a port to avoid conflicts
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

Alternatively:
```bash
# Using Node
npx serve -p 8080

# Using PHP
php -S localhost:8080
```

## Deployment

Hosted on **GitHub Pages**. To deploy your own fork:

1. Fork this repository
2. Go to **Settings > Pages**
3. Set source to **Deploy from a branch** > `main` / `/ (root)`
4. (Optional) Add a custom domain under the same Pages settings

## Tech Stack

- **HTML5** — Semantic markup, SEO meta tags, Open Graph ready
- **CSS3** — Custom properties (CSS variables), keyframe animations, media queries, grid/flexbox layouts
- **JavaScript (ES6+)** — Vanilla JS, no libraries — terminal emulator, physics engine, game loops, intersection observers
- **Google Fonts** — Space Grotesk, Inter, JetBrains Mono

## Contact

- **Email:** vishalkathpalia0@gmail.com
- **LinkedIn:** [linkedin.com/in/vishalkathpalia](https://linkedin.com/in/vishalkathpalia)
- **GitHub:** [github.com/Er-Vishal-Kathpalia](https://github.com/Er-Vishal-Kathpalia)

---

Designed & Engineered by Vishal Kathpalia | 2026
