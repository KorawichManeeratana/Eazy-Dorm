function cal() {
  let water = document.getElementById("water_pay").value;
  let elect = document.getElementById("electric_pay").value;

  let wpm = document.getElementById("waterpm").value;
  let epm = document.getElementById("electpm").value;
  let waterprice = water * wpm;
  let electprice = elect * epm;
  document.getElementById("wres").innerHTML = waterprice;
  document.getElementById("eres").innerHTML = electprice;
  document.getElementById("totalrent").innerHTML =
    waterprice +
    electprice +
    parseInt(document.getElementById("rent").textContent);
}

document.getElementById("roomSelect").addEventListener("change", function () {
  let selectedOption = this.options[this.selectedIndex];
  let tenantName = selectedOption.getAttribute("data-tenant");
  let roomStatus = selectedOption.getAttribute("data-status");
  let rent = selectedOption.getAttribute("data-rent");

  document.getElementById("water_pay").value = "";
  document.getElementById("electric_pay").value = "";

  document.getElementById("tenantName").innerText = tenantName || "ไม่มีข้อมูล";
  document.getElementById("roomStatus").innerText = roomStatus || "ไม่มีข้อมูล";
  document.getElementById("rent").innerText = rent || "ไม่มีข้อมูล";
  document.getElementById("wres").innerText = "";
  document.getElementById("eres").innerText = "";
  document.getElementById("totalrent").innerText = " ";
});

document.getElementById("roomSelect").dispatchEvent(new Event("change"));

async function sendBill() {
  const roomid = document.getElementById("roomSelect").value;
  const rent = document.getElementById("totalrent");
  const dname = document.getElementById("dname");
  const water = document.getElementById("wres");
  const elec = document.getElementById("eres");
  const lodger = document.getElementById("tenantName");

  const dormname = dname.textContent || dname.innerText;
  const totalrent = rent.textContent || rent.innerText;
  const waterBill = water.textContent || water.innerText;
  const elecBill = elec.textContent || elec.innerText;
  const lodgerName = lodger.textContent || lodger.innerText;

  if (lodgerName === "ไม่มีข้อมูล" || lodgerName === "ไม่มีผู้เช่า") {
    showPopup('noTenantPopup');
    return;
  }

  try {
    const response = await fetch("/api/sendpayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomid: roomid,
        dormname: dormname.trim(),
        totalrent: totalrent.trim(),
        waterBill: waterBill.trim(),
        elecBill: elecBill.trim(),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send payment");
    }

    showPopup('successPopup');
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
}

function showPopup(popupId) {
  document.getElementById(popupId).style.display = 'flex';
}

function closePopup(popupId) {
  document.getElementById(popupId).style.display = 'none';

  document.getElementById('water_pay').value = '';
  document.getElementById('electric_pay').value = '';

  document.getElementById('wres').textContent = '';
  document.getElementById('eres').textContent = '';
  document.getElementById('totalrent').textContent = '';
}