const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware')

const { addHotel, deleteHotel, getAllHotels } = require('../controllers/hotelController');

router.post("/hotel", upload.array('gallery'), addHotel);
router.delete("/hotel/:id", deleteHotel);
router.get("/hotel/", getAllHotels);

module.exports = router;