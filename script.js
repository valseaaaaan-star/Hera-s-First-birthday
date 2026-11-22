const button = document.getElementById("action-btn");
const statusText = document.getElementById("status");
let count = 0;

button.addEventListener("click", () => {
  count += 1;
  statusText.textContent = `Button clicked ${count} time(s)!`;
});
