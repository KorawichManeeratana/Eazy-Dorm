async function registerUser() {
  const firstName = document.getElementById("Firstnameinput").value;
  const lastName = document.getElementById("Lastnameinput").value;
  const dob = document.getElementById("Dob").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmpassword").value;
  const validatemessage = document.getElementById("passwordError");
  const tel = document.getElementById("tel").value;
  const emailInput = document.getElementById("email").value;
  const ownerRadio = document.getElementById('owner');
  const clientRadio = document.getElementById('client');

  
  let role = "";

  if (!ownerRadio.checked && !clientRadio.checked) {
    validatemessage.innerHTML = "กรุณาเลือกว่าคุณเป็นเจ้าของหอพักหรือผู้เช่า";
    validatemessage.classList.add("show");
    return;
  }

  if (ownerRadio.checked) {
    role = "owner";
  } else if (clientRadio.checked) {
    role = "lodger";
  }
  console.log(firstName, lastName, dob, username, password, confirmPassword, role, tel, emailInput);

  if (
    !firstName ||
    !lastName ||
    !dob ||
    !username ||
    !password ||
    !confirmPassword
  ) {
    validatemessage.innerHTML = "กรุณากรอกข้อมูลให้ครบถ้วน";
    validatemessage.classList.add("show");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput)) {
    validatemessage.innerHTML = "กรุณากรอกอีเมลให้ถูกต้อง";
    validatemessage.classList.add("show");
    return;
  }

  if (password !== confirmPassword) {
    validatemessage.innerHTML = "รหัสผ่านไม่ตรงกัน";
    validatemessage.classList.add("show");
    return;
  }

  const userData = {
    firstName: firstName,
    lastName: lastName,
    dob: dob,
    username: username,
    password: password,
    role: role,
    tel: tel,
    email: emailInput,
  };


  try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    

    if (response.ok) {

      window.location.href = "/login";

    }
    
  } catch (error) {
    console.log("เกิดข้อผิดพลาดในการลงทะเบียน: " + error);
  }
}


const ownerDiv = document.querySelector('.owner');
const clientDiv = document.querySelector('.client');
const ownerRadio = document.getElementById('owner');
const clientRadio = document.getElementById('client');

function handleRadioSelection(selectedDiv, selectedRadio) {
    
    const radioButtons = document.querySelectorAll('input[name="role"]');
    const divs = document.querySelectorAll('.owner, .client');

    divs.forEach(div => div.classList.remove('selected'));
    radioButtons.forEach(radio => radio.checked = false);

    
    selectedRadio.checked = true;
    selectedDiv.classList.add('selected');
}

ownerDiv.addEventListener('click', function() {
    handleRadioSelection(ownerDiv, ownerRadio);
});

clientDiv.addEventListener('click', function() {
    handleRadioSelection(clientDiv, clientRadio);
});


if (ownerRadio.checked) {
    ownerDiv.classList.add('selected');
} else if (clientRadio.checked) {
    clientDiv.classList.add('selected');
}