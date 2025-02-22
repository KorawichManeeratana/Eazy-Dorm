let subMenu = document.getElementById("subMenu");
const userDiv = document.querySelector(".user");
const loginBtn = document.querySelector(".loginBtn")

function toggleMenu() {
  subMenu.classList.toggle("open-menu")
}

function hasAccessTokenCookie() {
  const value = ('; '+document.cookie).split(`; access_token=`).pop().split(';')[0];
  console.log("Access token value: ", value);
  return value
}


if (hasAccessTokenCookie()) {
  console.log("Access token exists.");
  userDiv.classList.remove("hidden");
  loginBtn.classList.add("hidden");

} else {
  console.log("Access token does not exist.");
  userDiv.classList.add("hidden");
  loginBtn.classList.remove("hidden");
}