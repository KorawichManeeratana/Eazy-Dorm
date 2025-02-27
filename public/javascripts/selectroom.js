async function loadAllRoom(id) {
    const response = await fetch('api/loadroom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
    });
    const data = await response.json();
    console.log(data)
    showRoom(data.allRoom[0])
}

function showRoom(data) {
    const room_container = document.getElementsByClassName("roomcontainer")[0];
    for (room of data) {
        room_container.insertAdjacentHTML('afterbegin', `<div class="room">
                <img src="/images/${room.room_img} alt="room_img">
                <div class="describe">
                    <h2>${room.number}</h2>
                    <div class="price">${room.rent} บาท</div>
                    <button type="button" onclick="openRoomInfo(${room.room_id})">รายละเอียด</button>
                </div>
            </div>`);
    }
}

function openRoomInfo(id) {
    window.open(`/Roominfo/${id}`, "_self");
    return;
}