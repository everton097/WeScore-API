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
  }
});

const valueTime01 = document.getElementById("valueTime01");
const plusButtonTime01 = document.getElementById("plusTime01");
const minusButtonTime01 = document.getElementById("minusTime01");
const bola01 = document.getElementById("bolavolei01").style.opacity;

let controlet1, controlet2;
const updateValueTime01 = () => {
  if (countTime01 <= 9) {
    valueTime01.innerHTML = "0" + countTime01;
    updateTime01();
    controlet1 = "ponto";
    controlet2 = "semponto";
  } else if (countTime01 > 9) {
    valueTime01.innerHTML = countTime01;
    updateTime01();
    controlet1 = "ponto";
    controlet2 = "semponto";
  }
};
const updateBola01 = () => {
  document.getElementById("bolavolei01").style.opacity = "1";
  document.getElementById("bolavolei02").style.opacity = "0";
};
const updateBola02 = () => {
  document.getElementById("bolavolei01").style.opacity = "0";
  document.getElementById("bolavolei02").style.opacity = "1";
};

const valueTime02 = document.getElementById("valueTime02");
const plusButtonTime02 = document.getElementById("plusTime02");
const minusButtonTime02 = document.getElementById("minusTime02");
const updateValueTime02 = () => {
  if (countTime02 <= 9) {
    valueTime02.innerHTML = "0" + countTime02;
    updateTime02();
    controlet1 = "semponto";
    controlet2 = "ponto";
  } else if (countTime02 > 9) {
    valueTime02.innerHTML = countTime02;
    updateTime02();
    controlet1 = "semponto";
    controlet2 = "ponto";
  }
};

let countTime01 = 0;
let intervalIDTime01 = 0;
plusButtonTime01.addEventListener("click", () => {
  if (countTime01 >= 0 && countTime01 < 40) {
    intervalIDTime01 = countTime01 += 1;
    updateValueTime01();
    updateBola01();
  }
});
plusButtonTime01.addEventListener("mousedown", () => {
  if (countTime01 >= 0 && countTime01 < 40) {
    intervalIDTime01 = setInterval(() => {
      countTime01 += 1;
      updateValueTime01();
      updateBola01();
      if (countTime01 == 40) {
        clearInterval(intervalIDTime01);
      }
    }, 100);
  }
});
minusButtonTime01.addEventListener("click", () => {
  if (countTime01 > 0 && countTime01 <= 40) {
    intervalIDTime01 = countTime01 -= 1;
    updateValueTime01();
  }
});
minusButtonTime01.addEventListener("mousedown", () => {
  if (countTime01 > 0 && countTime01 <= 40) {
    intervalIDTime01 = setInterval(() => {
      countTime01 -= 1;
      updateValueTime01();
      if (countTime01 == 40 || countTime01 == 0) {
        clearInterval(intervalIDTime01);
      }
    }, 100);
  }
});
document.addEventListener("mouseup", () => clearInterval(intervalIDTime01));

let countTime02 = 0;
let intervalIDTime02 = 0;
plusButtonTime02.addEventListener("click", () => {
  if (countTime02 >= 0 && countTime02 < 40) {
    intervalIDTime02 = countTime02 += 1;
    updateValueTime02();
    updateBola02();
  }
});
plusButtonTime02.addEventListener("mousedown", () => {
  if (countTime02 >= 0 && countTime02 < 40) {
    intervalIDTime02 = setInterval(() => {
      countTime02 += 1;
      updateValueTime02();
      updateBola02();
      if (countTime02 == 40) {
        clearInterval(intervalIDTime02);
      }
    }, 100);
  }
});
minusButtonTime02.addEventListener("click", () => {
  if (countTime02 > 0 && countTime02 <= 40) {
    intervalIDTime02 = countTime02 -= 1;
    updateValueTime02();
  }
});
minusButtonTime02.addEventListener("mousedown", () => {
  if (countTime02 > 0 && countTime02 <= 40) {
    intervalIDTime02 = setInterval(() => {
      countTime02 -= 1;
      updateValueTime02();
      if (countTime02 == 40 || countTime02 == 0) {
        clearInterval(intervalIDTime02);
      }
    }, 100);
  }
});
document.addEventListener("mouseup", () => clearInterval(intervalIDTime02));
