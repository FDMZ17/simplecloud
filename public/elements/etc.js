function copyCMD() {
  let copyText = document.getElementById("command");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

function copyToken() {
  let copyText = document.getElementById("token");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}