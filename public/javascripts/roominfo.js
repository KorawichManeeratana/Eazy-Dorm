async function rentTheRoom(id) {
    try {
        const cookieresponse = await fetch("http://localhost:3000/api/cookieInfo", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({ token: token }),
        });
        if (!cookieresponse.ok) {
            window.location.href = "/login";
            return;
        }
        const cookiedata = await cookieresponse.json();
        decodedata = cookiedata.decoded;

        const response = await fetch('/api/rentRoom', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({room_id: parseInt(id), user_id: decodedata.userID}),
        });
        if (response.ok) {
            let data = await response.json();
            if (data.message == "Room already rented") {
                alert("ห้องนี้ถูกจองไปแล้ว");
            }
            if (data.message == "You already rent a room") {
                alert("คุณมีห้องที่จองอยู่แล้ว");
            }
            if (data.message == "Room rented") {
                let button = document.getElementsByClassName("notrentbutton")[0];
                button.setAttribute("class", "rentedbutton");
                button.removeAttribute("onclick");
                alert("จองสำเร็จ!");
            }
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}