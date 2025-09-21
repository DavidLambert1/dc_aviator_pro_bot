const PASSWORD = "0900";
let history = [];

function showPasswordPrompt() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("password-screen").classList.remove("hidden");
}

function checkPassword() {
  const input = document.getElementById("psw-input").value;
  if (input === PASSWORD) {
    document.getElementById("password-screen").classList.add("hidden");
    document.getElementById("main-screen").classList.remove("hidden");
  } else {
    document.getElementById("wrong-password").classList.remove("hidden");
  }
}

function generateCoefficient() {
  const value = randomInRange(1, 1.5);
  const box = document.getElementById("coefficient-box");
  box.innerText = `Koeffizient: ${parseFloat(value).toFixed(2)}`;
  updateHistory(parseFloat(value).toFixed(2));
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function updateHistory(value) {
  history.unshift(value);
  if (history.length > 10) history.pop();
  document.getElementById("history-ticker").innerText =
    "Letzte Koeffizienten: " + history.join(" • ");
}
