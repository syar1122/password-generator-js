const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const lowerEl = document.getElementById("lower");
const upperEl = document.getElementById("upper");
const symbolEl = document.getElementById("symbol");
const numberEl = document.getElementById("number");
const generateEl = document.getElementById("generate");

const randomFuncs = {
  lower: getRandomLower,
  upper: getRandomUpper,
  symbol: getRandomSymbol,
  number: getRandomNumber,
};
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomLower() {
  return String.fromCharCode(randomIntFromInterval(97, 122));
}
function getRandomUpper() {
  return String.fromCharCode(randomIntFromInterval(65, 90));
}
function getRandomNumber() {
  return String.fromCharCode(randomIntFromInterval(48, 57));
}
function getRandomSymbol() {
  const SYMBOLS = "<>?/.,:][)(-=+_";
  return SYMBOLS[randomIntFromInterval(0, SYMBOLS.length - 1)];
}

function getValAndGen() {
  let generatedPassword = "";
  let length = +lengthEl.value;
  let lower = lowerEl.checked;
  let upper = upperEl.checked;
  let symbol = symbolEl.checked;
  let number = numberEl.checked;
  let count = lower + upper + symbol + number;
  let funcNames = [];
  let typeArr = [{ lower }, { upper }, { symbol }, { number }].filter((el) => {
    return Object.values(el)[0];
  });
  if (count <= 0) {
    alert("please check at least 1 checkbox");
    return;
  }

  typeArr.forEach((el) => {
    funcNames.push(randomFuncs[Object.keys(el)]);
  });
  if (length < 0) {
    alert("length must be at least 1");
    return;
  }

  for (let index = 0; index < length; index++) {
    let randomNums = randomIntFromInterval(0, funcNames.length - 1);
    generatedPassword += funcNames[randomNums]();
  }

  passwordEl.value = generatedPassword;
}

function copyPass() {
  navigator.clipboard.writeText(passwordEl.value);
  M.toast({
    html: "Password copied !!!",
    displayLength: 1000,
    inDuration: 600,
    outDuration: 600,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".tooltipped");
  var instances = M.Tooltip.init(elems, {});
});
