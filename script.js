// Rotasi miring tiap elemen (data-tilt)
document.querySelectorAll('[data-tilt]').forEach(el => el.style.setProperty('--r', el.dataset.tilt + 'deg'));

// Huruf potongan kertas (ransom note) seperti poster referensi
const paper = [
  ['#f0508a', '#ffd1e1'], ['#e8a600', '#fff0b8'], ['#2fa898', '#d4f4ee'],
  ['#8a63e0', '#e4d9fb'], ['#2f9fd8', '#cfeefb'], ['#e87a3c', '#ffe0cc'], ['#7cae2a', '#e2f5c4']
];
const rnd = (a, b) => Math.random() * (b - a) + a;
const pick = a => a[Math.floor(Math.random() * a.length)];
document.querySelectorAll('.ransom').forEach(el => {
  const text = el.dataset.text;
  el.setAttribute('aria-label', text);
  el.textContent = '';
  text.split(' ').forEach(word => {
    const w = document.createElement('span');
    w.className = 'w'; w.setAttribute('aria-hidden', 'true');
    [...word].forEach(ch => {
      const [ink, bg] = pick(paper), bd = pick(paper)[0];
      const l = document.createElement('span');
      l.className = 'l'; l.textContent = ch;
      const j = () => rnd(0, 7).toFixed(1) + '%';
      l.style.cssText = `--ink:${ink};--bg:${bg};--bd:${bd};--r:${rnd(-9, 9).toFixed(1)}deg;--y:${rnd(-.12, .12).toFixed(2)}em;` +
        `font-size:${rnd(.9, 1.12).toFixed(2)}em;` +
        (Math.random() > .75 ? "font-family:'Fraunces',serif;font-weight:900;" : '') +
        `clip-path:polygon(${j()} ${j()},100% ${j()},calc(100% - ${j()}) 100%,${j()} calc(100% - ${j()}))`;
      w.appendChild(l);
    });
    el.appendChild(w);
  });
});

// Bunting (bendera segitiga) bergantian warna
document.querySelectorAll('.bunting').forEach(b => {
  const cols = ['#fff6e4', '#f58fb3', '#fff6e4', '#e0457b'];
  for (let i = 0; i < 40; i++) {
    const t = document.createElement('i');
    t.style.background = cols[i % cols.length];
    b.appendChild(t);
  }
});

// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open'); toggle.setAttribute('aria-expanded', false);
}));

// Menu aktif saat scroll
const navA = [...links.querySelectorAll('a')];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id], footer[id]').forEach(s => io.observe(s));

// Klik hiasan -> hujan hati
const hearts = ['♥', '✿', '✦', '♡'];
document.querySelectorAll('.d, .chip, .sticker-link, .btn').forEach(el => {
  el.addEventListener('click', e => {
    for (let i = 0; i < 6; i++) {
      const h = document.createElement('span');
      h.className = 'pop'; h.textContent = pick(hearts);
      h.style.left = e.clientX + rnd(-30, 30) + 'px';
      h.style.top = e.clientY + 'px';
      h.style.setProperty('--dx', rnd(-40, 40) + 'px');
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 900);
    }
  });
});

document.getElementById('year').textContent = new Date().getFullYear();