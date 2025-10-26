const express = require('express');
const router = express.Router();
const {
  getWeatherByCoordinates,
  getWeatherByCity,
  getWeatherForecast
} = require('../controllers/weatherController');

// Public routes - no authentication required
router.get('/', getWeatherByCoordinates);
router.get('/city', getWeatherByCity);
router.get('/forecast', getWeatherForecast);

module.exports = router;