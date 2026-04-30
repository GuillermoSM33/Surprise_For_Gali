// ── Active nav link ──
(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });
})();

// ── Scroll-reveal (IntersectionObserver) ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.tl-item, .card, .gallery-item')
  .forEach(el => revealObserver.observe(el));

// ── Petals (portada) ──
function spawnPetals() {
  const container = document.querySelector('.hero');
  if (!container) return;
  const symbols = ['✿', '❀', '✾', '⁕'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      font-size: ${0.6 + Math.random() * 0.8}rem;
      color: hsl(${350 + Math.random() * 20}, 60%, ${75 + Math.random() * 15}%);
      animation-duration: ${6 + Math.random() * 8}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
}
spawnPetals();

// ── Lightbox (galería) ──
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lbImg = lightbox.querySelector('img');

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lightbox.classList.add('open');
    });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
    lightbox.classList.remove('open');
    lbImg.src = '';
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
      lbImg.src = '';
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('open');
      lbImg.src = '';
    }
  });
}

// ── Confetti (mensaje) ──
function launchConfetti() {
  const colors = ['#C8A4A5', '#C9A96E', '#EAE0D8', '#A67F80', '#FFF'];
  for (let i = 0; i < 80; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: ${4 + Math.random() * 6}px;
      height: ${4 + Math.random() * 6}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      left: ${Math.random() * 100}vw;
      top: -10px;
      pointer-events: none;
      z-index: 999;
      animation: fall ${2 + Math.random() * 3}s ${Math.random() * 1}s linear forwards;
    `;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 5000);
  }
}

const confettiBtn = document.getElementById('confettiBtn');
if (confettiBtn) {
  confettiBtn.addEventListener('click', launchConfetti);
}
