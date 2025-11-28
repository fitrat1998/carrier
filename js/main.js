// Basic interactivity: mobile nav toggle, partner carousel, staff modal, contact form stub

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');

  navToggle && navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if (!expanded) {
      primaryNav.setAttribute('aria-hidden', 'false');
    } else {
      primaryNav.setAttribute('aria-hidden', 'true');
    }
  });

  // Employees modal (populate with mock data)
  const employees = {
    1: {name: "Jamshid Ismi", role: "Bosh menejer", bio: "Jamshid kompaniyani boshqaradi. Loyihalar, strategiya va rahbarlik."},
    2: {name: "Nigina Ismi", role: "HR bo'lim", bio: "Xodimlarni yollash, o'qitish va balans."},
    3: {name: "Ulug'bek Ismi", role: "IT muhendis", bio: "Texnik yechimlar va arxitektura ustida ishlaydi."}
  };

  const modal = document.getElementById('employee-modal');
  const modalContent = document.getElementById('employee-details');
  const modalClose = document.querySelector('.modal-close');

  document.querySelectorAll('[data-employee]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-employee');
      const emp = employees[id];
      modalContent.innerHTML = `<h3>${emp.name}</h3><p style="color:#4b5563">${emp.role}</p><p>${emp.bio}</p>`;
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  modalClose.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
  });

  // Simple partners carousel (basic translate)
  const track = document.querySelector('.carousel-track');
  const prev = document.querySelector('.carousel-prev');
  const next = document.querySelector('.carousel-next');
  if (track) {
    let idx = 0;
    const items = Array.from(track.children);
    const show = () => {
      const w = items[0].getBoundingClientRect().width + parseInt(getComputedStyle(track).gap || 16);
      track.style.transform = `translateX(${-idx * w}px)`;
    };
    window.addEventListener('resize', show);
    prev && prev.addEventListener('click', () => {
      idx = Math.max(0, idx - 1);
      show();
    });
    next && next.addEventListener('click', () => {
      idx = Math.min(items.length - 1, idx + 1);
      show();
    });

    // auto scroll
    const auto = document.querySelector('.partners-carousel')?.dataset.auto === 'true';
    if (auto) {
      setInterval(() => {
        idx = (idx + 1) % items.length;
        show();
      }, 3000);
    }
    // initial
    setTimeout(show, 100);
  }

  // Contact form: basic validation and mock submit
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      if (!data.get('name') || !data.get('email') || !data.get('message')) {
        alert('Iltimos, kerakli maydonlarni to\'ldiring.');
        return;
      }
      // In real usage, POST to your backend endpoint here.
      alert('Xabaringiz yuborildi. Tez orada bog\'lanamiz.');
      form.reset();
    });
  }
});