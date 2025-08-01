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

function highlightActiveNav() {
  const navLinks = document.querySelectorAll(".nav-link");
  const currentPage = location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

  window.addEventListener('scroll', function () {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });