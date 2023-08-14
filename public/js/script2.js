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
    }, 200);
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
    }, 200);
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
    }, 200);
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
    }, 200);
  }
});
document.addEventListener("mouseup", () => clearInterval(intervalIDTime02));

var posiocaoLeftT1 = [0,0,9,9,9,0];
var posiocaoTopT1 = [5.5,0,0,5.5,11,11];

let controle0=0, controle1=1, controle2=2,
    controle3=3, controle4=4, controle5=5;

const jogador1 = document.querySelector(".jogador1");
const jogador2 = document.querySelector(".jogador2");
const jogador3 = document.querySelector(".jogador3");
const jogador4 = document.querySelector(".jogador4");
const jogador5 = document.querySelector(".jogador5");
const jogador6 = document.querySelector(".jogador6");

jogador1.style.left = `${posiocaoLeftT1[controle5]}vw`;
jogador1.style.top = `${posiocaoTopT1[controle5]}vw`;
jogador2.style.left = `${posiocaoLeftT1[controle4]}vw`;
jogador2.style.top = `${posiocaoTopT1[controle4]}vw`;
jogador3.style.left = `${posiocaoLeftT1[controle3]}vw`;
jogador3.style.top = `${posiocaoTopT1[controle3]}vw`;
jogador4.style.left = `${posiocaoLeftT1[controle2]}vw`;
jogador4.style.top = `${posiocaoTopT1[controle2]}vw`;
jogador5.style.left = `${posiocaoLeftT1[controle1]}vw`;
jogador5.style.top = `${posiocaoTopT1[controle1]}vw`;
jogador6.style.left = `${posiocaoLeftT1[controle0]}vw`;
jogador6.style.top = `${posiocaoTopT1[controle0]}vw`;

const updateTime01 = () => {  
  if (controlet1 == "semponto") {
    controle0 = (controle0+1)%6;
    controle1 = (controle1+1)%6;
    controle2 = (controle2+1)%6;
    controle3 = (controle3+1)%6;
    controle4 = (controle4+1)%6;
    controle5 = (controle5+1)%6;
  
    jogador1.style.left = `${posiocaoLeftT1[controle5]}vw`;
    jogador1.style.top = `${posiocaoTopT1[controle5]}vw`;
  
    jogador2.style.left = `${posiocaoLeftT1[controle4]}vw`;
    jogador2.style.top = `${posiocaoTopT1[controle4]}vw`;
  
    jogador3.style.left = `${posiocaoLeftT1[controle3]}vw`;
    jogador3.style.top = `${posiocaoTopT1[controle3]}vw`;
  
    jogador4.style.left = `${posiocaoLeftT1[controle2]}vw`;
    jogador4.style.top = `${posiocaoTopT1[controle2]}vw`;
  
    jogador5.style.left = `${posiocaoLeftT1[controle1]}vw`;
    jogador5.style.top = `${posiocaoTopT1[controle1]}vw`;
  
    jogador6.style.left = `${posiocaoLeftT1[controle0]}vw`;
    jogador6.style.top = `${posiocaoTopT1[controle0]}vw`;
  }
};

var posiocaoLeftT2 = [11,  11, 11,  2,   2, 2];
var posiocaoTopT2 =  [ 0, 5.5, 11, 11, 5.5, 0];

let t2controle0=0, t2controle1=1, t2controle2=2,
    t2controle3=3, t2controle4=4, t2controle5=5;

const jogador1t2 = document.querySelector(".jogador1t2");
const jogador2t2 = document.querySelector(".jogador2t2");
const jogador3t2 = document.querySelector(".jogador3t2");
const jogador4t2 = document.querySelector(".jogador4t2");
const jogador5t2 = document.querySelector(".jogador5t2");
const jogador6t2 = document.querySelector(".jogador6t2");

jogador1t2.style.left = `${posiocaoLeftT2[t2controle0]}vw`;
jogador1t2.style.top = `${posiocaoTopT2[t2controle0]}vw`;

jogador2t2.style.left = `${posiocaoLeftT2[t2controle1]}vw`;
jogador2t2.style.top = `${posiocaoTopT2[t2controle1]}vw`;

jogador3t2.style.left = `${posiocaoLeftT2[t2controle2]}vw`;
jogador3t2.style.top = `${posiocaoTopT2[t2controle2]}vw`;

jogador4t2.style.left = `${posiocaoLeftT2[t2controle3]}vw`;
jogador4t2.style.top = `${posiocaoTopT2[t2controle3]}vw`;

jogador5t2.style.left = `${posiocaoLeftT2[t2controle4]}vw`;
jogador5t2.style.top = `${posiocaoTopT2[t2controle4]}vw`;

jogador6t2.style.left = `${posiocaoLeftT2[t2controle5]}vw`;
jogador6t2.style.top = `${posiocaoTopT2[t2controle5]}vw`;

const updateTime02 = () => {
  if (controlet2 == "semponto") {
    t2controle0 = (t2controle0+1)%6;
    t2controle1 = (t2controle1+1)%6;
    t2controle2 = (t2controle2+1)%6;
    t2controle3 = (t2controle3+1)%6;
    t2controle4 = (t2controle4+1)%6;
    t2controle5 = (t2controle5+1)%6;
  
    jogador1t2.style.left = `${posiocaoLeftT2[t2controle0]}vw`;
    jogador1t2.style.top = `${posiocaoTopT2[t2controle0]}vw`;
  
    jogador2t2.style.left = `${posiocaoLeftT2[t2controle1]}vw`;
    jogador2t2.style.top = `${posiocaoTopT2[t2controle1]}vw`;
  
    jogador3t2.style.left = `${posiocaoLeftT2[t2controle2]}vw`;
    jogador3t2.style.top = `${posiocaoTopT2[t2controle2]}vw`;
  
    jogador4t2.style.left = `${posiocaoLeftT2[t2controle3]}vw`;
    jogador4t2.style.top = `${posiocaoTopT2[t2controle3]}vw`;
  
    jogador5t2.style.left = `${posiocaoLeftT2[t2controle4]}vw`;
    jogador5t2.style.top = `${posiocaoTopT2[t2controle4]}vw`;
  
    jogador6t2.style.left = `${posiocaoLeftT2[t2controle5]}vw`;
    jogador6t2.style.top = `${posiocaoTopT2[t2controle5]}vw`;
  }
};