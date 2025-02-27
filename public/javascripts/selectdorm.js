async function loadAllDorm() {
    const response = await fetch('api/loaddorm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    });
    const data = await response.json();
    showAllDorm(data.allDorm[0])
}

function showAllDorm(data) {
    const dorm_container = document.getElementsByClassName("dormcontainer")[0];
    for (dorm of data) {
        dorm_container.insertAdjacentHTML('afterbegin', `<div class="dorm">
                <img src="/images/${dorm.dorm_pic}" alt="dorm_img">
                <div class="describe">
                    <h2>${dorm.name}</h2>
                    <div class="price">${dorm.rent}</div>
                    <button type="button" onclick="openDormInfo(${dorm.dorm_id})">รายละเอียด</button>
                </div>
            </div>`);
    }
}

function openDormInfo(id) {
    window.open(`/dorminfo/${id}`, "_self");
    return;
}