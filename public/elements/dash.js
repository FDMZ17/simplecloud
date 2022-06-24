const showToken = document.querySelector("#showToken");
const viewToken = document.querySelector("#viewToken");

showToken.addEventListener("click", function() {
  viewToken.clasList.toggle("invisible");
});
