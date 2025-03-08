let subMenu = document.getElementById("subMenu");
const userDiv = document.querySelector(".user");
const loginBtn = document.querySelector(".loginBtn")
const notiMenu = document.getElementById("notiMenu");
const viewallNotifi = document.getElementById("viewallNotifi");
const spanofviewall = document.getElementById("spanofviewall");
const profilea = document.getElementById("profilea");
const notiBadge = document.getElementById("badge");

function toggleMenu() {
  if (notiMenu.classList.contains("open-menu")) {
    notiMenu.classList.remove("open-menu");
  }

  subMenu.classList.toggle("open-menu");
}

function toggleNoti() {
  if (subMenu.classList.contains("open-menu")) {
    subMenu.classList.remove("open-menu");
  }

  notiMenu.classList.toggle("open-menu");

  if (notiMenu.classList.contains("open-menu")) {
    markNotificationsAsRead();
  }
}

function hasAccessTokenCookie() {
  const value = ('; '+document.cookie).split(`; access_token=`).pop().split(';')[0];
  return value
}


function markNotificationsAsRead() {
  const notificationItems = document.querySelectorAll('.noti-menu');
  notiBadge.classList.add("hidden");

  notificationItems.forEach(item => {
    const notificationId = item.dataset.notificationId;
    updateNotificationStatus(notificationId);
  });
}

function updateNotificationStatus(notificationId) {
  fetch('/api/update_notification_status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ notificationId: notificationId })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }).catch(error => {
    console.error('There was an error updating the notification status:', error);
  });
}

if (hasAccessTokenCookie()) {
  userDiv.classList.remove("hidden");
  loginBtn.classList.add("hidden");

} else {
  userDiv.classList.add("hidden");
  loginBtn.classList.remove("hidden");
}

let token = hasAccessTokenCookie();

async function fetchCookieInfo() {
  const owneddorm = document.getElementById("ownedDorm");
  const usernamedisplay = document.getElementById("usernamedisplay");
  const userpfp = document.getElementById("userpfp");
  const biguserpfp = document.getElementById("biguserpfp");
  const bill = document.getElementById("bill");

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

    setInterval(() => {
      getNotification(decodedata.userID);
    }, 30000);

    owneddorm.href = `/owneddorm/${decodedata.userID}`;
    
    userpfp.src = decodedata.userpfp;
    biguserpfp.src = decodedata.userpfp;
    usernamedisplay.innerHTML = decodedata.username;
    profilea.href = `/profile/${decodedata.userID}`;
    bill.href = `/viewBill/${decodedata.userID}`;
    viewallNotifi.href = `/notification/${decodedata.userID}`

    if (decodedata.role == "owner") {
      owneddorm.classList.remove("hidden");
    }

  } catch (error) {
    console.error('Error fetching user info:', error);
  }
}

let lastUnreadCount = 0;

async function getNotification(user_id) {
  const notiList = document.getElementById("bignoti");

  try {
    const response = await fetch("http://localhost:3000/api/getNoti", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user_id, limit: true }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const data = await response.json();
    const finalData = data.allNoti[0][0];

    // ตรวจสอบว่า unread_count เปลี่ยนไปหรือไม่
    if (finalData.unread_count !== lastUnreadCount) {
      lastUnreadCount = finalData.unread_count; // อัพเดทค่าใหม่
      notiList.innerHTML = ""; // เคลียร์การแจ้งเตือนเก่า
      data.allNoti[0].forEach(noti => {
        notiList.insertAdjacentHTML('afterbegin', `
          <a href="/bill/${noti.pay_id}" class="noti-link">
            <div class="noti-menu" data-notification-id="${noti.NotiID}">
              <img src="${noti.user_pic}" alt="noti" class="noti-img"/>
              <div class="date-content">
                <span class="noti-content">${noti.content}</span>
                <span class="noti-date">${timeSince(noti.createAt)}</span>
              </div>
            </div>
          </a>
        `);
      });

      // อัพเดท badge
      if (finalData.unread_count > 9) {
        notiBadge.classList.remove("hidden");
        notiBadge.innerHTML = "9+";
      } else if (finalData.unread_count > 0) {
        notiBadge.classList.remove("hidden");
        notiBadge.innerHTML = finalData.unread_count;
      } else {
        notiBadge.classList.add("hidden");
      }

      spanofviewall.innerHTML = `ดูทั้งหมด (${data.allNoti[0].length})`;
      viewallNotifi.href = `/notification/${finalData.toWho}`;
    }

  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
}

function timeSince(dateString) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " ปีที่แล้ว";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " เดือนที่แล้ว";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " วันที่แล้ว";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " ชั่วโมงที่แล้ว";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " นาทีที่แล้ว";
  }
  return Math.floor(seconds) + " วินาทีที่แล้ว";
}


fetchCookieInfo();