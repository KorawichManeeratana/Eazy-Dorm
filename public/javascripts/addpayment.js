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
  const dormname = dname.textContent || dname.innerText;
  const totalrent = rent.textContent || rent.innerText;

  console.log("data:", roomid, dormname.trim(), totalrent.trim());

  try {
    const response = await fetch("/api/sendpayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomid: roomid, dormname: dormname.trim(), totalrent: totalrent.trim()}),
    });

    if (!response.ok) {
      throw new Error("Failed to send payment");
    }

  } catch (error) {
    console.error("Error fetching user info:", error);
  }
}
