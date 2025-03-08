document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const imagePreview = document.getElementById("imagePreview");
    const qrFileInput = document.getElementById("qrFileInput");

    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    qrFileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            document.getElementById('filesel').value = file.name;
        } else {
            document.getElementById('filesel').value = "อัพโหลด QR code";
        }
    });
});

function validate(event) {
    event.preventDefault();
    let form = event.target;
    let pay = document.getElementById("pay").value.trim();
    let rent1 = document.getElementById("rent1").value.trim();
    let rent2 = document.getElementById("rent2").value.trim();
    let phone = document.getElementById("phone_contact").value.trim();
    let electric_pay = document.getElementById("electric_pay").value.trim();
    let water_pay = document.getElementById("water_pay").value.trim();

    let isValid = true; 

    if (pay === "") {
        alert("กรุณากรอกเลขบัญชี");
        isValid = false;
        return false;
    }
    
    if (isNaN(rent1) || rent1 === "") {
        alert("ราคาเริ่มต้นต้องเป็นตัวเลขเท่านั้น");
        isValid = false;
        return false;
    }
    if (isNaN(rent2) || rent2 === "") {
        alert("ราคาสูงสุดต้องเป็นตัวเลขเท่านั้น");
        isValid = false;
        return false;
    }

    if (parseFloat(rent1) > parseFloat(rent2)) {
        alert("ราคาสูงสุดต้องมากกว่าหรือเท่ากับราคาเริ่มต้น");
        isValid = false;
        return false;
    }

    let phonePattern = /^[0-9-]+$/;
    if (!phonePattern.test(phone) || phone === "") {
        alert("หมายเลขโทรศัพท์ต้องเป็นตัวเลขและสามารถมีเครื่องหมาย '-' ได้เท่านั้น");
        isValid = false;
        return false;
    }
    if (isNaN(electric_pay) || electric_pay === "") {
        alert("ค่าไฟต้องเป็นตัวเลขเท่านั้น");
        isValid = false;
        return false;
    }
    if (isNaN(water_pay) || water_pay === "") {
        alert("ค่าน้ำต้องเป็นตัวเลขเท่านั้น");
        isValid = false;
        return false;
    }
    if (isValid) {
        form.submit();
    }
}