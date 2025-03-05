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
            throw new Error('Failed to fetch user info');
        }
      
        const cookiedata = await cookieresponse.json();
        decodedata = cookiedata.decoded;

        const response = await fetch('/api/rentRoom', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({room_id: id, user_id: decodedata.userID}),
        });
        const data = await response.json();
        
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}