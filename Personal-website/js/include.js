document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll('[data-include]');

  includes.forEach(async (el) => {
    const file = el.getAttribute('data-include');
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Gagal memuat ${file}`);
      const content = await res.text();

      // Untuk <head>, gunakan outerHTML, lainnya innerHTML
      if (el.tagName.toLowerCase() === "head") {
        el.outerHTML = content;
      } else {
        el.innerHTML = content;
      }

      // Jika file navbar dimuat, jalankan fungsi highlight aktif nav
      if (file.includes("navbar")) {
        highlightActiveNav();
      }
    } catch (err) {
      console.error(err);
    }
  });
});

function highlightActiveSection() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSectionId = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const offset = 150; // offset atas agar lebih akurat (sesuaikan)
    
    if (rect.top <= offset && rect.bottom >= offset) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (href === `#${currentSectionId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Jalankan saat scroll dan saat load
window.addEventListener("scroll", highlightActiveSection);
window.addEventListener("load", highlightActiveSection);

  window.addEventListener('scroll', function () {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });