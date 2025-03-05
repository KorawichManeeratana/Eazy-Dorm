function openSelectRoom(id) {
    window.open(`/selectroom/${id}`, "_self");
    return;
}

async function do_comment(dorm_id) {
    const comment = document.getElementById("my_comment_text").value;
    const ratings = document.getElementById("my_comment_rating").value;
    try {
        const cookieresponse = await fetch("http://localhost:3000/api/cookieInfo", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({ token: token }),
        });
        if (!cookieresponse.ok) {
            throw new Error('Failed to fetch user info');
        }
      
        const cookiedata = await cookieresponse.json();
        decodedata = cookiedata.decoded;

        const response = await fetch('/api/submit_comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({dorm_id: dorm_id, user_id: decodedata.userID, comment: comment, rating: ratings}),
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
