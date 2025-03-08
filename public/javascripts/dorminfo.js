let point = 0;

function openSelectRoom(id) {
    window.open(`/selectroom/${id}`, "_self");
    return;
}

async function do_comment(dorm_id) {
    const comment = document.getElementById("my_comment_text").value;
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

        const response = await fetch('/api/submit_comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({dorm_id: dorm_id, user_id: decodedata.userID, comment: comment, rating: point}),
        });

        const rating = await fetch('/api/updateRating', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({dorm_id: dorm_id}),
        });

        if (response.ok && rating.ok) {
            location.reload();
        }
        
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}

function changeStar(nPoint){
    (point == nPoint) ? point=0 : point=nPoint;
    const stars = document.querySelectorAll(".star");
    stars.forEach(s => s.classList.remove("active"));
    for (let i = 0; i < point; i++) {
        stars[i].classList.add("active");
    }
}

function changeStarColor(nPoint){
    if (nPoint >= point) {
        const stars = document.querySelectorAll(".star");
        stars.forEach(s => s.classList.remove("active"));
        for (let i = 0; i < nPoint; i++) {
            stars[i].classList.add("active");
        }
    }
}
