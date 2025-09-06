// Smooth scrolling and active link highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...document.querySelectorAll('section.section')];

function setActiveLink() {
  const pos = window.scrollY + 120;
  let currentId = 'home';
  for (const sec of sections) {
    if (pos >= sec.offsetTop) currentId = sec.id;
  }
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + currentId));
}
window.addEventListener('scroll', setActiveLink);
setActiveLink();

// Mobile nav
const burger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => nav.classList.toggle('open'));
navLinks.forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form validation
const form = document.getElementById('contact-form');
const fields = ['name','email','subject','message'];

function showError(id, msg=''){
  const span = document.querySelector(`.error[data-for="${id}"]`);
  if (span) span.textContent = msg;
}

function validateEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

form.addEventListener('submit', (e) => {
  let ok = true;
  const data = {};
  for (const id of fields){
    const el = document.getElementById(id);
    const val = el.value.trim();
    data[id] = val;
    if (!val){ showError(id, 'Required'); ok = false; } else showError(id);
  }
  if (ok && !validateEmail(data.email)){ showError('email','Invalid email'); ok = false; }
  const status = document.getElementById('form-status');
  if (!ok){ 
    status.textContent = 'Please correct the highlighted fields.';
    e.preventDefault(); // stop submit only if invalid
  } else {
    status.textContent = 'Sending message...';
  }
});

// Project modals
document.querySelectorAll('.project').forEach(card => {
  const id = card.getAttribute('data-modal');
  card.addEventListener('click', () => {
    document.getElementById(id).style.display = 'flex';
  });
});
document.querySelectorAll('.modal .close').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-close');
    document.getElementById(id).style.display = 'none';
  });
});
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', (e) => {
    if (e.target === m) m.style.display = 'none';
  });
});
