// ===== Loading Screen =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1400);
});

// ===== Particle Constellation (Interactive Canvas) =====
(function initParticles() {
  const canvas = document.getElementById('heroParticles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) { this.x += dx * 0.005; this.y += dy * 0.005; }
      }
    }
    draw() {
      const theme = document.documentElement.getAttribute('data-theme');
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108, 99, 255, ${theme === 'light' ? 0.25 : 0.5})`;
      ctx.fill();
    }
  }

  function initParticleArray() {
    particles = [];
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function drawLines() {
    const theme = document.documentElement.getAttribute('data-theme');
    const baseAlpha = theme === 'light' ? 0.06 : 0.12;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108, 99, 255, ${baseAlpha * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      if (mouse.x !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(108, 99, 255, ${0.2 * (1 - dist / 200)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }

  initParticleArray();
  animate();
  window.addEventListener('resize', initParticleArray);
})();

// ===== Hero Intro Typing =====
(function initHeroIntro() {
  const el = document.getElementById('heroIntroTyped');
  if (!el) return;

  const lines = [
    'whoami',
    'cat introduction.txt',
    'java -jar vishal.jar --mode=portfolio',
    'git log --oneline --author="Vishal"',
    'curl vishal.dev/hello',
    'docker run vishal/portfolio:latest',
    'kubectl get pods -n production',
    'python3 train_model.py --epochs=100',
    'ssh vishal@cloud-server',
    'npm run build && npm run deploy',
    'redis-cli SET genius "vishal"',
    'kafka-console-consumer --topic=events',
    'mvn clean install -DskipTests=false',
    'grep -r "bug" ./code && echo "none found"',
    'terraform apply -auto-approve',
    'spark-submit --class ml.Pipeline app.jar',
    'mongosh --eval "db.skills.find()"',
    'ab -n 10000 -c 100 https://api.vishal.dev/',
    'chmod +x deploy.sh && ./deploy.sh',
    'htop --sort-key=PERCENT_CPU',
  ];
  let lineIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const current = lines[lineIdx];
    if (deleting) {
      el.textContent = current.substring(0, --charIdx);
    } else {
      el.textContent = current.substring(0, ++charIdx);
    }

    let delay = deleting ? 25 : 80;
    if (!deleting && charIdx === current.length) { delay = 2500; deleting = true; }
    else if (deleting && charIdx === 0) { deleting = false; lineIdx = (lineIdx + 1) % lines.length; delay = 600; }
    setTimeout(tick, delay);
  }

  setTimeout(tick, 1200);
})();

// ===== Typewriter Effect =====
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'systems that scale to millions.',
    'AI-powered intelligent services.',
    'real-time data pipelines.',
    'microservices from zero to prod.',
    'things that just work.',
    'backends that never sleep.',
    'the future, one commit at a time.',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIndex];
    if (deleting) { el.textContent = current.substring(0, --charIndex); }
    else { el.textContent = current.substring(0, ++charIndex); }

    let delay = deleting ? 35 : 70;
    if (!deleting && charIndex === current.length) { delay = 2000; deleting = true; }
    else if (deleting && charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 400; }
    setTimeout(type, delay);
  }

  setTimeout(type, 1800);
})();

// ===== Animated Code Editor =====
(function initCodeEditor() {
  const el = document.getElementById('codeEditorContent');
  if (!el) return;

  const codeLines = [
    '<span class="code-cm">// Who is this guy? Let the code speak.</span>',
    '<span class="code-kw">const</span> <span class="code-fn">vishal</span> <span class="code-punct">=</span> <span class="code-punct">{</span>',
    '  <span class="code-prop">role</span><span class="code-punct">:</span> <span class="code-str">"Software Engineer II"</span><span class="code-punct">,</span>',
    '  <span class="code-prop">company</span><span class="code-punct">:</span> <span class="code-str">"Tekion Corp"</span><span class="code-punct">,</span>',
    '  <span class="code-prop">yearsOfChaos</span><span class="code-punct">:</span> <span class="code-str">"4+ and counting"</span><span class="code-punct">,</span>',
    '  <span class="code-prop">stack</span><span class="code-punct">:</span> <span class="code-punct">[</span><span class="code-str">"Java"</span><span class="code-punct">,</span> <span class="code-str">"Spring Boot"</span><span class="code-punct">,</span> <span class="code-str">"Kafka"</span><span class="code-punct">,</span> <span class="code-str">"AI/ML"</span><span class="code-punct">],</span>',
    '  <span class="code-prop">superpower</span><span class="code-punct">:</span> <span class="code-str">"90x performance boost"</span><span class="code-punct">,</span>',
    '  <span class="code-prop">microservices</span><span class="code-punct">:</span> <span class="code-num">12</span><span class="code-punct">,</span> <span class="code-cm">// built from scratch</span>',
    '  <span class="code-prop">bugsToDeveloperRatio</span><span class="code-punct">:</span> <span class="code-str">"ask my tech lead"</span><span class="code-punct">,</span>',
    '  <span class="code-prop">currentMood</span><span class="code-punct">:</span> <span class="code-str">"shipping features \u{1F680}"</span>',
    '<span class="code-punct">};</span>',
    '',
    '<span class="code-fn">console</span><span class="code-punct">.</span><span class="code-fn">log</span><span class="code-punct">(</span><span class="code-str">"Open the terminal below \u{2B07}\u{FE0F}"</span><span class="code-punct">);</span>',
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentHTML = '';
  let observed = false;

  function getPlainLength(html) {
    return html.replace(/<[^>]*>/g, '').length;
  }

  function typeCode() {
    if (lineIndex >= codeLines.length) {
      el.innerHTML = currentHTML + '<span class="code-cursor"></span>';
      return;
    }

    const line = codeLines[lineIndex];
    const plainLen = getPlainLength(line);

    if (charIndex <= plainLen) {
      // Build partial line: we need to render HTML tags fully but reveal text char by char
      let rendered = '';
      let textCount = 0;
      let i = 0;
      while (i < line.length && textCount < charIndex) {
        if (line[i] === '<') {
          const closeIdx = line.indexOf('>', i);
          rendered += line.substring(i, closeIdx + 1);
          i = closeIdx + 1;
        } else {
          rendered += line[i];
          textCount++;
          i++;
        }
      }
      // Close any open tags by including rest of tags without text
      while (i < line.length) {
        if (line[i] === '<') {
          const closeIdx = line.indexOf('>', i);
          rendered += line.substring(i, closeIdx + 1);
          i = closeIdx + 1;
        } else {
          break;
        }
      }

      el.innerHTML = currentHTML + rendered + '<span class="code-cursor"></span>';
      charIndex++;
      setTimeout(typeCode, 30 + Math.random() * 25);
    } else {
      currentHTML += codeLines[lineIndex] + '\n';
      lineIndex++;
      charIndex = 0;
      setTimeout(typeCode, 100);
    }
  }

  // Only start when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !observed) {
        observed = true;
        setTimeout(typeCode, 300);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(el.closest('.code-editor'));
})();

// ===== Cursor Glow (desktop) =====
(function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.innerWidth < 768) return;
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
})();

// ===== Navigation =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 50); });

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => { navToggle.classList.remove('open'); navLinks.classList.remove('open'); });
});

const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
  });
}
window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ===== Theme Toggle =====
(function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// ===== Scroll Progress + Back to Top =====
(function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const progressRing = document.getElementById('progressRing');
  const circumference = 2 * Math.PI * 16;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    progressBar.style.width = (progress * 100) + '%';
    backToTop.classList.toggle('visible', scrollTop > 500);
    if (progressRing) progressRing.style.strokeDashoffset = circumference * (1 - progress);
  });

  backToTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// ===== Animated Stat Counters =====
(function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statNumbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-target'));
          const suffix = num.getAttribute('data-suffix') || '';
          const duration = 2000;
          const start = performance.now();
          function step(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            num.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else num.textContent = target + suffix;
          }
          requestAnimationFrame(step);
        });
      }
    });
  }, { threshold: 0.3 });
  const statsSection = document.getElementById('stats');
  if (statsSection) counterObserver.observe(statsSection);
})();

// ===== 3D Tilt Effect on Cards =====
(function initTilt() {
  if (window.innerWidth < 768) return;
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      const glow = card.querySelector('.skill-card-glow');
      if (glow) { glow.style.left = x + 'px'; glow.style.top = y + 'px'; }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
    card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
  });
})();

// ===== Magnetic Buttons =====
(function initMagnetic() {
  if (window.innerWidth < 768) return;
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.15}px, ${(e.clientY - rect.top - rect.height / 2) * 0.15}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.4s ease';
      setTimeout(() => { el.style.transition = ''; }, 400);
    });
    el.addEventListener('mouseenter', () => { el.style.transition = 'none'; });
  });
})();

// ===== Active Nav Highlighting on Scroll =====
(function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  function updateActiveNav() {
    var scrollY = window.scrollY + 120;
    var current = '';
    sections.forEach(function(section) {
      if (scrollY >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
})();

// ===== Button Ripple Effect =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// ===== Interactive Terminal =====
(function initTerminal() {
  const toggle = document.getElementById('terminalToggle');
  const overlay = document.getElementById('terminalOverlay');
  const terminal = document.getElementById('terminal');
  const input = document.getElementById('terminalInput');
  const output = document.getElementById('terminalOutput');
  const dotClose = document.getElementById('termDotClose');
  const dotMinimize = document.getElementById('termDotMinimize');
  const dotFullscreen = document.getElementById('termDotFullscreen');
  if (!toggle || !overlay) return;

  function openTerminal() {
    overlay.classList.add('open');
    terminal.classList.remove('terminal-minimized');
    setTimeout(() => input.focus(), 300);
  }

  function closeTerminal() {
    overlay.classList.remove('open');
    terminal.classList.remove('terminal-fullscreen', 'terminal-minimized');
    // Reset terminal state for a fresh session on next open
    output.innerHTML = '';
    history.length = 0;
    historyIndex = -1;
    gameMode = null;
    gameState = {};
    // Flip is instant — clean it up. Party/matrix persist (they have their own stop buttons + auto-timeout).
    document.body.classList.remove('flipped');
    // Reset welcome flag so it replays on next open
    if (window._terminalResetWelcome) window._terminalResetWelcome();
  }

  // Hide terminal so user can see & interact with the portfolio effect
  // Unlike closeTerminal, this does NOT reset output/history/game state
  function hideTerminal() {
    setTimeout(() => {
      if (overlay.classList.contains('open')) {
        overlay.classList.remove('open');
        terminal.classList.remove('terminal-fullscreen', 'terminal-minimized');
      }
    }, 1200);
  }

  function toggleFullscreen() {
    terminal.classList.remove('terminal-minimized');
    terminal.classList.toggle('terminal-fullscreen');
    dotFullscreen.title = terminal.classList.contains('terminal-fullscreen') ? 'Exit fullscreen' : 'Fullscreen';
    setTimeout(() => input.focus(), 100);
  }

  function toggleMinimize() {
    if (terminal.classList.contains('terminal-minimized')) {
      terminal.classList.remove('terminal-minimized');
      setTimeout(() => input.focus(), 100);
    } else {
      terminal.classList.remove('terminal-fullscreen');
      terminal.classList.add('terminal-minimized');
    }
    dotMinimize.title = terminal.classList.contains('terminal-minimized') ? 'Restore' : 'Minimize';
  }

  // --- Wire up controls ---
  toggle.addEventListener('click', openTerminal);
  dotClose.addEventListener('click', closeTerminal);
  dotMinimize.addEventListener('click', toggleMinimize);
  dotFullscreen.addEventListener('click', toggleFullscreen);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeTerminal(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeTerminal();
  });


  // --- Command history ---
  const history = [];
  let historyIndex = -1;

  // --- Game state ---
  let gameMode = null; // null | 'quiz' | 'guess' | 'rps' | 'hangman' | 'typingtest' | 'scramble' | 'tictactoe' | 'emoji' | 'mathblitz'
  let gameState = {};

  // Sync pill button highlights with current gameMode
  function updateActivePill() {
    document.querySelectorAll('.welcome-pill.pill-active').forEach(b => b.classList.remove('pill-active'));
    if (gameMode) {
      document.querySelectorAll('.welcome-pill[data-cmd="' + gameMode + '"]').forEach(b => b.classList.add('pill-active'));
    }
  }
  // Expose for pill click handler in initTerminalWelcome
  window._isGameRunning = () => !!gameMode;

  // --- Matrix rain ---
  let matrixInterval = null;

  // --- Party mode ---
  let partyTimeout = null;
  let partyConfettiInterval = null;

  function stopPartyMode() {
    document.body.classList.remove('party-mode');
    if (partyTimeout) { clearTimeout(partyTimeout); partyTimeout = null; }
    if (partyConfettiInterval) { clearInterval(partyConfettiInterval); partyConfettiInterval = null; }
    const stopBtn = document.getElementById('partyStopBtn');
    if (stopBtn) stopBtn.remove();
    document.querySelectorAll('.welcome-pill[data-cmd="party"]').forEach(b => b.classList.remove('pill-active'));
  }

  // --- Matrix mode ---
  let matrixTimeout = null;

  function stopMatrixRain() {
    document.body.classList.remove('matrix-mode');
    if (matrixTimeout) { clearTimeout(matrixTimeout); matrixTimeout = null; }
    const canvas = document.getElementById('matrixCanvas');
    const vignette = document.getElementById('matrixVignette');
    if (canvas && canvas.classList.contains('active')) {
      canvas.classList.remove('active');
      if (vignette) vignette.classList.remove('active');
      if (matrixInterval) { clearInterval(matrixInterval); matrixInterval = null; }
      if (canvas._matrixResize) {
        window.removeEventListener('resize', canvas._matrixResize);
        canvas._matrixResize = null;
      }
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    const stopBtn = document.getElementById('matrixStopBtn');
    if (stopBtn) stopBtn.remove();
    document.querySelectorAll('.welcome-pill[data-cmd="matrix"]').forEach(b => b.classList.remove('pill-active'));
  }

  function addLine(text, className) {
    const p = document.createElement('p');
    p.className = 'terminal-line' + (className ? ' ' + className : '');
    p.innerHTML = text;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
  }

  function addCommand(cmd) {
    addLine(`<span class="terminal-prompt" style="color:#9ece6a">visitor@portfolio:~$</span> ${cmd}`, '');
  }

  // --- Quiz data ---
  const quizQuestions = [
    { q: 'What does JVM stand for?', choices: ['A) Java Virtual Machine', 'B) Java Variable Method', 'C) Just Very Modern', 'D) Java Version Manager'], answer: 'a' },
    { q: 'Which data structure uses FIFO?', choices: ['A) Stack', 'B) Queue', 'C) Tree', 'D) Graph'], answer: 'b' },
    { q: 'What is the time complexity of binary search?', choices: ['A) O(n)', 'B) O(n log n)', 'C) O(log n)', 'D) O(1)'], answer: 'c' },
    { q: 'Which protocol does REST typically use?', choices: ['A) FTP', 'B) SMTP', 'C) HTTP', 'D) TCP'], answer: 'c' },
    { q: 'What does SQL stand for?', choices: ['A) Strong Query Language', 'B) Structured Query Language', 'C) Simple Question Logic', 'D) Server Query Loader'], answer: 'b' },
    { q: 'Which Spring annotation marks a REST controller?', choices: ['A) @Service', 'B) @Component', 'C) @RestController', 'D) @Entity'], answer: 'c' },
    { q: 'What is Kafka primarily used for?', choices: ['A) Caching', 'B) Message streaming', 'C) Load balancing', 'D) DNS resolution'], answer: 'b' },
    { q: 'Which of these is a NoSQL database?', choices: ['A) PostgreSQL', 'B) MySQL', 'C) MongoDB', 'D) Oracle'], answer: 'c' },
    { q: 'What does API stand for?', choices: ['A) Application Programming Interface', 'B) Applied Protocol Integration', 'C) Automated Process Input', 'D) Application Process Iteration'], answer: 'a' },
    { q: 'What is the default port for Spring Boot?', choices: ['A) 3000', 'B) 5000', 'C) 8080', 'D) 9090'], answer: 'c' },
  ];

  // --- Fortune quotes ---
  const fortunes = [
    '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." \u2014 Martin Fowler',
    '"First, solve the problem. Then, write the code." \u2014 John Johnson',
    '"Experience is the name everyone gives to their mistakes." \u2014 Oscar Wilde',
    '"Java is to JavaScript what car is to carpet." \u2014 Chris Heilmann',
    '"Code is like humor. When you have to explain it, it\u2019s bad." \u2014 Cory House',
    '"Simplicity is the soul of efficiency." \u2014 Austin Freeman',
    '"Make it work, make it right, make it fast." \u2014 Kent Beck',
    '"The best error message is the one that never shows up." \u2014 Thomas Fuchs',
    '"Talk is cheap. Show me the code." \u2014 Linus Torvalds',
    '"Programming isn\u2019t about what you know; it\u2019s about what you can figure out." \u2014 Chris Pine',
    '"The only way to learn a new programming language is by writing programs in it." \u2014 Dennis Ritchie',
    '"Debugging is twice as hard as writing the code in the first place." \u2014 Brian Kernighan',
  ];

  // --- 8-ball responses ---
  const eightBallResponses = [
    'It is certain.', 'Without a doubt.', 'Yes, definitely!', 'You may rely on it.',
    'As I see it, yes.', 'Most likely.', 'Outlook good.', 'Signs point to yes.',
    'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.',
    'Don\u2019t count on it.', 'My reply is no.', 'My sources say no.', 'Outlook not so good.',
    'Very doubtful.', 'Concentrate and ask again.',
  ];

  // ========= COMMANDS =========
  const commands = {
    help: () => {
      addLine('');
      addLine('\u{1F4CB} <strong>Portfolio Commands</strong>', 'accent');
      addLine('');
      addLine('  \u{1F464} <strong>About Vishal</strong>');
      addLine('  <span class="cmd-highlight">about</span>       \u2014  Who is Vishal?');
      addLine('  <span class="cmd-highlight">skills</span>      \u2014  Tech stack & skills');
      addLine('  <span class="cmd-highlight">experience</span>  \u2014  Work history');
      addLine('  <span class="cmd-highlight">education</span>   \u2014  Academic background');
      addLine('  <span class="cmd-highlight">contact</span>     \u2014  Get in touch');
      addLine('  <span class="cmd-highlight">social</span>      \u2014  Social links');
      addLine('  <span class="cmd-highlight">resume</span>      \u2014  Open resume PDF');
      addLine('');
      addLine('  \u{1F3AE} <strong>Games</strong>');
      addLine('  <span class="cmd-highlight">quiz</span>        \u2014  Tech trivia (10 questions)');
      addLine('  <span class="cmd-highlight">guess</span>       \u2014  Guess the number (1\u201410)');
      addLine('  <span class="cmd-highlight">rps</span>         \u2014  Rock Paper Scissors');
      addLine('  <span class="cmd-highlight">hangman</span>     \u2014  Guess the tech word');
      addLine('  <span class="cmd-highlight">typingtest</span>  \u2014  Test your typing speed');
      addLine('  <span class="cmd-highlight">scramble</span>    \u2014  Unscramble tech words');
      addLine('  <span class="cmd-highlight">tictactoe</span>   \u2014  Tic Tac Toe vs CPU');
      addLine('  <span class="cmd-highlight">emoji</span>       \u2014  Decode emoji puzzles');
      addLine('  <span class="cmd-highlight">coin</span>        \u2014  Flip a coin');
      addLine('  <span class="cmd-highlight">roll</span>        \u2014  Roll a dice');
      addLine('  <span class="cmd-highlight">mathblitz</span>   \u2014  Speed math (30s)');
      addLine('');
      addLine('  \u{2728} <strong>Fun</strong>');
      addLine('  <span class="cmd-highlight">matrix</span>      \u2014  Toggle Matrix rain');
      addLine('  <span class="cmd-highlight">party</span>       \u2014  Disco mode + confetti');
      addLine('  <span class="cmd-highlight">flip</span>        \u2014  Flip the page upside down');
      addLine('  <span class="cmd-highlight">neofetch</span>    \u2014  System info');
      addLine('  <span class="cmd-highlight">fortune</span>     \u2014  Random programming quote');
      addLine('  <span class="cmd-highlight">8ball</span>       \u2014  Magic 8-Ball (8ball &lt;question&gt;)');
      addLine('  <span class="cmd-highlight">joke</span>        \u2014  Dev humor');
      addLine('  <span class="cmd-highlight">coffee</span>      \u2014  Brew some Java');
      addLine('');
      addLine('  \u{1F525} <strong>Easter Eggs</strong> <span style="color:#565f89">(Google-style)</span>');
      addLine('  <span class="cmd-highlight">barrel roll</span> \u2014  Spin the entire page');
      addLine('  <span class="cmd-highlight">gravity</span>     \u2014  Everything falls down');
      addLine('  <span class="cmd-highlight">askew</span>       \u2014  Tilt the page');
      addLine('  <span class="cmd-highlight">thanos</span>      \u2014  Snap half the page away');
      addLine('  <span class="cmd-highlight">blink</span>       \u2014  &lt;blink&gt; from the 90s');
      addLine('  <span class="cmd-highlight">recursion</span>   \u2014  Did you mean: recursion?');
      addLine('  <span class="cmd-highlight">comic sans</span>  \u2014  The forbidden font');
      addLine('');
      addLine('  <span style="color:#565f89">Standard commands (ls, pwd, echo, history, etc.) also work.</span>', '');
      addLine('  <span style="color:#565f89">\u2318K / Ctrl+L clear  \u2502  Ctrl+C cancel  \u2502  \u2191\u2193 history  \u2502  Tab autocomplete</span>', '');
      addLine('');
    },
    about: () => {
      addLine('');
      addLine('\u{1F468}\u{200D}\u{1F4BB} <strong>Vishal Kathpalia</strong>', 'accent');
      addLine('   Software Engineer II @ Tekion Corp');
      addLine('   \u{1F4CD} Bengaluru, India');
      addLine('');
      addLine('   4+ years of building systems that handle millions');
      addLine('   of requests without breaking a sweat. Grew from');
      addLine('   intern to core contributor owning critical systems');
      addLine('   end to end.');
      addLine('');
      addLine('   \u{1F31F} <strong>Key Highlights</strong>');
      addLine('   \u{2022} 90x performance boost on a critical module');
      addLine('   \u{2022} 3 microservices architected from scratch');
      addLine('   \u{2022} 12+ microservices managed in production');
      addLine('   \u{2022} Millions of records migrated \u2014 zero data loss');
      addLine('   \u{2022} 20+ features shipped to production');
      addLine('');
      addLine('   \u{1F916} Deeply into AI/ML \u2014 working with Spring AI,');
      addLine('   LLMs, and intelligent automation.');
      addLine('');
      addLine('   \u{1F3CF} Cricket  \u{265F}\u{FE0F} Chess  \u{1F3F8} Badminton');
      addLine('   \u{1F3C6} Won a Science Exhibition before writing first line of code');
      addLine('');
    },
    skills: () => {
      addLine('');
      addLine('\u{1F6E0}\u{FE0F}  <strong>Technical Arsenal</strong>', 'accent');
      addLine('');
      addLine('   Languages    \u2502  Java \u00B7 Python \u00B7 C++ \u00B7 SQL');
      addLine('   Frameworks   \u2502  Spring Boot \u00B7 Spring AI \u00B7 Hibernate');
      addLine('   AI / ML      \u2502  LLMs \u00B7 Spring AI \u00B7 Prompt Eng \u00B7 ML Pipelines');
      addLine('   Databases    \u2502  MongoDB \u00B7 MySQL \u00B7 Redis \u00B7 Elasticsearch');
      addLine('   Messaging    \u2502  Apache Kafka \u00B7 CDC \u00B7 ELK Stack');
      addLine('   DevOps       \u2502  Docker \u00B7 Kubernetes \u00B7 CI/CD');
      addLine('   Architecture \u2502  Microservices \u00B7 REST \u00B7 HLD \u00B7 LLD');
      addLine('');
    },
    experience: () => {
      addLine('');
      addLine('\u{1F4BC} <strong>Tekion Corp</strong> (4+ years)', 'accent');
      addLine('');
      addLine('   \u{1F680} SDE II          Apr 2025 \u2014 Present');
      addLine('   \u{1F9D1}\u{200D}\u{1F4BB} SDE I           Jan 2024 \u2014 Mar 2025');
      addLine('   \u{1F4BB} Associate SDE   Jul 2022 \u2014 Dec 2023');
      addLine('   \u{1F4DA} SDE Intern      Jan 2022 \u2014 Jun 2022');
      addLine('');
      addLine('   \u{1F31F} Key: 90x perf boost \u00B7 3 microservices from scratch');
      addLine('       Millions of records migrated \u00B7 20+ features shipped');
      addLine('');
    },
    education: () => {
      addLine('');
      addLine('\u{1F393} <strong>Education</strong>', 'accent');
      addLine('');
      addLine('   \u{1F3EB} Lovely Professional University (2018\u20142022)');
      addLine('      B.Tech CSE (Hons.) \u00B7 CGPA: 8.80/10');
      addLine('      Coding Club \u00B7 DSA \u00B7 AI \u00B7 Cloud Computing');
      addLine('');
      addLine('   \u{1F3EB} Swami Vivekanand Public School (2016\u20142018)');
      addLine('      Intermediate \u00B7 Science \u00B7 \u{1F3C6} Science Exhibition');
      addLine('');
      addLine('   \u{1F3EB} Nav Jyoti Vidya Mandir High School (\u20142016)');
      addLine('      High School \u00B7 Science \u00B7 \u{265F}\u{FE0F} Chess Club');
      addLine('');
    },
    contact: () => {
      addLine('');
      addLine('\u{1F4EC} <strong>Contact</strong>', 'accent');
      addLine('');
      addLine('   \u{1F4E7} vishalkathpalia0@gmail.com');
      addLine('   \u{1F517} linkedin.com/in/vishalkathpalia');
      addLine('   \u{1F431} github.com/Er-Vishal-Kathpalia');
      addLine('   \u{1F310} vishalkathpalia.github.io');
      addLine('   \u{1F4CD} Bengaluru, India');
      addLine('   \u{1F7E2} Open to opportunities');
      addLine('');
    },
    social: () => {
      addLine('');
      addLine('\u{1F310} <strong>Social Links</strong>', 'accent');
      addLine('');
      addLine('   LinkedIn   \u2192  linkedin.com/in/vishalkathpalia');
      addLine('   GitHub     \u2192  github.com/Er-Vishal-Kathpalia');
      addLine('   Website    \u2192  vishalkathpalia.github.io');
      addLine('   Instagram  \u2192  instagram.com/_vishal_kathpalia');
      addLine('   Snapchat   \u2192  snapchat.com/add/kathpaliavishal');
      addLine('   Facebook   \u2192  facebook.com/ervishalkathpalia');
      addLine('');
    },
    resume: () => {
      addLine('');
      addLine('\u{1F4C4} <strong>Resume</strong>', 'accent');
      addLine('');
      addLine('   Opening resume in a new tab...', 'success');
      addLine('   \u{1F4E7} Want to connect? Type <span class="cmd-highlight">contact</span>', 'dim');
      addLine('');
      setTimeout(() => {
        window.open('docs/Vishal-Kathpalia-Resume.pdf', '_blank');
      }, 600);
    },
    whoami: () => {
      addLine('');
      addLine('\u{1F440} You are a curious visitor exploring Vishal\'s portfolio!', 'success');
      addLine('   Thanks for stopping by. Type <span class="cmd-highlight">contact</span> to connect.', 'dim');
      addLine('');
    },
    date: () => {
      addLine('');
      addLine('   \u{1F4C5} ' + new Date().toLocaleString(), 'success');
      addLine('');
    },
    coffee: () => {
      addLine('');
      addLine('   \u2615 Brewing a fresh cup of Java...', 'warning');
      addLine('');
      setTimeout(() => {
        addLine('   \u2615\u2615\u2615 Here you go! Now get back to exploring!', 'success');
        addLine('');
      }, 1500);
    },
    joke: () => {
      const jokes = [
        ['Why do Java devs wear glasses?', 'Because they can\'t C#! \u{1F60E}'],
        ['What\'s a backend dev\'s favorite drink?', 'Java, obviously \u2615'],
        ['Why did the developer go broke?', 'Because he used up all his cache! \u{1F4B8}'],
        ['What\'s a programmer\'s favorite hangout?', 'Foo Bar \u{1F37A}'],
        ['Why do programmers prefer dark mode?', 'Because light attracts bugs! \u{1F41B}'],
        ['How many programmers does it take to change a light bulb?', 'None. That\'s a hardware problem! \u{1F4A1}'],
        ['Why did the programmer quit his job?', 'Because he didn\'t get arrays! \u{1F4B0}'],
        ['What\'s a developer\'s least favorite tea?', 'NullPointerException \u{1F375}'],
      ];
      const joke = jokes[Math.floor(Math.random() * jokes.length)];
      addLine('');
      addLine('   \u{1F602} ' + joke[0], 'warning');
      setTimeout(() => {
        addLine('   \u{1F449} ' + joke[1], 'success');
        addLine('');
      }, 1200);
    },
    clear: () => {
      output.innerHTML = '';
    },
    theme: () => {
      document.getElementById('themeToggle').click();
      const next = document.documentElement.getAttribute('data-theme');
      addLine('');
      addLine('   \u{1F3A8} Switched to ' + next + ' mode!', 'success');
      addLine('');
    },
    exit: () => {
      addLine('');
      addLine('   \u{1F44B} Goodbye! Come back soon!', 'success');
      addLine('');
      setTimeout(closeTerminal, 800);
    },

    // ===== GAMES =====
    quiz: () => {
      addLine('');
      addLine('\u{1F9E0} <strong>Tech Trivia Quiz</strong> \u2014 10 questions!', 'accent');
      addLine('   Answer with <span class="cmd-highlight">a</span>, <span class="cmd-highlight">b</span>, <span class="cmd-highlight">c</span>, or <span class="cmd-highlight">d</span>. Type <span class="cmd-highlight">quit</span> to stop.', 'dim');
      addLine('');
      const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
      gameMode = 'quiz';
      gameState = { questions: shuffled, current: 0, score: 0, total: shuffled.length };
      showQuizQuestion();
    },

    guess: () => {
      const target = Math.floor(Math.random() * 10) + 1;
      addLine('');
      addLine('\u{1F522} <strong>Guess the Number!</strong>', 'accent');
      addLine('   I\'m thinking of a number between 1 and 10.');
      addLine('   You have 5 attempts. Type your guess or <span class="cmd-highlight">quit</span> to stop.', 'dim');
      addLine('');
      gameMode = 'guess';
      gameState = { target, attempts: 0, maxAttempts: 5 };
    },

    rps: () => {
      addLine('');
      addLine('\u{270A}\u{1F590}\u{FE0F}\u{270C}\u{FE0F} <strong>Rock Paper Scissors!</strong>', 'accent');
      addLine('   Best of 5 rounds. Type <span class="cmd-highlight">rock</span>, <span class="cmd-highlight">paper</span>, or <span class="cmd-highlight">scissors</span>.', 'dim');
      addLine('   Type <span class="cmd-highlight">quit</span> to stop.', 'dim');
      addLine('');
      gameMode = 'rps';
      gameState = { playerScore: 0, cpuScore: 0, round: 0, maxRounds: 5 };
    },

    hangman: () => {
      const words = [
        { word: 'JAVASCRIPT', hint: 'Language of the web' },
        { word: 'KUBERNETES', hint: 'Container orchestration' },
        { word: 'DOCKER', hint: 'Containerization platform' },
        { word: 'PYTHON', hint: 'Named after a snake (or a comedy group)' },
        { word: 'KAFKA', hint: 'Distributed streaming platform' },
        { word: 'REDIS', hint: 'In-memory data store' },
        { word: 'SPRING', hint: 'Java framework Vishal uses daily' },
        { word: 'MONGODB', hint: 'NoSQL document database' },
        { word: 'ALGORITHM', hint: 'Step-by-step procedure' },
        { word: 'MICROSERVICE', hint: 'Small, independent deployable unit' },
        { word: 'ELASTICSEARCH', hint: 'Search and analytics engine' },
        { word: 'HIBERNATE', hint: 'Java ORM framework' },
        { word: 'LINUX', hint: 'Open source operating system' },
        { word: 'GITHUB', hint: 'Where code lives' },
        { word: 'RECURSION', hint: 'See: recursion' },
        { word: 'BACKEND', hint: 'Server-side development' },
        { word: 'DATABASE', hint: 'Organized collection of data' },
        { word: 'COMPILER', hint: 'Translates code to machine language' },
      ];
      const pick = words[Math.floor(Math.random() * words.length)];
      addLine('');
      addLine('\u{1F3AD} <strong>Hangman!</strong>', 'accent');
      addLine('   Guess the tech word one letter at a time.', 'dim');
      addLine('   Hint: <span style="color:#e0af68">' + pick.hint + '</span>');
      addLine('   Type a single letter, or <span class="cmd-highlight">quit</span> to stop.', 'dim');
      addLine('');
      gameMode = 'hangman';
      gameState = {
        word: pick.word,
        guessed: [],
        wrong: 0,
        maxWrong: 6,
      };
      showHangman();
    },

    typingtest: () => {
      const sentences = [
        'The quick brown fox jumps over the lazy dog.',
        'Code is like humor, when you have to explain it, it is bad.',
        'First solve the problem, then write the code.',
        'Java is to JavaScript what car is to carpet.',
        'Talk is cheap, show me the code.',
        'Any fool can write code that a computer can understand.',
        'Simplicity is the soul of efficiency.',
        'Make it work, make it right, make it fast.',
        'Debugging is twice as hard as writing the code.',
        'The best error message is the one that never shows up.',
      ];
      const sentence = sentences[Math.floor(Math.random() * sentences.length)];
      addLine('');
      addLine('\u{2328}\u{FE0F} <strong>Typing Speed Test!</strong>', 'accent');
      addLine('   Type the following sentence exactly as shown:', 'dim');
      addLine('');
      addLine('   <span style="color:#7aa2f7;background:rgba(122,162,247,0.1);padding:4px 8px;border-radius:4px">' + sentence + '</span>');
      addLine('');
      addLine('   Start typing and press Enter when done.', 'dim');
      addLine('');
      gameMode = 'typingtest';
      gameState = { sentence, startTime: Date.now() };
    },

    scramble: () => {
      const words = [
        'JAVA', 'PYTHON', 'KAFKA', 'REDIS', 'REACT', 'LINUX', 'DOCKER',
        'SPRING', 'MYSQL', 'MONGO', 'GITHUB', 'KOTLIN', 'SWIFT', 'RUST',
        'NGINX', 'GRADLE', 'MAVEN', 'GOLANG', 'ARRAY', 'QUEUE', 'STACK',
        'GRAPH', 'BINARY', 'CACHE', 'CLOUD', 'DEBUG',
      ];
      const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 5);
      addLine('');
      addLine('\u{1F500} <strong>Word Scramble!</strong>', 'accent');
      addLine('   Unscramble the tech word. 5 rounds!', 'dim');
      addLine('   Type your answer, or <span class="cmd-highlight">quit</span> to stop.', 'dim');
      addLine('');
      gameMode = 'scramble';
      gameState = { words: shuffled, current: 0, score: 0, total: shuffled.length };
      showScrambleWord();
    },

    tictactoe: () => {
      addLine('');
      addLine('\u{274E} <strong>Tic Tac Toe!</strong>', 'accent');
      addLine('   You are <span style="color:#7aa2f7">X</span>, CPU is <span style="color:#f7768e">O</span>.', 'dim');
      addLine('   Type a number (1\u20149) to place your mark:', 'dim');
      addLine('');
      gameMode = 'tictactoe';
      gameState = {
        board: [' ',' ',' ',' ',' ',' ',' ',' ',' '],
        player: 'X',
        cpu: 'O',
      };
      showTTTGuide();
      showTTTBoard();
    },

    emoji: () => {
      const puzzles = [
        { emojis: '\u{2615}\u{2615}', answer: 'java', hint: 'A programming language' },
        { emojis: '\u{1F40D}\u{1F4BB}', answer: 'python', hint: 'Snake + code' },
        { emojis: '\u{1F433}\u{1F4E6}', answer: 'docker', hint: 'Whale + packages' },
        { emojis: '\u{2699}\u{FE0F}\u{1F343}', answer: 'spring', hint: 'Gear + leaf' },
        { emojis: '\u{1F512}\u{1F310}', answer: 'https', hint: 'Lock + web' },
        { emojis: '\u{1F41B}\u{1F50D}', answer: 'debug', hint: 'Bug + search' },
        { emojis: '\u{2601}\u{FE0F}\u{1F4BB}', answer: 'cloud', hint: 'Cloud computing' },
        { emojis: '\u{1F4CA}\u{1F50E}', answer: 'elasticsearch', hint: 'Charts + search' },
        { emojis: '\u{1F431}\u{1F4BB}', answer: 'github', hint: 'Cat + code' },
        { emojis: '\u{1F916}\u{1F9E0}', answer: 'ai', hint: 'Robot + brain' },
        { emojis: '\u{1F525}\u{1F4E1}', answer: 'firebase', hint: 'Fire + signal' },
        { emojis: '\u{1F40B}\u{1F4AC}', answer: 'kafka', hint: 'Whale + messages' },
        { emojis: '\u{1F3F0}\u{1F510}', answer: 'auth', hint: 'Castle + lock' },
        { emojis: '\u{1F4E6}\u{1F4E6}\u{1F4E6}', answer: 'microservices', hint: 'Many small packages' },
        { emojis: '\u{26A1}\u{1F4BE}', answer: 'redis', hint: 'Lightning + memory' },
      ];
      const shuffled = [...puzzles].sort(() => Math.random() - 0.5).slice(0, 5);
      addLine('');
      addLine('\u{1F9E9} <strong>Emoji Decoder!</strong>', 'accent');
      addLine('   Guess the tech concept from the emojis. 5 rounds!', 'dim');
      addLine('   Type your answer, or <span class="cmd-highlight">quit</span> to stop.', 'dim');
      addLine('');
      gameMode = 'emoji';
      gameState = { puzzles: shuffled, current: 0, score: 0, total: shuffled.length };
      showEmojiPuzzle();
    },

    // --- Quick games (single command, no game mode) ---
    flip_coin: () => {
      const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
      const emoji = result === 'Heads' ? '\u{1FA99}' : '\u{1FA99}';
      addLine('');
      addLine('   ' + emoji + ' Flipping...', 'warning');
      setTimeout(() => {
        addLine('   \u{27A1}\u{FE0F} It\'s <strong>' + result + '</strong>!', 'success');
        addLine('');
      }, 800);
    },

    roll: () => {
      const die = Math.floor(Math.random() * 6) + 1;
      const faces = ['\u2680','\u2681','\u2682','\u2683','\u2684','\u2685'];
      addLine('');
      addLine('   \u{1F3B2} Rolling...', 'warning');
      setTimeout(() => {
        addLine('   ' + faces[die - 1] + ' You rolled a <strong>' + die + '</strong>!', 'success');
        addLine('');
      }, 600);
    },

    mathblitz: () => {
      addLine('');
      addLine('\u{1F9EE} <strong>Math Blitz!</strong>', 'accent');
      addLine('   Solve as many as you can in 30 seconds!', 'dim');
      addLine('   Type your answer, or <span class="cmd-highlight">quit</span> to stop.', 'dim');
      addLine('');
      gameMode = 'mathblitz';
      gameState = { score: 0, endTime: Date.now() + 30000 };
      generateMathQuestion();
    },

    // ===== VISUAL EFFECTS =====
    matrix: () => {
      const canvas = document.getElementById('matrixCanvas');
      const vignette = document.getElementById('matrixVignette');
      if (!canvas) { addLine('   Matrix canvas not found.', 'error'); return; }

      if (canvas.classList.contains('active')) {
        stopMatrixRain();
        addLine('');
        addLine('   \u{1F534} Matrix rain stopped.', 'warning');
        addLine('');
      } else {
        // Stop party if running
        if (document.body.classList.contains('party-mode')) stopPartyMode();

        canvas.classList.add('active');
        if (vignette) vignette.classList.add('active');
        document.body.classList.add('matrix-mode');
        startMatrixRain(canvas);
        document.querySelectorAll('.welcome-pill[data-cmd="matrix"]').forEach(b => b.classList.add('pill-active'));

        addLine('');
        addLine('   \u{1F7E2} <strong>Matrix mode activated!</strong> The portfolio is now digital.', 'success');
        addLine('   Scroll the site! Auto-stops in 30s. Type <span class="cmd-highlight">matrix</span> to stop.', 'dim');
        addLine('');

        // Floating stop button
        if (!document.getElementById('matrixStopBtn')) {
          const btn = document.createElement('button');
          btn.id = 'matrixStopBtn';
          btn.textContent = '> exit matrix_';
          btn.addEventListener('click', () => { stopMatrixRain(); });
          document.body.appendChild(btn);
        }

        // Auto-stop after 30 seconds
        if (matrixTimeout) clearTimeout(matrixTimeout);
        matrixTimeout = setTimeout(() => { stopMatrixRain(); }, 30000);

        hideTerminal();
      }
    },

    party: () => {
      const isOn = document.body.classList.contains('party-mode');
      addLine('');
      if (isOn) {
        stopPartyMode();
        addLine('   \u{1F3B5} Party\'s over. Back to work!', 'warning');
      } else {
        // Stop matrix if running
        if (document.body.classList.contains('matrix-mode')) stopMatrixRain();

        document.body.classList.add('party-mode');
        triggerConfetti();
        document.querySelectorAll('.welcome-pill[data-cmd="party"]').forEach(b => b.classList.add('pill-active'));

        addLine('   \u{1F389}\u{1F7E3}\u{1F7E1}\u{1F535}\u{1F534}\u{1F7E2} PARTY MODE ACTIVATED!', 'success');
        addLine('   \u{1F3B6} Scroll the site \u2014 the whole portfolio is dancing!', 'accent');
        addLine('   Auto-stops in 30s. Type <span class="cmd-highlight">party</span> to stop early.', 'dim');

        // Repeating confetti bursts
        partyConfettiInterval = setInterval(() => {
          if (!document.body.classList.contains('party-mode')) return;
          triggerConfetti();
        }, 5000);

        // Floating stop button
        if (!document.getElementById('partyStopBtn')) {
          const btn = document.createElement('button');
          btn.id = 'partyStopBtn';
          btn.innerHTML = '\u{1F389} Stop Party';
          btn.addEventListener('click', () => { stopPartyMode(); });
          document.body.appendChild(btn);
        }

        // Auto-stop after 30 seconds
        if (partyTimeout) clearTimeout(partyTimeout);
        partyTimeout = setTimeout(() => { stopPartyMode(); }, 30000);

        hideTerminal();
      }
      addLine('');
    },

    flip: () => {
      addLine('');
      addLine('   \u{1F504} Flipping the world upside down...', 'warning');
      addLine('');
      document.body.classList.add('flipped');
      setTimeout(() => {
        document.body.classList.remove('flipped');
        addLine('   \u{2705} Phew! Back to normal.', 'success');
        addLine('');
      }, 3000);
    },

    // ===== GOOGLE-STYLE EASTER EGGS =====
    'barrel roll': () => {
      addLine('');
      addLine('   \u{1F300} Do a barrel roll! Hold on tight...', 'accent');
      addLine('');
      document.documentElement.classList.add('barrel-roll');
      document.documentElement.addEventListener('animationend', function handler(e) {
        if (e.animationName !== 'barrelRoll') return;
        document.documentElement.classList.remove('barrel-roll');
        document.documentElement.removeEventListener('animationend', handler);
      });
    },

    gravity: () => {
      if (document.body.classList.contains('gravity-running')) return;
      addLine('');
      addLine('   \u{1F30D} Gravity activated! Grab & throw elements with your cursor!', 'accent');
      addLine('');
      document.body.classList.add('gravity-running');
      hideTerminal();

      // Wait for terminal to fully hide before starting physics
      setTimeout(function() {
        // Scroll to top and lock scroll so all content is in viewport
        window.scrollTo({ top: 0, behavior: 'instant' });
        var origOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // Select non-overlapping leaf elements (no parent/child doubles)
        var selectors = 'nav, .hero-name, .hero-tagline, .hero-description, .hero-cta, .scroll-indicator, .stat-item, .section-title, .section-subtitle, .skill-card, .project-card, .timeline-item, .education-card, .cert-card, .about-image, .about-bio, .contact-form, .contact-info, .footer, .section-divider';

        var elements = Array.from(document.querySelectorAll(selectors)).filter(function(el) {
          var rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        });

        // Remove parent elements that contain other selected elements (avoid double-transform)
        elements = elements.filter(function(el) {
          return !elements.some(function(other) {
            return other !== el && el.contains(other);
          });
        });

        var bodies = elements.map(function(el) {
          var rect = el.getBoundingClientRect();
          return {
            el: el,
            currentX: rect.left,
            currentY: rect.top,
            width: rect.width,
            height: rect.height,
            offsetX: 0,
            offsetY: 0,
            vx: 0,
            vy: 0,
            vr: (Math.random() - 0.5) * 2,
            rotation: 0,
            settled: false,
            delay: Math.random() * 80
          };
        });

        // Make elements grabbable
        bodies.forEach(function(b) {
          b.el.style.cursor = 'grab';
          b.el.style.userSelect = 'none';
          b.el.style.webkitUserSelect = 'none';
          b.el.style.position = 'relative';
          b.el.style.zIndex = '1';
        });

        var G = 0.18, BOUNCE = 0.2, FRICTION = 0.985, FLOOR_FRICTION = 0.94;
        var FLOOR = window.innerHeight;
        var WALL_L = 0, WALL_R = window.innerWidth;
        var animId, frame = 0, running = true;

        // --- Mouse drag state ---
        var dragging = null;
        var dragOffsetX = 0, dragOffsetY = 0;
        var lastMX = 0, lastMY = 0, mouseVX = 0, mouseVY = 0;

        // Walk up the DOM tree to find the closest body element
        function findBody(target) {
          var node = target;
          while (node && node !== document.body) {
            for (var i = 0; i < bodies.length; i++) {
              if (bodies[i].el === node) return bodies[i];
            }
            node = node.parentElement;
          }
          return null;
        }

        function onDown(e) {
          var clientX = e.touches ? e.touches[0].clientX : e.clientX;
          var clientY = e.touches ? e.touches[0].clientY : e.clientY;
          var b = findBody(e.target);
          if (!b) return;
          dragging = b;
          dragging.settled = false;
          dragging.vy = 0;
          dragging.vx = 0;
          dragging.vr = 0;
          var rect = dragging.el.getBoundingClientRect();
          dragOffsetX = clientX - rect.left;
          dragOffsetY = clientY - rect.top;
          lastMX = clientX;
          lastMY = clientY;
          mouseVX = 0;
          mouseVY = 0;
          dragging.el.style.cursor = 'grabbing';
          dragging.el.style.zIndex = '9999';
          e.preventDefault();
        }

        function onMove(e) {
          if (!dragging) return;
          var clientX = e.touches ? e.touches[0].clientX : e.clientX;
          var clientY = e.touches ? e.touches[0].clientY : e.clientY;
          mouseVX = (clientX - lastMX) * 0.8;
          mouseVY = (clientY - lastMY) * 0.8;
          lastMX = clientX;
          lastMY = clientY;
          var newX = clientX - dragOffsetX;
          var newY = clientY - dragOffsetY;
          dragging.offsetX = newX - dragging.currentX;
          dragging.offsetY = newY - dragging.currentY;
          dragging.el.style.transform = 'translateX(' + dragging.offsetX + 'px) translateY(' + dragging.offsetY + 'px) rotate(' + dragging.rotation + 'deg)';
          e.preventDefault();
        }

        function onUp() {
          if (!dragging) return;
          // Throw with stronger velocity
          dragging.vx = mouseVX * 1.5;
          dragging.vy = mouseVY * 1.5;
          dragging.vr = mouseVX * 0.2;
          dragging.settled = false;
          dragging.el.style.cursor = 'grab';
          dragging.el.style.zIndex = '1';
          dragging = null;
        }

        document.addEventListener('mousedown', onDown);
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
        document.addEventListener('touchstart', onDown, { passive: false });
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onUp);

        // --- Physics loop (runs continuously so dragged items keep working) ---
        function step() {
          if (!running) return;
          frame++;

          bodies.forEach(function(b) {
            if (b === dragging) return;
            if (b.settled) return;
            if (frame < b.delay) return;

            b.vy += G;
            b.vy *= FRICTION;
            b.vx *= FRICTION;
            b.offsetY += b.vy;
            b.offsetX += b.vx;
            b.rotation += b.vr;
            b.vr *= 0.995;

            var onFloor = false;

            // Floor
            if (b.currentY + b.offsetY + b.height >= FLOOR) {
              b.offsetY = FLOOR - b.currentY - b.height;
              b.vy *= -BOUNCE;
              b.vx *= FLOOR_FRICTION;
              b.vr *= 0.8;
              onFloor = true;
            }
            // Ceiling
            if (b.currentY + b.offsetY < 0) {
              b.offsetY = -b.currentY;
              b.vy *= -BOUNCE;
            }
            // Left wall
            if (b.currentX + b.offsetX < WALL_L) {
              b.offsetX = WALL_L - b.currentX;
              b.vx *= -BOUNCE;
              b.vr = -b.vr * 0.5;
            }
            // Right wall
            if (b.currentX + b.offsetX + b.width > WALL_R) {
              b.offsetX = WALL_R - b.currentX - b.width;
              b.vx *= -BOUNCE;
              b.vr = -b.vr * 0.5;
            }

            // Settle
            if (onFloor && Math.abs(b.vy) < 0.4 && Math.abs(b.vx) < 0.3 && Math.abs(b.vr) < 0.1) {
              b.settled = true;
              b.vy = 0;
              b.vx = 0;
              b.vr = 0;
            }

            b.el.style.transform = 'translateX(' + b.offsetX + 'px) translateY(' + b.offsetY + 'px) rotate(' + b.rotation + 'deg)';
          });

          animId = requestAnimationFrame(step);
        }
        animId = requestAnimationFrame(step);

        // Cleanup after 40 seconds
        setTimeout(function() {
          running = false;
          cancelAnimationFrame(animId);
          document.removeEventListener('mousedown', onDown);
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
          document.removeEventListener('touchstart', onDown);
          document.removeEventListener('touchmove', onMove);
          document.removeEventListener('touchend', onUp);
          document.body.style.overflow = origOverflow;
          bodies.forEach(function(b) {
            b.el.style.cursor = '';
            b.el.style.userSelect = '';
            b.el.style.webkitUserSelect = '';
            b.el.style.zIndex = '';
            b.el.style.position = '';
            b.el.style.transition = 'transform 1s ease-out';
            b.el.style.transform = '';
          });
          setTimeout(function() {
            bodies.forEach(function(b) { b.el.style.transition = ''; });
            document.body.classList.remove('gravity-running');
          }, 1100);
        }, 40000);
      }, 1300);
    },

    askew: () => {
      addLine('');
      addLine('   \u{1F4D0} Things look a little... askew.', 'accent');
      addLine('');
      hideTerminal();
      // Apply tilt after terminal hides
      setTimeout(function() {
        document.body.style.transition = 'transform 1.5s ease';
        document.body.style.transform = 'rotate(2deg)';
        document.body.style.transformOrigin = 'center center';
      }, 1300);
      setTimeout(function() {
        document.body.style.transition = 'transform 1.5s ease';
        document.body.style.transform = '';
        setTimeout(function() { document.body.style.transition = ''; document.body.style.transformOrigin = ''; }, 1600);
      }, 35000);
    },

    thanos: () => {
      if (document.body.classList.contains('thanos-running')) return;
      addLine('');
      addLine('   \u{1F91C}\u{1F48E} <strong>*snap*</strong> I am... inevitable.', 'accent');
      addLine('');
      document.body.classList.add('thanos-running');
      hideTerminal();

      // Wait for terminal to hide before snapping
      setTimeout(function() {
        var selectors = '.skill-card, .project-card, .timeline-item, .stat-item, .education-card, .cert-card, .section-title, .section-subtitle, .hero-name, .hero-tagline, .hero-description, .hero-cta, .about-image, .about-bio, .contact-form, .contact-info, .nav-links li, .btn, .section-number, .skill-tag, .timeline-dot';
        var elements = Array.from(document.querySelectorAll(selectors)).filter(function(el) {
          var rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        });

        var shuffled = elements.slice().sort(function() { return Math.random() - 0.5; });
        var dusted = shuffled.slice(0, Math.ceil(shuffled.length / 2));

        // Slow, dramatic disintegration — staggered over 4 seconds
        dusted.forEach(function(el) {
          var dx = (Math.random() * 150 - 75);
          var dy = (Math.random() * -100 - 30);
          var dr = (Math.random() * 40 - 20);
          el.style.transition = 'transform 4s ease-out, opacity 4s ease-out, filter 4s ease-out';
          el.style.transitionDelay = (Math.random() * 3) + 's';
          el.style.transform = 'translateX(' + dx + 'px) translateY(' + dy + 'px) scale(0.2) rotate(' + dr + 'deg)';
          el.style.opacity = '0';
          el.style.filter = 'blur(8px)';
        });

        // Restore after 35 seconds
        setTimeout(function() {
          dusted.forEach(function(el) {
            el.style.transition = 'transform 1.5s ease, opacity 1.5s ease, filter 1.5s ease';
            el.style.transitionDelay = (Math.random() * 0.8) + 's';
            el.style.transform = '';
            el.style.opacity = '';
            el.style.filter = '';
          });
          setTimeout(function() {
            dusted.forEach(function(el) { el.style.transition = ''; el.style.transitionDelay = ''; });
            document.body.classList.remove('thanos-running');
          }, 2500);
        }, 35000);
      }, 1300);
    },

    blink: () => {
      addLine('');
      addLine('   \u{1F440} &lt;blink&gt; Bringing back the 90s! &lt;/blink&gt;', 'accent');
      addLine('');
      hideTerminal();
      // Start blink after terminal hides so it applies to portfolio content
      setTimeout(function() {
        document.body.classList.add('blink-mode');
      }, 1300);
      setTimeout(function() { document.body.classList.remove('blink-mode'); }, 35000);
    },

    recursion: () => {
      addLine('');
      addLine('   \u{1F504} Searching for: <strong>recursion</strong>...', 'accent');
      addLine('');
      var count = 0;
      var maxLines = 20;
      var interval = setInterval(function() {
        if (count >= maxLines) {
          clearInterval(interval);
          addLine('');
          addLine('   <span style="color:#f7768e">\u{274C} ERROR: Maximum call stack size exceeded!</span>', 'error');
          addLine('   <span style="color:#f7768e">   at recursion(portfolio.js:' + (Math.floor(Math.random() * 900) + 100) + ')</span>', 'error');
          addLine('   <span style="color:#f7768e">   at recursion(portfolio.js:' + (Math.floor(Math.random() * 900) + 100) + ')</span>', 'error');
          addLine('   <span style="color:#f7768e">   at recursion(portfolio.js:' + (Math.floor(Math.random() * 900) + 100) + ')</span>', 'error');
          addLine('   <span style="color:#565f89">   ... ' + (Math.floor(Math.random() * 9000) + 1000) + ' more frames</span>', 'dim');
          addLine('');
          addLine('   \u{1F4A5} <strong>Stack Overflow!</strong> Maybe try a different approach?', 'warning');
          addLine('');
          return;
        }
        count++;
        var indent = '';
        for (var i = 0; i < Math.min(count, 12); i++) indent += '  ';
        addLine('   ' + indent + '<span style="color:#565f89">recursion(</span><span style="color:#e0af68">' + count + '</span><span style="color:#565f89">)  \u2192  Did you mean:</span> <span class="cmd-highlight">recursion</span><span style="color:#565f89">?</span>');
      }, 200);
    },

    'comic sans': () => {
      addLine('');
      addLine('   \u{1F921} Comic Sans activated! Enjoy the forbidden font...', 'accent');
      addLine('');
      hideTerminal();
      setTimeout(function() {
        document.body.classList.add('comic-sans-mode');
      }, 1300);
      setTimeout(function() {
        document.body.classList.remove('comic-sans-mode');
      }, 40000);
    },

    // ===== FUN COMMANDS =====
    neofetch: () => {
      addLine('');
      addLine('   <span style="color:#6c63ff">vishal</span>@<span style="color:#48bfe3">production</span>', '');
      addLine('   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', '');
      addLine('   <span style="color:#9ece6a">OS:</span>         VishalOS v4.0 (stable)');
      addLine('   <span style="color:#9ece6a">Kernel:</span>     Java 17 + Spring Boot 4');
      addLine('   <span style="color:#9ece6a">Uptime:</span>     4+ years shipping to prod');
      addLine('   <span style="color:#9ece6a">Packages:</span>   Kafka, Redis, Mongo, ES, AI/ML');
      addLine('   <span style="color:#9ece6a">Shell:</span>      portfolio-terminal v2.0');
      addLine('   <span style="color:#9ece6a">Theme:</span>      ' + document.documentElement.getAttribute('data-theme'));
      addLine('   <span style="color:#9ece6a">CPU:</span>        Brain.java (overclocked)');
      addLine('   <span style="color:#9ece6a">GPU:</span>        Imagination.ai (limitless)');
      addLine('   <span style="color:#9ece6a">RAM:</span>        \u221E cups of coffee');
      addLine('   <span style="color:#9ece6a">Storage:</span>    12 microservices + counting');
      addLine('   <span style="color:#9ece6a">Network:</span>    Millions of requests/day');
      addLine('');
      addLine('   \u{1F7E5}\u{1F7E7}\u{1F7E8}\u{1F7E9}\u{1F7E6}\u{1F7EA}\u{2B1C}\u{2B1B}');
      addLine('');
    },

    fortune: () => {
      const quote = fortunes[Math.floor(Math.random() * fortunes.length)];
      addLine('');
      addLine('   \u{1F52E} ' + quote, 'accent');
      addLine('');
    },

    ascii: () => {
      addLine('');
      addLine('<span style="color:#6c63ff">  __     ___     _           _</span>');
      addLine('<span style="color:#6c63ff">  \\ \\   / (_)___| |__   __ _| |</span>');
      addLine('<span style="color:#48bfe3">   \\ \\ / /| / __| \'_ \\ / _` | |</span>');
      addLine('<span style="color:#48bfe3">    \\ V / | \\__ \\ | | | (_| | |</span>');
      addLine('<span style="color:#9ece6a">     \\_/  |_|___/_| |_|\\__,_|_|</span>');
      addLine('');
      addLine('   <span style="color:#f7768e">Software Engineer II @ Tekion</span>');
      addLine('');
    },

    ping: () => {
      addLine('');
      addLine('   PING portfolio.vishal.dev (127.0.0.1): 56 data bytes', '');
      let count = 0;
      const pingInterval = setInterval(() => {
        const ms = (Math.random() * 30 + 5).toFixed(1);
        addLine('   64 bytes from 127.0.0.1: seq=' + count + ' ttl=64 time=' + ms + ' ms', 'success');
        count++;
        if (count >= 4) {
          clearInterval(pingInterval);
          addLine('');
          addLine('   --- portfolio.vishal.dev ping statistics ---');
          addLine('   4 packets transmitted, 4 received, 0% packet loss', 'success');
          addLine('');
        }
      }, 600);
    },
  };

  // --- 8ball (takes argument) ---
  function handle8Ball(question) {
    if (!question) {
      addLine('');
      addLine('   \u{1F3B1} Usage: <span class="cmd-highlight">8ball &lt;your question&gt;</span>', 'warning');
      addLine('   Example: 8ball Will I get hired?', 'dim');
      addLine('');
      return;
    }
    const answer = eightBallResponses[Math.floor(Math.random() * eightBallResponses.length)];
    addLine('');
    addLine('   \u{1F3B1} Question: ' + question, 'dim');
    addLine('   \u{1F52E} ' + answer, 'accent');
    addLine('');
  }

  // --- Secret & misc commands ---
  commands['sudo hire vishal'] = () => {
    addLine('');
    addLine('   \u{2705} <strong>Excellent choice!</strong>', 'success');
    addLine('   \u{1F4E7} Sending offer letter to vishalkathpalia0@gmail.com...', 'success');
    addLine('   \u{1F680} vishal.exe has been promoted to CTO!', 'success');
    addLine('');
    addLine('   Just kidding \u{1F604} \u2014 but seriously, let\'s connect!', 'warning');
    addLine('   Type <span class="cmd-highlight">contact</span> to reach out.', 'dim');
    addLine('');
    triggerConfetti();
  };

  commands['sudo'] = () => {
    addLine('');
    addLine('   \u{1F6AB} Permission denied! Try <span class="cmd-highlight">sudo hire vishal</span> instead \u{1F609}', 'error');
    addLine('');
  };

  commands['ls'] = () => {
    addLine('');
    addLine('   about.txt  skills.json  experience.log  education.md  contact.cfg', 'accent');
    addLine('   games/     secrets/     coffee.jar       resume.pdf', 'accent');
    addLine('');
  };

  commands['cat'] = () => {
    addLine('');
    addLine('   \u{1F431} Meow! Did you mean a command? Try <span class="cmd-highlight">help</span>', 'warning');
    addLine('');
  };

  commands['rm -rf /'] = () => {
    addLine('');
    addLine('   \u{1F4A5} Deleting everything...', 'error');
    setTimeout(() => {
      addLine('   \u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588} 10%', 'error');
    }, 400);
    setTimeout(() => {
      addLine('   \u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588} 47%', 'error');
    }, 900);
    setTimeout(() => {
      addLine('   \u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588} 83%', 'error');
    }, 1400);
    setTimeout(() => {
      addLine('');
      addLine('   Just kidding! \u{1F605} This portfolio is indestructible.', 'success');
      addLine('   Nice try though, hacker! \u{1F60F}', 'warning');
      addLine('');
    }, 2000);
  };

  // --- Standard terminal commands (undocumented — devs just know these) ---
  commands['hello'] = () => { addLine(''); addLine('   \u{1F44B} Hey there! Welcome to the terminal!', 'success'); addLine(''); };
  commands['hi'] = commands['hello'];
  commands['hey'] = commands['hello'];

  commands['pwd'] = () => { addLine(''); addLine('   /home/visitor/vishal-portfolio', 'success'); addLine(''); };
  commands['cd'] = () => { addLine(''); addLine('   \u{1F6AB} You\'re already in the best directory!', 'warning'); addLine(''); };
  commands['vim'] = () => { addLine(''); addLine('   \u{1F609} Good luck exiting! (Hint: :q!)', 'warning'); addLine(''); };
  commands['nano'] = commands['vim'];
  commands['emacs'] = () => { addLine(''); addLine('   \u{1F609} Emacs is an OS — it just needs a good text editor.', 'warning'); addLine(''); };
  commands['git status'] = () => { addLine(''); addLine('   On branch <span style="color:#9ece6a">main</span>'); addLine('   nothing to commit, portfolio is clean \u{2728}', 'success'); addLine(''); };
  commands['git log'] = () => {
    addLine('');
    addLine('   <span style="color:#e0af68">commit a1b2c3d</span> (HEAD -> main)');
    addLine('   Author: Vishal Kathpalia');
    addLine('   Date:   ' + new Date().toDateString());
    addLine('');
    addLine('       Built an awesome portfolio terminal', 'success');
    addLine('');
  };
  commands['git pull'] = () => { addLine(''); addLine('   Already up to date.', 'success'); addLine(''); };
  commands['git push'] = () => { addLine(''); addLine('   Everything up-to-date', 'success'); addLine(''); };
  commands['git diff'] = () => { addLine(''); addLine('   No changes detected. Code is pristine.', 'success'); addLine(''); };

  // Aliases for clear
  commands['cls'] = commands['clear'];
  commands['reset'] = commands['clear'];

  // Aliases for exit
  commands['quit'] = commands['exit'];
  commands['q'] = commands['exit'];
  commands['logout'] = commands['exit'];

  // echo — prints whatever the user types after it (handled specially in input handler)
  // history — shows command history
  commands['history'] = () => {
    addLine('');
    if (history.length === 0) {
      addLine('   No commands in history yet.', 'dim');
    } else {
      history.forEach((cmd, i) => {
        addLine('   <span style="color:#565f89">' + String(i + 1).padStart(4) + '</span>  ' + cmd);
      });
    }
    addLine('');
  };

  commands['uptime'] = () => {
    const now = new Date();
    const boot = performance.timeOrigin || (Date.now() - performance.now());
    const secs = Math.floor((now.getTime() - boot) / 1000);
    const mins = Math.floor(secs / 60);
    const hrs = Math.floor(mins / 60);
    const upStr = hrs > 0 ? hrs + 'h ' + (mins % 60) + 'm' : mins + 'm ' + (secs % 60) + 's';
    addLine('');
    addLine('   up ' + upStr + ', 1 user, load average: 0.42, 0.31, 0.28', 'success');
    addLine('');
  };

  commands['hostname'] = () => { addLine(''); addLine('   vishal-portfolio.local', 'success'); addLine(''); };
  commands['uname'] = () => { addLine(''); addLine('   VishalOS 4.0.0 vishal-portfolio aarch64', 'success'); addLine(''); };
  commands['uname -a'] = commands['uname'];

  commands['whoami'] = () => {
    addLine('');
    addLine('   visitor', 'success');
    addLine('');
  };

  commands['id'] = () => { addLine(''); addLine('   uid=1000(visitor) gid=1000(visitors) groups=1000(visitors),27(sudo)', 'success'); addLine(''); };

  commands['which'] = () => { addLine(''); addLine('   Usage: which <command>', 'warning'); addLine(''); };

  commands['man'] = () => {
    addLine('');
    addLine('   No manual entry \u2014 but try <span class="cmd-highlight">help</span> for available commands.', 'warning');
    addLine('');
  };

  commands['top'] = () => {
    addLine('');
    addLine('   PID  USER      CPU%  MEM%  COMMAND', 'accent');
    addLine('   1    vishal    4.2   1.3   portfolio-server');
    addLine('   42   vishal    2.1   0.8   terminal-ui');
    addLine('   99   vishal    0.3   0.2   particle-engine');
    addLine('   128  vishal    0.1   0.1   theme-watcher');
    addLine('');
  };
  commands['htop'] = commands['top'];
  commands['ps'] = commands['top'];
  commands['ps aux'] = commands['top'];

  commands['env'] = () => {
    addLine('');
    addLine('   USER=visitor');
    addLine('   HOME=/home/visitor/vishal-portfolio');
    addLine('   SHELL=/bin/portfolio-sh');
    addLine('   TERM=xterm-256color');
    addLine('   LANG=en_IN.UTF-8');
    addLine('   EDITOR=vim');
    addLine('   NODE_ENV=production');
    addLine('   COFFEE_LEVEL=critical');
    addLine('');
  };

  commands['printenv'] = commands['env'];

  commands['touch'] = () => { addLine(''); addLine('   Permission denied: read-only filesystem', 'error'); addLine(''); };
  commands['mkdir'] = commands['touch'];
  commands['rm'] = commands['touch'];
  commands['mv'] = commands['touch'];
  commands['cp'] = commands['touch'];
  commands['chmod'] = commands['touch'];
  commands['chown'] = commands['touch'];

  commands['curl'] = () => {
    addLine('');
    addLine('   HTTP/1.1 200 OK');
    addLine('   Content-Type: application/json');
    addLine('');
    addLine('   { "status": "alive", "engineer": "Vishal Kathpalia" }', 'success');
    addLine('');
  };
  commands['wget'] = commands['curl'];

  commands['grep'] = () => { addLine(''); addLine('   Usage: grep <pattern> \u2014 try searching the portfolio instead!', 'warning'); addLine(''); };
  commands['find'] = commands['grep'];

  commands['ssh'] = () => { addLine(''); addLine('   Connection refused \u2014 you\'re already inside the machine.', 'warning'); addLine(''); };

  commands['docker ps'] = () => {
    addLine('');
    addLine('   CONTAINER ID   IMAGE                  STATUS       PORTS');
    addLine('   a1b2c3d4       vishal/portfolio:latest Up 4+ yrs   0.0.0.0:80->80', 'success');
    addLine('');
  };
  commands['docker'] = () => { addLine(''); addLine('   Usage: docker <command> \u2014 try <span class="cmd-highlight">docker ps</span>', 'warning'); addLine(''); };

  commands['npm'] = () => { addLine(''); addLine('   npm WARN this is a Java shop \u2014 try <span class="cmd-highlight">mvn clean install</span> instead', 'warning'); addLine(''); };
  commands['yarn'] = commands['npm'];
  commands['pip'] = () => { addLine(''); addLine('   pip: command found, but Vishal prefers Maven.', 'warning'); addLine(''); };

  commands['python'] = () => { addLine(''); addLine('   Python 3.12.0 \u2014 but this terminal runs on vibes, not CPython.', 'warning'); addLine(''); };
  commands['python3'] = commands['python'];
  commands['node'] = commands['python'];
  commands['java'] = () => { addLine(''); addLine('   Now you\'re speaking Vishal\'s language! Try <span class="cmd-highlight">about</span> or <span class="cmd-highlight">skills</span>.', 'success'); addLine(''); };

  commands['mvn clean install'] = () => {
    addLine('');
    addLine('   [INFO] BUILD SUCCESS', 'success');
    addLine('   [INFO] Total time: 0.042s (powered by caffeine)', 'success');
    addLine('');
  };

  commands['ifconfig'] = () => {
    addLine('');
    addLine('   lo0: 127.0.0.1');
    addLine('   eth0: 192.168.1.42  netmask 255.255.255.0', 'success');
    addLine('');
  };
  commands['ip addr'] = commands['ifconfig'];

  commands['df'] = () => { addLine(''); addLine('   Filesystem      Size  Used  Avail  Use%'); addLine('   /dev/portfolio  \u221E     42G   \u221E      0%', 'success'); addLine(''); };
  commands['df -h'] = commands['df'];
  commands['free'] = () => { addLine(''); addLine('   Mem:   \u221E total, \u221E available (powered by \u2615)', 'success'); addLine(''); };

  commands['cat resume.pdf'] = () => { commands['resume'](); };
  commands['cat about.txt'] = () => { commands['about'](); };

  // Game aliases
  commands['coin'] = commands['flip_coin'];
  commands['flip coin'] = commands['flip_coin'];
  commands['dice'] = commands['roll'];

  commands['open'] = () => { addLine(''); addLine('   Usage: try <span class="cmd-highlight">resume</span> to open the resume.', 'dim'); addLine(''); };
  commands['xdg-open'] = commands['open'];

  // Easter egg aliases
  commands['do a barrel roll'] = commands['barrel roll'];
  commands['barrelroll'] = commands['barrel roll'];
  commands['tilt'] = commands['askew'];
  commands['snap'] = commands['thanos'];

  // ===== QUIZ GAME LOGIC =====
  function showQuizQuestion() {
    const q = gameState.questions[gameState.current];
    addLine('   <strong>Q' + (gameState.current + 1) + '/' + gameState.total + ':</strong> ' + q.q, 'accent');
    q.choices.forEach(c => addLine('      ' + c, ''));
    addLine('');
  }

  function handleQuizAnswer(ans) {
    const q = gameState.questions[gameState.current];
    if (ans === q.answer) {
      gameState.score++;
      addLine('   \u{2705} Correct!', 'success');
    } else {
      addLine('   \u{274C} Wrong! Answer was: ' + q.answer.toUpperCase(), 'error');
    }
    gameState.current++;
    addLine('');

    if (gameState.current >= gameState.total) {
      const pct = Math.round((gameState.score / gameState.total) * 100);
      addLine('   \u{1F3C1} <strong>Quiz Complete!</strong>', 'accent');
      addLine('   Score: ' + gameState.score + '/' + gameState.total + ' (' + pct + '%)', pct >= 70 ? 'success' : 'warning');
      if (pct === 100) { addLine('   \u{1F3C6} Perfect score! You\'re a tech genius!', 'success'); triggerConfetti(); }
      else if (pct >= 70) addLine('   \u{1F31F} Great job!', 'success');
      else if (pct >= 40) addLine('   \u{1F4AA} Not bad, keep learning!', 'warning');
      else addLine('   \u{1F4DA} Time to hit the books!', 'error');
      addLine('');
      gameMode = null;
      gameState = {};
    } else {
      showQuizQuestion();
    }
  }

  // ===== GUESS GAME LOGIC =====
  function handleGuessInput(val) {
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 1 || num > 10) {
      addLine('   \u{26A0}\u{FE0F} Please enter a number between 1 and 10.', 'warning');
      return;
    }
    gameState.attempts++;
    if (num === gameState.target) {
      addLine('   \u{1F389} Correct! The number was ' + gameState.target + '!', 'success');
      addLine('   You got it in ' + gameState.attempts + ' attempt' + (gameState.attempts > 1 ? 's' : '') + '!', 'success');
      if (gameState.attempts <= 3) { addLine('   \u{1F3C6} Incredible luck!', 'success'); triggerConfetti(); }
      addLine('');
      gameMode = null;
      gameState = {};
    } else if (gameState.attempts >= gameState.maxAttempts) {
      addLine('   \u{1F4A8} Out of attempts! The number was <strong>' + gameState.target + '</strong>.', 'error');
      addLine('');
      gameMode = null;
      gameState = {};
    } else {
      const remaining = gameState.maxAttempts - gameState.attempts;
      const hint = num < gameState.target ? '\u{2B06}\u{FE0F} Too low!' : '\u{2B07}\u{FE0F} Too high!';
      addLine('   ' + hint + ' (' + remaining + ' attempt' + (remaining > 1 ? 's' : '') + ' left)', 'warning');
      addLine('');
    }
  }

  // ===== RPS GAME LOGIC =====
  function handleRpsInput(choice) {
    const moves = ['rock', 'paper', 'scissors'];
    if (!moves.includes(choice)) {
      addLine('   Type <span class="cmd-highlight">rock</span>, <span class="cmd-highlight">paper</span>, or <span class="cmd-highlight">scissors</span>.', 'warning');
      return;
    }
    const emojis = { rock: '\u{270A}', paper: '\u{1F590}\u{FE0F}', scissors: '\u{270C}\u{FE0F}' };
    const cpuChoice = moves[Math.floor(Math.random() * 3)];
    gameState.round++;

    addLine('   You: ' + emojis[choice] + ' ' + choice + '  vs  CPU: ' + emojis[cpuChoice] + ' ' + cpuChoice, '');

    if (choice === cpuChoice) {
      addLine('   \u{1F91D} It\'s a tie!', 'warning');
    } else if (
      (choice === 'rock' && cpuChoice === 'scissors') ||
      (choice === 'paper' && cpuChoice === 'rock') ||
      (choice === 'scissors' && cpuChoice === 'paper')
    ) {
      gameState.playerScore++;
      addLine('   \u{2705} You win this round!', 'success');
    } else {
      gameState.cpuScore++;
      addLine('   \u{274C} CPU wins this round!', 'error');
    }

    addLine('   Score: You ' + gameState.playerScore + ' \u2014 CPU ' + gameState.cpuScore + ' (Round ' + gameState.round + '/' + gameState.maxRounds + ')', 'dim');
    addLine('');

    if (gameState.round >= gameState.maxRounds) {
      addLine('   \u{1F3C1} <strong>Game Over!</strong>', 'accent');
      if (gameState.playerScore > gameState.cpuScore) {
        addLine('   \u{1F389} You win ' + gameState.playerScore + '-' + gameState.cpuScore + '! GG!', 'success');
        triggerConfetti();
      } else if (gameState.playerScore < gameState.cpuScore) {
        addLine('   \u{1F916} CPU wins ' + gameState.cpuScore + '-' + gameState.playerScore + '. Better luck next time!', 'error');
      } else {
        addLine('   \u{1F91D} It\'s a draw! ' + gameState.playerScore + '-' + gameState.cpuScore, 'warning');
      }
      addLine('');
      gameMode = null;
      gameState = {};
    }
  }

  // ===== HANGMAN GAME LOGIC =====
  const hangmanArt = [
    // 0 wrong
    ['   ┌──────┐ ', '   │      │ ', '   │        ', '   │        ', '   │        ', '   │        ', '   └────────'],
    // 1 wrong — head
    ['   ┌──────┐ ', '   │      │ ', '   │      O ', '   │        ', '   │        ', '   │        ', '   └────────'],
    // 2 wrong — body
    ['   ┌──────┐ ', '   │      │ ', '   │      O ', '   │      │ ', '   │        ', '   │        ', '   └────────'],
    // 3 wrong — left arm
    ['   ┌──────┐ ', '   │      │ ', '   │      O ', '   │     /│ ', '   │        ', '   │        ', '   └────────'],
    // 4 wrong — both arms
    ['   ┌──────┐ ', '   │      │ ', '   │      O ', '   │     /│\\', '   │        ', '   │        ', '   └────────'],
    // 5 wrong — left leg
    ['   ┌──────┐ ', '   │      │ ', '   │      O ', '   │     /│\\', '   │     /  ', '   │        ', '   └────────'],
    // 6 wrong — dead
    ['   ┌──────┐ ', '   │      │ ', '   │      O ', '   │     /│\\', '   │     / \\', '   │        ', '   └────────'],
  ];

  function showHangman() {
    const art = hangmanArt[Math.min(gameState.wrong, 6)];
    art.forEach(line => addLine('<span style="color:#565f89">' + line + '</span>', ''));
    addLine('');
    // Show word progress
    const display = gameState.word.split('').map(ch => gameState.guessed.includes(ch) ? ch : '_').join(' ');
    addLine('   ' + display, 'accent');
    addLine('');
    if (gameState.guessed.length > 0) {
      addLine('   Guessed: ' + gameState.guessed.join(', '), 'dim');
    }
    addLine('   Remaining: ' + (gameState.maxWrong - gameState.wrong) + ' wrong guesses', 'dim');
    addLine('');
  }

  function handleHangmanInput(letter) {
    const ch = letter.toUpperCase();
    if (ch.length !== 1 || !/[A-Z]/.test(ch)) {
      addLine('   Type a single letter (A–Z).', 'warning');
      return;
    }
    if (gameState.guessed.includes(ch)) {
      addLine('   You already guessed <strong>' + ch + '</strong>. Try another letter.', 'warning');
      return;
    }
    gameState.guessed.push(ch);

    if (gameState.word.includes(ch)) {
      addLine('   ✅ <strong>' + ch + '</strong> is in the word!', 'success');
    } else {
      gameState.wrong++;
      addLine('   ❌ <strong>' + ch + '</strong> is not in the word!', 'error');
    }
    addLine('');

    // Check win
    const won = gameState.word.split('').every(c => gameState.guessed.includes(c));
    if (won) {
      showHangman();
      addLine('   🎉 <strong>You got it!</strong> The word was <strong>' + gameState.word + '</strong>!', 'success');
      addLine('');
      triggerConfetti();
      gameMode = null;
      gameState = {};
      return;
    }

    // Check loss
    if (gameState.wrong >= gameState.maxWrong) {
      showHangman();
      addLine('   💀 <strong>Game over!</strong> The word was <strong>' + gameState.word + '</strong>.', 'error');
      addLine('');
      gameMode = null;
      gameState = {};
      return;
    }

    showHangman();
  }

  // ===== TYPING TEST LOGIC =====
  function handleTypingTestInput(typed) {
    const elapsed = (Date.now() - gameState.startTime) / 1000;
    const target = gameState.sentence;
    const words = target.split(' ').length;
    const wpm = Math.round((words / elapsed) * 60);

    // Calculate accuracy
    let correct = 0;
    const maxLen = Math.max(typed.length, target.length);
    for (let i = 0; i < maxLen; i++) {
      if (typed[i] === target[i]) correct++;
    }
    const accuracy = Math.round((correct / maxLen) * 100);

    addLine('');
    addLine('   📊 <strong>Results</strong>', 'accent');
    addLine('   ⏱️  Time: ' + elapsed.toFixed(1) + 's', '');
    addLine('   ⚡ Speed: <strong>' + wpm + ' WPM</strong>', wpm >= 60 ? 'success' : wpm >= 30 ? 'warning' : 'error');
    addLine('   🎯 Accuracy: <strong>' + accuracy + '%</strong>', accuracy >= 90 ? 'success' : accuracy >= 70 ? 'warning' : 'error');
    addLine('');

    if (accuracy === 100 && wpm >= 60) {
      addLine('   🏆 Perfect! You\'re a typing machine!', 'success');
      triggerConfetti();
    } else if (accuracy >= 90) {
      addLine('   🌟 Great accuracy! Keep it up.', 'success');
    } else if (accuracy >= 70) {
      addLine('   💪 Not bad — practice makes perfect!', 'warning');
    } else {
      addLine('   📖 Slow down and focus on accuracy.', 'dim');
    }
    addLine('');

    gameMode = null;
    gameState = {};
  }

  // ===== WORD SCRAMBLE LOGIC =====
  function scrambleWord(word) {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Make sure it's actually different from the original
    const result = arr.join('');
    if (result === word && word.length > 1) return scrambleWord(word);
    return result;
  }

  function showScrambleWord() {
    const word = gameState.words[gameState.current];
    const scrambled = scrambleWord(word);
    gameState.currentScrambled = scrambled;
    addLine('   Round ' + (gameState.current + 1) + '/' + gameState.total, 'dim');
    addLine('   🔤 <span style="color:#7aa2f7;font-size:1.1em;letter-spacing:4px"><strong>' + scrambled + '</strong></span>', '');
    addLine('');
  }

  function handleScrambleInput(answer) {
    const word = gameState.words[gameState.current];
    if (answer.toUpperCase() === word) {
      gameState.score++;
      addLine('   ✅ Correct! It was <strong>' + word + '</strong>!', 'success');
    } else {
      addLine('   ❌ Nope! The word was <strong>' + word + '</strong>.', 'error');
    }
    gameState.current++;
    addLine('');

    if (gameState.current >= gameState.total) {
      const pct = Math.round((gameState.score / gameState.total) * 100);
      addLine('   🏁 <strong>Scramble Complete!</strong>', 'accent');
      addLine('   Score: ' + gameState.score + '/' + gameState.total + ' (' + pct + '%)', pct >= 80 ? 'success' : 'warning');
      if (gameState.score === gameState.total) { addLine('   🏆 Perfect! Unscramble master!', 'success'); triggerConfetti(); }
      addLine('');
      gameMode = null;
      gameState = {};
    } else {
      showScrambleWord();
    }
  }

  // ===== TIC TAC TOE LOGIC =====
  function showTTTGuide() {
    addLine('   <span style="color:#565f89">Grid positions:</span>', '');
    addLine('   <span style="color:#565f89"> 1 │ 2 │ 3 </span>', '');
    addLine('   <span style="color:#565f89">───┼───┼───</span>', '');
    addLine('   <span style="color:#565f89"> 4 │ 5 │ 6 </span>', '');
    addLine('   <span style="color:#565f89">───┼───┼───</span>', '');
    addLine('   <span style="color:#565f89"> 7 │ 8 │ 9 </span>', '');
    addLine('');
  }

  function showTTTBoard() {
    const b = gameState.board;
    const cell = (v) => {
      if (v === 'X') return '<span style="color:#7aa2f7">X</span>';
      if (v === 'O') return '<span style="color:#f7768e">O</span>';
      return ' ';
    };
    addLine('   ' + cell(b[0]) + ' │ ' + cell(b[1]) + ' │ ' + cell(b[2]), '');
    addLine('   ───┼───┼───', '');
    addLine('   ' + cell(b[3]) + ' │ ' + cell(b[4]) + ' │ ' + cell(b[5]), '');
    addLine('   ───┼───┼───', '');
    addLine('   ' + cell(b[6]) + ' │ ' + cell(b[7]) + ' │ ' + cell(b[8]), '');
    addLine('');
  }

  function checkTTTWinner(board) {
    const wins = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6],         // diagonals
    ];
    for (const [a,b,c] of wins) {
      if (board[a] !== ' ' && board[a] === board[b] && board[b] === board[c]) return board[a];
    }
    return board.includes(' ') ? null : 'draw';
  }

  function cpuTTTMove() {
    const b = gameState.board;
    const cpu = gameState.cpu;
    const player = gameState.player;

    // Try to win
    for (let i = 0; i < 9; i++) {
      if (b[i] === ' ') { b[i] = cpu; if (checkTTTWinner(b) === cpu) return i; b[i] = ' '; }
    }
    // Block player
    for (let i = 0; i < 9; i++) {
      if (b[i] === ' ') { b[i] = player; if (checkTTTWinner(b) === player) { b[i] = ' '; return i; } b[i] = ' '; }
    }
    // Take center
    if (b[4] === ' ') return 4;
    // Take a corner
    const corners = [0,2,6,8].filter(i => b[i] === ' ');
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
    // Take any empty
    const empty = b.map((v,i) => v === ' ' ? i : -1).filter(i => i !== -1);
    return empty[Math.floor(Math.random() * empty.length)];
  }

  function handleTTTInput(val) {
    const pos = parseInt(val, 10);
    if (isNaN(pos) || pos < 1 || pos > 9) {
      addLine('   Type a number 1–9.', 'warning');
      return;
    }
    const idx = pos - 1;
    if (gameState.board[idx] !== ' ') {
      addLine('   That spot is taken! Pick another.', 'warning');
      return;
    }

    // Player move
    gameState.board[idx] = gameState.player;
    let result = checkTTTWinner(gameState.board);

    if (result) {
      showTTTBoard();
      if (result === 'draw') {
        addLine('   🤝 It\'s a draw!', 'warning');
      } else {
        addLine('   🎉 <strong>You win!</strong>', 'success');
        triggerConfetti();
      }
      addLine('');
      gameMode = null;
      gameState = {};
      return;
    }

    // CPU move
    const cpuIdx = cpuTTTMove();
    gameState.board[cpuIdx] = gameState.cpu;
    result = checkTTTWinner(gameState.board);

    showTTTBoard();

    if (result) {
      if (result === 'draw') {
        addLine('   🤝 It\'s a draw!', 'warning');
      } else {
        addLine('   🤖 CPU wins! Better luck next time.', 'error');
      }
      addLine('');
      gameMode = null;
      gameState = {};
    }
  }

  // ===== EMOJI DECODER LOGIC =====
  function showEmojiPuzzle() {
    const puzzle = gameState.puzzles[gameState.current];
    addLine('   Round ' + (gameState.current + 1) + '/' + gameState.total, 'dim');
    addLine('   <span style="font-size:1.5em">' + puzzle.emojis + '</span>', '');
    addLine('   💡 Hint: ' + puzzle.hint, 'dim');
    addLine('');
  }

  function handleEmojiInput(answer) {
    const puzzle = gameState.puzzles[gameState.current];
    if (answer.toLowerCase() === puzzle.answer) {
      gameState.score++;
      addLine('   ✅ Correct! It\'s <strong>' + puzzle.answer.toUpperCase() + '</strong>!', 'success');
    } else {
      addLine('   ❌ Nope! It was <strong>' + puzzle.answer.toUpperCase() + '</strong>.', 'error');
    }
    gameState.current++;
    addLine('');

    if (gameState.current >= gameState.total) {
      const pct = Math.round((gameState.score / gameState.total) * 100);
      addLine('   🏁 <strong>Emoji Decoder Complete!</strong>', 'accent');
      addLine('   Score: ' + gameState.score + '/' + gameState.total + ' (' + pct + '%)', pct >= 80 ? 'success' : 'warning');
      if (gameState.score === gameState.total) { addLine('   🏆 Perfect decode! Emoji genius!', 'success'); triggerConfetti(); }
      addLine('');
      gameMode = null;
      gameState = {};
    } else {
      showEmojiPuzzle();
    }
  }

  // ===== MATH BLITZ LOGIC =====
  function generateMathQuestion() {
    if (Date.now() >= gameState.endTime) {
      addLine('   ⏰ <strong>Time\'s up!</strong>', 'accent');
      addLine('   You solved <strong>' + gameState.score + '</strong> questions in 30 seconds!', gameState.score >= 10 ? 'success' : 'warning');
      if (gameState.score >= 15) { addLine('   🏆 Math genius!', 'success'); triggerConfetti(); }
      else if (gameState.score >= 10) addLine('   🌟 Impressive speed!', 'success');
      else if (gameState.score >= 5) addLine('   💪 Not bad!', 'warning');
      else addLine('   📖 Keep practicing!', 'dim');
      addLine('');
      gameMode = null;
      gameState = {};
      return;
    }

    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, answer;

    if (op === '+') {
      a = Math.floor(Math.random() * 50) + 1;
      b = Math.floor(Math.random() * 50) + 1;
      answer = a + b;
    } else if (op === '-') {
      a = Math.floor(Math.random() * 50) + 10;
      b = Math.floor(Math.random() * a);
      answer = a - b;
    } else {
      a = Math.floor(Math.random() * 12) + 1;
      b = Math.floor(Math.random() * 12) + 1;
      answer = a * b;
    }

    gameState.currentAnswer = answer;
    const remaining = Math.max(0, Math.ceil((gameState.endTime - Date.now()) / 1000));
    addLine('   <span style="color:#565f89">[' + remaining + 's left | Score: ' + gameState.score + ']</span>  ' + a + ' ' + op + ' ' + b + ' = ?', '');
  }

  function handleMathBlitzInput(answer) {
    if (Date.now() >= gameState.endTime) {
      generateMathQuestion(); // will show time's up
      return;
    }

    const num = parseInt(answer, 10);
    if (isNaN(num)) {
      addLine('   Type a number.', 'warning');
      return;
    }

    if (num === gameState.currentAnswer) {
      gameState.score++;
      addLine('   ✅ Correct!', 'success');
    } else {
      addLine('   ❌ It was ' + gameState.currentAnswer, 'error');
    }
    generateMathQuestion();
  }

  // ===== MATRIX RAIN =====
  function startMatrixRain(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const fontSize = 15;
    const columns = Math.floor(canvas.width / fontSize);

    // Characters — mix of katakana, latin, digits, and symbols for cyberpunk feel
    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|=+*~@#$%&';

    // Color palette matching the portfolio theme
    const colors = [
      { r: 108, g: 99,  b: 255 }, // #6c63ff — accent purple
      { r: 72,  g: 191, b: 227 }, // #48bfe3 — cyan
      { r: 158, g: 206, b: 106 }, // #9ece6a — green
      { r: 122, g: 162, b: 247 }, // #7aa2f7 — soft blue
      { r: 224, g: 175, b: 104 }, // #e0af68 — gold
      { r: 247, g: 118, b: 142 }, // #f7768e — pink
    ];

    // Each column has its own speed, color, and trail length
    const streams = [];
    for (let i = 0; i < columns; i++) {
      streams.push({
        y: Math.random() * -100,                           // stagger start positions
        speed: 0.3 + Math.random() * 0.8,                  // variable fall speed
        color: colors[Math.floor(Math.random() * colors.length)],
        trailLen: 15 + Math.floor(Math.random() * 20),     // how quickly chars fade
        switchTimer: 0,
      });
    }

    if (matrixInterval) clearInterval(matrixInterval);

    // Resize handler
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    canvas._matrixResize = onResize;

    matrixInterval = setInterval(() => {
      // Fade trail — semi-transparent dark overlay with slight tint
      ctx.fillStyle = 'rgba(10, 10, 15, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = 'bold ' + fontSize + 'px monospace';

      for (let i = 0; i < streams.length; i++) {
        const s = streams[i];
        const x = i * fontSize;
        const y = Math.floor(s.y) * fontSize;
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Occasionally switch column color for shimmer effect
        s.switchTimer++;
        if (s.switchTimer > 200 + Math.random() * 300) {
          s.color = colors[Math.floor(Math.random() * colors.length)];
          s.switchTimer = 0;
        }

        const c = s.color;

        // Leading character — bright white glow (comet head)
        ctx.shadowColor = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ', 0.9)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fillText(char, x, y);

        // Second character — bright colored
        if (y - fontSize > 0) {
          const char2 = chars[Math.floor(Math.random() * chars.length)];
          ctx.shadowBlur = 8;
          ctx.fillStyle = 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
          ctx.fillText(char2, x, y - fontSize);
        }

        // Third character — slightly dimmer
        if (y - fontSize * 2 > 0) {
          ctx.shadowBlur = 4;
          ctx.fillStyle = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ', 0.7)';
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize * 2);
        }

        // Reset shadow for performance on remaining chars
        ctx.shadowBlur = 0;

        // Advance column
        s.y += s.speed;

        // Reset when off-screen (with random delay for organic staggering)
        if (s.y * fontSize > canvas.height + 100) {
          s.y = Math.random() * -30;
          s.speed = 0.3 + Math.random() * 0.8;
          s.trailLen = 15 + Math.floor(Math.random() * 20);
        }
      }
    }, 33); // ~30fps for smoother animation
  }

  // ===== ALL COMMAND NAMES (for autocomplete) =====
  const allCommandNames = [
    // Portfolio commands (documented in help)
    'help', 'about', 'skills', 'experience', 'education', 'contact', 'social', 'resume',
    'quiz', 'guess', 'rps', 'hangman', 'typingtest', 'scramble', 'tictactoe', 'emoji',
    'coin', 'roll', 'mathblitz', 'flip_coin', 'dice',
    'matrix', 'party', 'flip',
    'barrel roll', 'do a barrel roll', 'gravity', 'askew', 'tilt', 'thanos', 'snap', 'blink', 'recursion', 'comic sans',
    'neofetch', 'fortune', '8ball', 'ascii', 'ping',
    'joke', 'coffee', 'theme',
    // Standard terminal commands (undocumented — devs know these)
    'clear', 'cls', 'reset', 'exit', 'quit', 'logout',
    'echo', 'history', 'whoami', 'date', 'uptime', 'hostname', 'uname', 'uname -a', 'id',
    'ls', 'cat', 'pwd', 'cd', 'man', 'which', 'top', 'htop', 'ps', 'ps aux', 'env', 'printenv',
    'touch', 'mkdir', 'rm', 'mv', 'cp', 'chmod', 'chown', 'grep', 'find',
    'curl', 'wget', 'ssh', 'ifconfig', 'ip addr', 'df', 'df -h', 'free',
    'vim', 'nano', 'emacs', 'open',
    'git status', 'git log', 'git pull', 'git push', 'git diff',
    'docker', 'docker ps', 'npm', 'yarn', 'pip', 'python', 'python3', 'node', 'java',
    'mvn clean install',
    'sudo hire vishal', 'sudo', 'rm -rf /',
    'hello', 'hi', 'hey',
    'cat resume.pdf', 'cat about.txt',
  ];

  // ===== INPUT HANDLER =====
  input.addEventListener('keydown', (e) => {
    // Cmd+K (Mac) or Ctrl+L (Linux/Win) to clear terminal
    if ((e.key === 'k' && e.metaKey) || (e.key === 'l' && e.ctrlKey)) {
      e.preventDefault();
      output.innerHTML = '';
      return;
    }

    // Ctrl+C — cancel current game / clear input
    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      if (gameMode) {
        addLine('^C');
        addLine('   Game cancelled.', 'warning');
        addLine('');
        gameMode = null;
        gameState = {};
      } else if (input.value) {
        addCommand(input.value + '^C');
        input.value = '';
      }
      return;
    }

    // Ctrl+U — clear current input line
    if (e.key === 'u' && e.ctrlKey) {
      e.preventDefault();
      input.value = '';
      return;
    }

    // Arrow Up / Down for history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      if (historyIndex < history.length - 1) historyIndex++;
      input.value = history[history.length - 1 - historyIndex];
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[history.length - 1 - historyIndex];
      } else {
        historyIndex = -1;
        input.value = '';
      }
      return;
    }

    // Tab for autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.value.trim().toLowerCase();
      if (!partial) return;
      const matches = allCommandNames.filter(c => c.startsWith(partial));
      if (matches.length === 1) {
        input.value = matches[0];
      } else if (matches.length > 1) {
        addLine('');
        addLine('   ' + matches.map(m => '<span class="cmd-highlight">' + m + '</span>').join('  '), 'dim');
        addLine('');
      }
      return;
    }

    if (e.key === 'Enter') {
      const raw = input.value.trim();
      const cmd = raw.toLowerCase();
      input.value = '';
      if (!cmd) {
        addLine('<span class="terminal-prompt" style="color:#9ece6a">visitor@portfolio:~$</span>');
        return;
      }

      // Push to history
      history.push(raw);
      historyIndex = -1;

      addCommand(cmd);

      // If in a game, handle game input first
      if (gameMode) {
        if (cmd === 'quit' || cmd === 'exit' || cmd === 'exit game' || cmd === 'q') {
          addLine('   \u{1F6D1} Game ended.', 'warning');
          addLine('');
          gameMode = null;
          gameState = {};
          updateActivePill();
          return;
        }
        const handlers = {
          quiz: () => handleQuizAnswer(cmd),
          guess: () => handleGuessInput(cmd),
          rps: () => handleRpsInput(cmd),
          hangman: () => handleHangmanInput(cmd),
          typingtest: () => handleTypingTestInput(raw),
          scramble: () => handleScrambleInput(cmd),
          tictactoe: () => handleTTTInput(cmd),
          emoji: () => handleEmojiInput(cmd),
          mathblitz: () => handleMathBlitzInput(cmd),
        };
        if (handlers[gameMode]) { handlers[gameMode](); updateActivePill(); return; }
      }

      // 8ball special handling (takes argument)
      if (cmd.startsWith('8ball')) {
        handle8Ball(raw.substring(5).trim());
        return;
      }

      // echo — print whatever follows
      if (cmd.startsWith('echo ')) {
        addLine('');
        addLine('   ' + raw.substring(5), 'success');
        addLine('');
        return;
      }
      if (cmd === 'echo') { addLine(''); return; }

      // which <command> — check if command exists
      if (cmd.startsWith('which ')) {
        const target = cmd.substring(6).trim();
        if (commands[target]) {
          addLine('');
          addLine('   /usr/local/bin/' + target, 'success');
          addLine('');
        } else {
          addLine('');
          addLine('   ' + target + ' not found', 'error');
          addLine('');
        }
        return;
      }

      // man <command> — manual page
      if (cmd.startsWith('man ')) {
        const target = cmd.substring(4).trim();
        if (commands[target]) {
          addLine('');
          addLine('   No manual for <span class="cmd-highlight">' + target + '</span> \u2014 just type it and see what happens!', 'dim');
          addLine('');
        } else {
          addLine('');
          addLine('   No manual entry for ' + target, 'error');
          addLine('');
        }
        return;
      }

      if (commands[cmd]) {
        commands[cmd]();
        updateActivePill();
      } else {
        addLine('');
        addLine(`   Command not found: <span class="cmd-highlight">${cmd}</span>`, 'error');
        addLine('   Type <span class="cmd-highlight">help</span> for available commands.', 'dim');
        addLine('');
      }
    }
  });
})();

// ===== Terminal Discovery Toast =====
(function initTerminalToast() {
  const toast = document.getElementById('terminalToast');
  const openBtn = document.getElementById('toastOpenTerminal');
  const dismissBtn = document.getElementById('toastDismiss');
  const toggle = document.getElementById('terminalToggle');
  const overlay = document.getElementById('terminalOverlay');

  if (!toast) return;

  // Toggle button is always visible
  if (toggle) toggle.style.display = 'flex';

  let autoDismissTimer;

  // Show toast on every page visit after 3 seconds
  setTimeout(() => {
    toast.classList.add('visible');
    // Auto-dismiss after 10 seconds
    autoDismissTimer = setTimeout(() => {
      if (toast.classList.contains('visible')) dismissToast();
    }, 10000);
  }, 3000);

  function dismissToast() {
    if (autoDismissTimer) clearTimeout(autoDismissTimer);
    toast.classList.remove('visible');
    toast.classList.add('hidden');
  }

  openBtn.addEventListener('click', () => {
    dismissToast();
    setTimeout(() => {
      overlay.classList.add('open');
      const input = document.getElementById('terminalInput');
      if (input) setTimeout(() => input.focus(), 300);
    }, 400);
  });

  dismissBtn.addEventListener('click', dismissToast);
})();

// ===== Terminal Welcome Animation =====
(function initTerminalWelcome() {
  const output = document.getElementById('terminalOutput');
  const overlay = document.getElementById('terminalOverlay');
  const termInput = document.getElementById('terminalInput');
  if (!output || !overlay) return;

  let welcomed = false;

  // Allow closeTerminal to reset the welcome flag
  window._terminalResetWelcome = () => { welcomed = false; };

  // Watch for terminal opening
  const observer = new MutationObserver(() => {
    if (overlay.classList.contains('open') && !welcomed) {
      welcomed = true;
      playWelcome();
    }
  });
  observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });

  // Helper: execute a command by simulating input
  function execCommand(cmd) {
    if (termInput) {
      termInput.value = cmd;
      termInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    }
  }

  // Helper: create a clickable pill
  function makePill(emoji, label, cmd) {
    const btn = document.createElement('button');
    btn.className = 'welcome-pill';
    btn.dataset.cmd = cmd;
    btn.innerHTML = '<span class="welcome-pill-emoji">' + emoji + '</span>' + label;
    btn.addEventListener('click', () => {
      if (btn.classList.contains('pill-active')) {
        // Toggle commands (matrix/party) stop by re-sending the same command; games use quit
        execCommand(cmd === 'matrix' || cmd === 'party' ? cmd : 'quit');
      } else {
        execCommand(cmd);
      }
    });
    return btn;
  }

  // Helper: add animated line
  function addWelcomeLine(text, cls, delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        const p = document.createElement('p');
        p.className = 'terminal-line' + (cls ? ' ' + cls : '');
        p.innerHTML = text;
        p.style.opacity = '0';
        p.style.transform = 'translateY(4px)';
        p.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        output.appendChild(p);
        requestAnimationFrame(() => {
          p.style.opacity = '1';
          p.style.transform = 'translateY(0)';
        });
        output.scrollTop = output.scrollHeight;
        resolve();
      }, delay);
    });
  }

  // Helper: add a pill row with animation
  function addPillRow(pills, delay) {
    setTimeout(() => {
      const row = document.createElement('div');
      row.className = 'welcome-pills';
      row.style.opacity = '0';
      row.style.transform = 'translateY(4px)';
      row.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      pills.forEach(p => row.appendChild(p));
      output.appendChild(row);
      requestAnimationFrame(() => {
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
      });
      output.scrollTop = output.scrollHeight;
    }, delay);
  }

  // Helper: add a section label
  function addSectionLabel(text, delay) {
    setTimeout(() => {
      const lbl = document.createElement('p');
      lbl.className = 'welcome-section-label';
      lbl.textContent = text;
      lbl.style.opacity = '0';
      lbl.style.transition = 'opacity 0.2s ease';
      output.appendChild(lbl);
      requestAnimationFrame(() => { lbl.style.opacity = '1'; });
      output.scrollTop = output.scrollHeight;
    }, delay);
  }

  function playWelcome() {
    output.innerHTML = '';

    // ASCII art lines
    const asciiLines = [
      { text: '', delay: 0 },
      { text: '<span style="color:#6c63ff">  __     ___     _           _</span>', delay: 60 },
      { text: '<span style="color:#6c63ff">  \\ \\   / (_)___| |__   __ _| |</span>', delay: 120 },
      { text: '<span style="color:#48bfe3">   \\ \\ / /| / __| \'_ \\ / _` | |</span>', delay: 180 },
      { text: '<span style="color:#48bfe3">    \\ V / | \\__ \\ | | | (_| | |</span>', delay: 240 },
      { text: '<span style="color:#9ece6a">     \\_/  |_|___/_| |_|\\__,_|_|</span>', delay: 300 },
      { text: '', delay: 360 },
    ];

    asciiLines.forEach(l => addWelcomeLine(l.text, '', l.delay));

    // Tagline
    addWelcomeLine('  <span style="color:#f7768e">SDE II</span> @ <span style="color:#7aa2f7">Tekion Corp</span>  \u2502  <span style="color:#e0af68">AI Enthusiast</span>  \u2502  <span style="color:#9ece6a">System Builder</span>', '', 450);
    addWelcomeLine('', '', 500);
    addWelcomeLine('  <span style="color:#565f89">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>', '', 550);
    addWelcomeLine('', '', 600);

    // Friendly greeting
    addWelcomeLine('  \u{1F44B} Hey there! Welcome to my interactive terminal.', 'accent', 700);
    addWelcomeLine('     Click any button below or type a command \u2014 it\'s all yours.', 'dim', 800);
    addWelcomeLine('', '', 860);

    // --- Know Me section ---
    addSectionLabel('know me', 950);
    addPillRow([
      makePill('\u{1F464}', 'About Me', 'about'),
      makePill('\u{1F6E0}\uFE0F', 'Skills', 'skills'),
      makePill('\u{1F4BC}', 'Experience', 'experience'),
      makePill('\u{1F393}', 'Education', 'education'),
      makePill('\u{1F4EC}', 'Contact', 'contact'),
      makePill('\u{1F4C4}', 'Resume', 'resume'),
    ], 1000);

    addWelcomeLine('', '', 1080);

    // --- Play section ---
    addSectionLabel('play', 1120);
    addPillRow([
      makePill('\u{1F9E0}', 'Tech Quiz', 'quiz'),
      makePill('\u{1F522}', 'Guess Number', 'guess'),
      makePill('\u270A', 'Rock Paper Scissors', 'rps'),
      makePill('\u{1F3AD}', 'Hangman', 'hangman'),
      makePill('\u{2328}\uFE0F', 'Typing Test', 'typingtest'),
    ], 1170);
    addPillRow([
      makePill('\u{1F500}', 'Scramble', 'scramble'),
      makePill('\u{274E}', 'Tic Tac Toe', 'tictactoe'),
      makePill('\u{1F9E9}', 'Emoji Decoder', 'emoji'),
      makePill('\u{1FA99}', 'Coin Flip', 'coin'),
      makePill('\u{1F3B2}', 'Roll Dice', 'roll'),
      makePill('\u{1F9EE}', 'Math Blitz', 'mathblitz'),
    ], 1230);

    addWelcomeLine('', '', 1310);

    // --- Fun section ---
    addSectionLabel('fun stuff', 1350);
    addPillRow([
      makePill('\u{1F7E2}', 'Matrix Rain', 'matrix'),
      makePill('\u{1F389}', 'Party Mode', 'party'),
      makePill('\u{1F52E}', 'Fortune', 'fortune'),
      makePill('\u{1F602}', 'Dev Joke', 'joke'),
      makePill('\u2615', 'Coffee', 'coffee'),
      makePill('\u{1F504}', 'Flip Page', 'flip'),
    ], 1400);

    addWelcomeLine('', '', 1490);

    // --- Easter eggs section ---
    addSectionLabel('easter eggs', 1530);
    addPillRow([
      makePill('\u{1F300}', 'Barrel Roll', 'barrel roll'),
      makePill('\u{1F30D}', 'Gravity', 'gravity'),
      makePill('\u{1F4D0}', 'Askew', 'askew'),
      makePill('\u{1F91C}', 'Thanos', 'thanos'),
      makePill('\u{1F440}', 'Blink', 'blink'),
      makePill('\u{1F500}', 'Recursion', 'recursion'),
      makePill('\u{1F921}', 'Comic Sans', 'comic sans'),
    ], 1580);

    addWelcomeLine('', '', 1660);

    // Footer hints
    addWelcomeLine('  \u{1F510} <span style="color:#565f89">Secret:</span> <span class="cmd-highlight">sudo hire vishal</span> <span style="color:#565f89">\u2014 you know you want to</span>', '', 1720);
    addWelcomeLine('  \u{2328}\uFE0F  <span style="color:#565f89">Type</span> <span class="cmd-highlight">help</span> <span style="color:#565f89">for 50+ commands  \u2502  \u2191\u2193 history  \u2502  Tab autocomplete</span>', 'dim', 1800);
    addWelcomeLine('', '', 1860);
  }
})();

// ===== Konami Code Easter Egg =====
(function initKonami() {
  const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let index = 0;
  let lastKeyTime = 0;

  document.addEventListener('keydown', (e) => {
    // Ignore if typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const now = Date.now();
    // Reset if too slow (more than 3 seconds between keys)
    if (now - lastKeyTime > 3000) index = 0;
    lastKeyTime = now;

    const key = e.key.toLowerCase();
    const expected = code[index].toLowerCase();

    if (key === expected) {
      index++;
      if (index === code.length) {
        index = 0;
        triggerConfetti();
      }
    } else {
      index = 0;
    }
  });
})();

// ===== Confetti Explosion =====
function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#6c63ff', '#48bfe3', '#ff6b6b', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#01a3a4', '#9ece6a', '#f7768e'];
  const confetti = [];
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  // Burst from center of screen in all directions
  for (let i = 0; i < 250; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 4;
    confetti.push({
      x: cx + (Math.random() - 0.5) * 100,
      y: cy + (Math.random() - 0.5) * 100,
      w: Math.random() * 12 + 4,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15,
      opacity: 1,
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    confetti.forEach(c => {
      c.x += c.vx;
      c.y += c.vy;
      c.vy += 0.12; // gravity
      c.vx *= 0.99; // air resistance
      c.rotation += c.rotationSpeed;
      if (frame > 80) c.opacity -= 0.02;

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate((c.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(c.opacity, 0);
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
      ctx.restore();
    });

    if (frame < 200 && confetti.some(c => c.opacity > 0)) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

// ===== Contact Form — validation UX only (submit handled inline in HTML) =====
(function initContactFormUX() {
  var emailInput = document.getElementById('formEmail');
  var emailError = document.getElementById('emailError');
  var messageInput = document.getElementById('formMessage');
  var charCount = document.getElementById('charCount');
  var nameInput = document.getElementById('formName');
  var MAX_CHARS = 500;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Real-time email validation
  if (emailInput) emailInput.addEventListener('input', function() {
    var val = emailInput.value.trim();
    if (val === '') {
      emailInput.classList.remove('valid', 'invalid');
      if (emailError) { emailError.textContent = ''; emailError.classList.remove('visible'); }
    } else if (emailRegex.test(val)) {
      emailInput.classList.add('valid');
      emailInput.classList.remove('invalid');
      if (emailError) { emailError.textContent = ''; emailError.classList.remove('visible'); }
    } else {
      emailInput.classList.add('invalid');
      emailInput.classList.remove('valid');
      if (emailError) { emailError.textContent = 'Please enter a valid email'; emailError.classList.add('visible'); }
    }
  });

  // Character count for message
  if (messageInput) messageInput.addEventListener('input', function() {
    var len = messageInput.value.length;
    if (charCount) {
      charCount.textContent = len + ' / ' + MAX_CHARS;
      charCount.classList.toggle('warn', len > MAX_CHARS * 0.8 && len <= MAX_CHARS);
      charCount.classList.toggle('limit', len > MAX_CHARS);
    }
    if (len > MAX_CHARS) {
      messageInput.value = messageInput.value.slice(0, MAX_CHARS);
      if (charCount) charCount.textContent = MAX_CHARS + ' / ' + MAX_CHARS;
    }
  });

  // Name field validation on blur
  if (nameInput) {
    nameInput.addEventListener('blur', function() {
      if (nameInput.value.trim().length > 0) {
        nameInput.classList.add('valid');
        nameInput.classList.remove('invalid');
      }
    });
    nameInput.addEventListener('input', function() {
      if (nameInput.value.trim() === '') {
        nameInput.classList.remove('valid', 'invalid');
      }
    });
  }
})();
