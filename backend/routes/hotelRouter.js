const express = require('express');
const router = express.Router();

const { addHotel, deleteHotel, getHotelsByCompanyId } = require('../controllers/hotelController');
const upload = require('../middlewares/multerMiddleware');
const validateToken = require('../middlewares/validateTokenHandler');


router.use(validateToken);
router.post("/addHotel", upload.array('gallery'), addHotel);
router.delete("/delHotel/:id", deleteHotel);
router.get("/getHotels", getHotelsByCompanyId);

module.exports = router;