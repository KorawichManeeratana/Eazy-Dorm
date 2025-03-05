const express = require('express');
const router = express.Router(); // สร้าง router instance
const cookieParser = require('cookie-parser');

router.post('/logout', (req, res) => {
  res.clearCookie('access_token', { path: '/' });
  res.redirect('/');
});

module.exports = router;