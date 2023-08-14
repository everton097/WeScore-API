hamburger = document.querySelector(".hamburger");
hamburger.onclick = function () {
  navbar = document.querySelector(".nav-bar");
  navbar.classList.toggle("active");
  hamburger = document.querySelector(".hamburger");
  hamburger.classList.toggle("active");
};

const activePage = window.location.pathname;
const navlinks = document.querySelectorAll("nav a").forEach((link) => {
  if (link.href.includes(`${activePage}`)) {
    link.classList.add("acrive");
    console.log(link.href);
  }
});

