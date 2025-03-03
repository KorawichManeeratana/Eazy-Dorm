async function loadAllRoom(id) {
    const response = await fetch('api/loadroom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
    });
    const data = await response.json();
    showRoom(data.allRoom)
}

function showRoom(data) {
    const room_container = document.getElementsByClassName("roomcontainer")[0];
    for (room of data) {
        room_container.insertAdjacentHTML('afterbegin', `<div class="room" onclick="openRoomInfo(${room.room_id})">
                <img src="/images/${room.room_img}" alt="room_img">
                <div class="describe">
                    <h2>${room.room_number}</h2>
                    <h4>${room.rent} บาท</h4>
                    <p>${room.floor}</p>
                </div>
            </div>`);
    }
}

function openRoomInfo(id) {
    window.open(`/Roominfo/${id}`, "_self");
    return;
}