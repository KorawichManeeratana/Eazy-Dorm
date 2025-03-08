async function loginUser() {
    const validatemessage = document.getElementById("passwordError");
      const uore = document.getElementById("uore");
      const password = document.getElementById("password");
      

    if (!uore.value || !password.value) {
      validatemessage.innerHTML = "กรุณากรอกข้อมูลให้ครบถ้วน";
      validatemessage.classList.add("show");
      return;
    }


const loginData = {
  uore: uore.value,
  password: password.value,
};


try {
  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
  });
  
  const data = await response.json();
  

  if (response.ok) {

    window.location.href = "/";

  } else {
      validatemessage.innerHTML = "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
      validatemessage.classList.add("show");
      return;
  }
} catch (error) {
  console.log("เกิดข้อผิดพลาดในการลงชื่อเข้าใช้: " + error);
}
}