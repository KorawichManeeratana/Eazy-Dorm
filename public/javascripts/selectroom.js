let amenlist = [];

function openPage(id) {
    loadRoom(id);
    loadAmen(id);
    loadFloor(id);
}

async function loadRoom(id) {
    const checkedBoxes = document.querySelectorAll('input[name="floor"]:checked');
    const available = document.getElementsByClassName("avaicheck")[0];
    let minprice = document.getElementById("minprice").value;
    let maxprice = document.getElementById("maxprice").value;
    minprice = minprice ? parseInt(minprice) : 0;
    maxprice = maxprice ? parseInt(maxprice) : 9999999999;
    const floors = Array.from(checkedBoxes).map(floor => parseInt(floor.value));
    const response = await fetch('/api/loadroom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id, rent: !available.checked, floors: floors, amens: amenlist, min: minprice, max: maxprice}),
    });
    const data = await response.json();
    showRoom(data.allRoom);
}

async function loadAmen(id) {
    const response = await fetch('/api/loadamenities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id}),
    });
    const data = await response.json();
    const item_select = document.getElementById("Amen");
    for (a of data.allAmens) {
        item_select.insertAdjacentHTML('afterbegin', `<option value="${a.amen_id},${a.name}">${a.name}</option>`);
    }
    item_select.insertAdjacentHTML('afterbegin', `<option value="0" selected>เลือกสิ่งอำนวยความสดวก</option>`);
}

function addAmen() {
    let select = document.getElementById("Amen");
    let selected = select.selectedIndex;
    let [id, name] = select.value.split(",");
    document.getElementsByClassName("itemscontainer")[0].insertAdjacentHTML('afterbegin', `<div class="item" id="amen${id}">${name}<button onclick="removeAmen(${id}, '${name}')">x</button></div>`);
    amenlist.push(parseInt(id));
    if (selected > 0) {select.remove(selected);}
}

function removeAmen(id, name) {
    document.getElementById(`amen${id}`).remove();
    const item_select = document.getElementById("Amen");
    item_select.innerHTML += `<option value="${id},${name}">${name}</option>`;
    let newa = [];
    for (a of amenlist) {
        if (a != parseInt(id)) {newa.push(a)}
    }
    amenlist = newa;
}

function eq(val) {
    return val = 0;
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
    const popup = document.getElementsByClassName("popup")[0];
    data.length ? popup.style.display = "none" : popup.style.display = "block";
    for (room of data) {
        room_container.insertAdjacentHTML('afterbegin', `<div class="room" onclick="openRoomInfo(${room.room_id})">
                <img src="/images/${room.room_img}" alt="room_img">
                <div class="describe">
                    <h3>${room.room_number}</h3>
                    <h4>${room.rent} บาท</h4>
                    <h5>ชั้นที่ ${room.floor}</h5>
                    <p class="${(room.loger_id == null) ? "available":"unavailable"}">${(room.loger_id == null) ? "ว่าง":"ไม่ว่าง"}</p>
                </div>
            </div>`);
    }
}

function openRoomInfo(id) {
    window.open(`/Roominfo/${id}`, "_self");
    return;
}

