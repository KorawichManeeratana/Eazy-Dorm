const express = require('express');
const router = express.Router();


//Routes
router.get('', (req, res) => {
    res.render('adddorm');
})

router.get('/process_addorm', function (req, res) {
    let formdata = {
        name: req.query.name,
        detail: req.query.detail,
        address: req.query.address,
        room: req.query.room,
        rent: req.query.rent,
        contact: req.query.contact,
        other_contact: req.query.other_contact,
        electric_pay: req.query.electric_pay,
        water_pay: req.query.water_pay
    };
    console.log(formdata);  
    let sql = `INSERT INTO users(username, password, email, first_name, last_name, age, address, phone) values ('${formdata.username}', '${formdata.password}', '${formdata.email}', '${formdata.first_name}', '${formdata.last_name}', ${formdata.age}, '${formdata.address}', '${formdata.phone}');`;
    console.log(sql);
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("a record inserted");
        res.send(`<script>
            alert("เพิ่มข้อมูลสำเร็จ");
            window.location.href = "/";
        </script>`);
        
    });
});

module.exports = router;