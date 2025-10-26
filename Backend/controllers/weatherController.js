
const axios = require('axios');


exports.getWeatherByCoordinates = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'Weather API key not configured'
      });
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    const response = await axios.get(weatherUrl);

    res.status(200).json({
      success: true,
      data: {
        location: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        weather: response.data.weather[0].main,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        windSpeed: response.data.wind.speed,
        clouds: response.data.clouds.all,
        visibility: response.data.visibility,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        timezone: response.data.timezone
      }
    });
  } catch (error) {
    console.error('Weather API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch weather data',
      error: error.response?.data?.message || error.message
    });
  }
};


exports.getWeatherByCity = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City name is required'
      });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'Weather API key not configured'
      });
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    const response = await axios.get(weatherUrl);

    res.status(200).json({
      success: true,
      data: {
        location: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        weather: response.data.weather[0].main,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        windSpeed: response.data.wind.speed,
        clouds: response.data.clouds.all,
        visibility: response.data.visibility,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        timezone: response.data.timezone,
        coordinates: {
          lat: response.data.coord.lat,
          lon: response.data.coord.lon
        }
      }
    });
  } catch (error) {
    console.error('Weather API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch weather data',
      error: error.response?.data?.message || error.message
    });
  }
};


exports.getWeatherForecast = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'Weather API key not configured'
      });
    }

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    const response = await axios.get(forecastUrl);

    // Process forecast data
    const forecast = response.data.list.map(item => ({
      date: item.dt,
      dateText: item.dt_txt,
      temperature: item.main.temp,
      feelsLike: item.main.feels_like,
      humidity: item.main.humidity,
      weather: item.weather[0].main,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      windSpeed: item.wind.speed,
      clouds: item.clouds.all,
      pop: item.pop // Probability of precipitation
    }));

    res.status(200).json({
      success: true,
      data: {
        location: response.data.city.name,
        country: response.data.city.country,
        forecast
      }
    });
  } catch (error) {
    console.error('Weather Forecast Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch weather forecast',
      error: error.response?.data?.message || error.message
    });
  }
};