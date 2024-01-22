const express = require('express');
const router = express.Router();

const { addHotel, deleteHotel, getHotelsByCompanyId } = require('../controllers/hotelController');
const upload = require('../middlewares/multerMiddleware');
const validateToken = require('../middlewares/validateTokenHandler');
const { isCompany } = require('../middlewares/roleHandler');

router.post("/hotel", validateToken, isCompany, upload.array('gallery'), addHotel);
router.delete("/hotel/:id", validateToken, isCompany, deleteHotel);
router.get("/hotel", validateToken, isCompany, getHotelsByCompanyId);

module.exports = router;