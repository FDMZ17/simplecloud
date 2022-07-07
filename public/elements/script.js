// grab everything we need
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

// add event listener
btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

function copyUrl() {
  let copyText = document.getElementById("command");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}