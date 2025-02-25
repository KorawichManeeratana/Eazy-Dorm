let subMenu = document.getElementById("subMenu");
const userDiv = document.querySelector(".user");
const loginBtn = document.querySelector(".loginBtn")
const notiMenu = document.getElementById("notiMenu");
const viewallNotifi = document.getElementById("viewallNotifi");
const spanofviewall = document.getElementById("spanofviewall");

function toggleMenu() {
  if (notiMenu.classList.contains("open-menu")) {
    notiMenu.classList.remove("open-menu");
  }

  subMenu.classList.toggle("open-menu");
}

function toggleNoti(){
  if (subMenu.classList.contains("open-menu")) {
    subMenu.classList.remove("open-menu");
  }

  notiMenu.classList.toggle("open-menu");
}

function hasAccessTokenCookie() {
  const value = ('; '+document.cookie).split(`; access_token=`).pop().split(';')[0];
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
    
    getNotification(decodedata.userID);
    owneddorm.href = `/owneddorm/${decodedata.userID}`;

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

async function getNotification(user_id) {
  const notiList = document.getElementById("bignoti");

  try {
    const response = await fetch("http://localhost:3000/api/getNoti", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: user_id, limit: true}),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const data = await response.json();
    console.log("data:", data.allNoti[0][0]);
    const finalData = data.allNoti[0][0];

    notiList.insertAdjacentHTML('afterbegin', `<div class="noti-menu">
            <img src="${finalData.user_pic}" alt="noti" class="noti-img"/>
            <div class="date-content">
              <span class="noti-content">${finalData.content}</span>
              <span class="noti-date">14 ชั่วโมง</span>
            </div>
          </div>`);

    spanofviewall.innerHTML = `ดูทั้งหมด (${data.allNoti[0].length})`;
    viewallNotifi.href = `/notification/${finalData.toWho}`;

  }catch (error) {
    console.error('Error fetching user info:', error);
  }
}

fetchCookieInfo();