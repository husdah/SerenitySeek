const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multerMiddleware');

const { addHotel, deleteHotel, getHotelsByCompanyId } = require('../controllers/hotelController');

router.post("/addHotel", upload.array('gallery'), addHotel);
router.delete("/delHotel/:id", deleteHotel);
router.get("/getHotels", getHotelsByCompanyId);

module.exports = router;