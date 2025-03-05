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

  const dormname = dname.textContent || dname.innerText;
  const totalrent = rent.textContent || rent.innerText;
  const waterBill = water.textContent || water.innerText;
  const elecBill = elec.textContent || elec.innerText;

  console.log("data:", roomid, dormname.trim(), totalrent.trim(), waterBill.trim(), elecBill.trim());

  try {
    const response = await fetch("/api/sendpayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomid: roomid, dormname: dormname.trim(), totalrent: totalrent.trim(), waterBill: waterBill.trim(), elecBill: elecBill.trim()}),
    });

    if (!response.ok) {
      throw new Error("Failed to send payment");
    }

    showSuccessPopup();

  } catch (error) {
    console.error("Error fetching user info:", error);
  }
}

function showSuccessPopup() {
  document.getElementById('successPopup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('successPopup').style.display = 'none';

  document.getElementById('water_pay').value = ''; // Clear ค่าน้ำ
  document.getElementById('electric_pay').value = ''; // Clear ค่าไฟ

  // Reset ค่าที่คำนวณ (ถ้ามี)
  document.getElementById('wres').textContent = ''; // Clear ผลลัพธ์ค่าน้ำ
  document.getElementById('eres').textContent = ''; // Clear ผลลัพธ์ค่าไฟ
  document.getElementById('totalrent').textContent = ''; // Clear ผลลัพธ์รวมค่าเช่า
}

