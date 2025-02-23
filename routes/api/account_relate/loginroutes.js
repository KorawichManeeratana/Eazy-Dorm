const express = require('express');
const LoginController = require('../../../controller/accounts/login');


const router = express.Router();

router.post('/login', async (req, res) => {
    try {
      const result = await LoginController(req.body);
  
      if (result.status === 200) {
        
        const token = result.token;
       
        res.cookie('access_token', token, { httpOnly: false, secure: true , path: '/', sameSite: 'Strict', domain: 'localhost'});

        res.status(result.status).send({ message: result, token: token });

      } else {

        res.status(result.status).send({ message: result });
      }
    } catch (error) {
      console.error("Route Error:", error);
      res.status(500).send({ message: 'Internal server error', error: error.message });
    }
  });

module.exports = router;