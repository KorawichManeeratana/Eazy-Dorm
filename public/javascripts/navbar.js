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

let token = hasAccessTokenCookie();

async function fetchCookieInfo() {
  const owneddorm = document.getElementById("ownedDorm");
  const usernamedisplay = document.getElementById("usernamedisplay");
  const userpfp = document.getElementById("userpfp");
  const biguserpfp = document.getElementById("biguserpfp");

  try {
    const response = await fetch("http://localhost:3000/api/cookieInfo", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const data = await response.json();
    decodedata = data.decoded;
    console.log(decodedata);

    userpfp.src = decodedata.userpfp;
    biguserpfp.src = decodedata.userpfp;
    usernamedisplay.innerHTML = decodedata.username;

    if (decodedata.role == "owner") {
      owneddorm.classList.remove("hidden");
    }

  } catch (error) {
    console.error('Error fetching user info:', error);
  }
}

fetchCookieInfo();