const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const validateToken = require('../middlewares/validateTokenHandler');
require('dotenv').config();

router.post("/authenticate", validateToken , async (req, res) => {
    const { username } = req.body;
  
    try {
      const r = await axios.put(
        "https://api.chatengine.io/users/",
        { username: username, secret: username, first_name: username },
        { headers: { "Private-Key":  process.env.CHAT_APP_PRIVATE_KEY } }
      );
      return res.status(r.status).json(r.data);
    } catch (e) {
      return res.status(e.response.status).json(e.response.data);
    }
  
  });

module.exports = router;