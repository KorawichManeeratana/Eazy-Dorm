function openPage(id) {
    loadRoom(id);
    loadFloor(id);
}

async function loadRoom(id) {
    const checkedBoxes = document.querySelectorAll('input[name="floor"]:checked');
    const floors = Array.from(checkedBoxes).map(floor => parseInt(floor.value));
    console.log(floors)
    const response = await fetch('/api/loadroom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id, rent: false, floors: floors}),
    });
    const data = await response.json();
    showRoom(data.allRoom);
}

async function loadFloor(id) {
    const response = await fetch('/api/loadroomfloors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id}),
    });
    const data = await response.json();
    const floor_container = document.getElementsByClassName("floorselect")[0];
    for (f of data.allFloors) {
        floor_container.insertAdjacentHTML('afterbegin', `<div><input type="checkbox" name="floor" value="${f.floor}"> ชั้น ${f.floor}</div>`)
    }
}

function showRoom(data) {
    document.getElementsByClassName("roomcontainer")[0].innerHTML = "";
    const room_container = document.getElementsByClassName("roomcontainer")[0];
    for (room of data) {
        room_container.insertAdjacentHTML('afterbegin', `<div class="room" onclick="openRoomInfo(${room.room_id})">
                <img src="/images/${room.room_img}" alt="room_img">
                <div class="describe">
                    <h3>${room.room_number}</h3>
                    <h4>${room.rent} บาท</h4>
                    <h5>ชั้นที่${room.floor}</h5>
                </div>
            </div>`);
    }
}

function openRoomInfo(id) {
    window.open(`/Roominfo/${id}`, "_self");
    return;
}

