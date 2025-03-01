function showDorm(data) {
    document.getElementsByClassName("dormcontainer")[0].innerHTML = "";
    const dorm_container = document.getElementsByClassName("dormcontainer")[0];
    for (dorm of data) {
        dorm_container.insertAdjacentHTML('afterbegin', `<div class="dorm" onclick="openDormInfo(${dorm.dorm_id})">
                <img src="/images/${dorm.dorm_pic}" alt="dorm_img">
                <div class="describe">
                    <h2>${dorm.name}</h2>
                    <h4>${dorm.rent} บาท</h4>
                    <p>${dorm.address}</p>
                </div>
            </div>`);
    }
}

function openDormInfo(id) {
    window.open(`/dorminfo/${id}`, "_self");
    return;
}

async function searchDorm(event) {
    event.preventDefault();
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