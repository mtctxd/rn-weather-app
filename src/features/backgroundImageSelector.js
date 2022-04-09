export const backgroundImageSelector = (icon) => {
  const processedIcon = icon;

  switch (processedIcon) {
    case '01d': //clear sky
    case '01n':
      return require('../../assets/weatherBackground/clearSky.jpg');
    case '02d': //few clouds
    case '02n':
    return require('../../assets/weatherBackground/clouds.gif');
    case '03d': //scattered clouds
    case '03n':
      return require('../../assets/weatherBackground/clouds.gif');
    case '04d': //broken clouds
    case '04n':
      return require('../../assets/weatherBackground/clouds.gif');
    case '09d': //shower rain
    case '09n':
      return require('../../assets/weatherBackground/rain.gif');
    case '10d': //rain
    case '10n':
      return require('../../assets/weatherBackground/rain.gif');
    case '11d': //thunderstorm
    case '11n':
      return require('../../assets/weatherBackground/thunderstorm.gif');
    case '13d': //snow
    case '13n':
      return require('../../assets/weatherBackground/snow.gif');
    case '50d': //mist
    case '50n':
      return require('../../assets/weatherBackground/mist.gif');

    default:
      return require('../../assets/weatherBackground/mist.gif');
  }
};
