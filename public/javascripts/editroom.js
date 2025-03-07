document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const imagePreview = document.getElementById("imagePreview");

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

});

function previewImage() {
    let previewContainer = document.getElementById("image-preview");
    let file = document.getElementById("room-image").files[0];

    previewContainer.innerHTML = "";

    if (file) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let img = document.createElement("img");
            img.src = e.target.result;
            previewContainer.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
}

function validate(event) {
    event.preventDefault();
    let form = event.target;
    let floor = document.getElementById("floor").value.trim();
    let size = document.getElementById("size").value.trim();
    let rent = document.getElementById("rent").value.trim();
    let isValid = true;

    if (isNaN(floor) || floor === "") {
        alert("ชั้นต้องเป็นตัวเลขเท่านั้น");
        isValid = false;
        return false;
    }

    if (isNaN(size) || size === "") {
        alert("ขนาดห้องต้องเป็นตัวเลขเท่านั้น หน่วยเป็น ตร.ม.");
        isValid = false;
        return false;
    }
    if (isNaN(rent) || rent === "") {
        alert("ราคาต้องเป็นตัวเลขเท่านั้น");
        isValid = false;
        return false;
    }
    if (isValid) {
        form.submit();
    }
}
