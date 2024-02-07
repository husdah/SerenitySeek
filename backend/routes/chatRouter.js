const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const validateToken = require('../middlewares/validateTokenHandler');

router.post("/authenticate", validateToken , async (req, res) => {
    const { username } = req.body;
  
    try {
      const r = await axios.put(
        "https://api.chatengine.io/users/",
        { username: username, secret: username, first_name: username },
        { headers: { "Private-Key": "fbbd2da5-885a-49ff-8a1a-91d3f3ccc33a" } }
      );
      return res.status(r.status).json(r.data);
    } catch (e) {
      return res.status(e.response.status).json(e.response.data);
    }
  
  });

module.exports = router;