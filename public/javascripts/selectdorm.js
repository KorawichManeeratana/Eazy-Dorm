function showDorm(data) {
    document.getElementsByClassName("dormcontainer")[0].innerHTML = "";
    const dorm_container = document.getElementsByClassName("dormcontainer")[0];
    let minprice = document.getElementById("minprice").value;
    let maxprice = document.getElementById("maxprice").value;
    minprice = minprice ? parseInt(minprice) : 0;
    maxprice = maxprice ? parseInt(maxprice) : Infinity;
    const popup = document.getElementsByClassName("popup")[0];
    console.log(data.length);
    data.length ? popup.style.display = "none" : popup.style.display = "block";
    for (dorm of data) {
        if (dorm.rent.includes("-")) {
            let [min, max] = dorm.rent.split("-").map(n => parseInt(n.trim()));
            if (min < minprice || max > maxprice) {continue;}
        } else {
            let rent = parseInt(dorm.rent);
            if (rent < minprice || rent > maxprice) {continue;}
        }
        dorm_container.insertAdjacentHTML('afterbegin', `<div class="dorm" onclick="openDormInfo(${dorm.dorm_id})">
                <img src="/images/${dorm.dorm_pic}" alt="dorm_img">
                <div class="describe">
                    <h3>${dorm.name}</h3>
                    <h4>${dorm.rent} บาท</h4>
                    <p>${dorm.address}</p>
                </div>
            </div>`);
    }
}

function openDormInfo(id) {
    window.open(`/dorminfo/${id}`, "_self");
}

function openPage(){
    const maintext = sessionStorage.getItem("search");
    if (maintext) {
        document.getElementById("searchtext").value = maintext;
        sessionStorage.removeItem("search");
    }
    searchDorm();
}

async function searchDorm(event = null) {
    if (event) event.preventDefault();
    const text = document.getElementById("searchtext").value;
    const response = await fetch('api/loaddorm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: text}),
    });
    const data = await response.json();
    showDorm(data.allDorm)
}