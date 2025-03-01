var minSlider = document.getElementById("min");
var maxSlider = document.getElementById("max");
var outputMin = document.getElementById("min-value");
var outputMax = document.getElementById("max-value");

var RangeCon = document.getElementById("rangePick");

// กำหนดค่าเริ่มต้นให้กับ input text
outputMin.value = minSlider.value;
outputMax.value = maxSlider.value;

minSlider.oninput = function () {
  outputMin.value = this.value;
  // ป้องกันไม่ให้ min เกิน max
  if (parseInt(this.value) > parseInt(maxSlider.value)) {
    maxSlider.value = this.value;
    outputMax.value = this.value;
  }
};

maxSlider.oninput = function () {
  outputMax.value = this.value;
  // ป้องกันไม่ให้ max น้อยกว่า min
  if (parseInt(this.value) < parseInt(minSlider.value)) {
      minSlider.value = this.value;
      outputMin.value = this.value;
  }
};

// เพิ่ม event listener สำหรับ input text เพื่ออัพเดท slider
outputMin.addEventListener("input", function() {
  let value = parseInt(this.value);
  if (isNaN(value)) {
    value = 0; // ตั้งค่าเป็น 0 หากไม่ใช่ตัวเลข
  }
  minSlider.value = value;

  // ป้องกันไม่ให้ min เกิน max
  if (value > parseInt(maxSlider.value)) {
    maxSlider.value = value;
    outputMax.value = value;
  } else {
    this.value = value;
  }
});

outputMax.addEventListener("input", function() {
  let value = parseInt(this.value);
  if (isNaN(value)) {
    value = 0; // ตั้งค่าเป็น 0 หากไม่ใช่ตัวเลข
  }
  maxSlider.value = value;
  // ป้องกันไม่ให้ max น้อยกว่า min
  if (value < parseInt(minSlider.value)) {
      minSlider.value = value;
      outputMin.value = value;
  } else {
    this.value = value;
  }

});

function toggleRange() {
  RangeCon.classList.toggle("open-range");
}