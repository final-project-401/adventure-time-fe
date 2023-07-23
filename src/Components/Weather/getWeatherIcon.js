export const getWeatherIcon = (weatherCode, icon) => {
  let url = `https://basmilius.github.io/weather-icons/production/fill/all/`
  let svgPath;

  switch (weatherCode) {
    case 900:
      svgPath = 'rain.svg';
      break;
    case 804:
      icon[3] === 'd' ? svgPath = `overcast-day.svg` : svgPath = `overcast-night.svg`
      break;
    case 801:
    case 802:
    case 803:
      icon[3] === 'd' ? svgPath = `partly-cloudy-day.svg` : svgPath = `partly-cloudy-night.svg`
      break;
    case 800:
      icon[3] === 'd' ? svgPath = `clear-day.svg` : svgPath = `clear-night.svg`
      break;
    case 741:
    case 751:
      icon[3] === 'd' ? svgPath = `partly-cloudy-day-fog.svg` : svgPath = `partly-cloudy-night-fog.svg`
      break;
    case 731:
      icon[3] === 'd' ? svgPath = `dust-day.svg` : svgPath = `dust-night.svg`
      break;
    case 721:
      icon[3] === 'd' ? svgPath = `partly-cloudy-day-haze.svg` : svgPath = `partly-cloudy-night-haze.svg`
      break;
    case 711:
      icon[3] === 'd' ? svgPath = `partly-cloudy-day-smoke.svg` : svgPath = `partly-cloudy-night-smoke.svg`
      break;
    case 700:
      svgPath = 'mist.svg';
      break;
    case 611:
    case 612:
      svgPath = 'sleet.svg';
      break;
    case 601:
    case 602:
    case 622:
    case 623:
      svgPath = 'snow.svg';
      break;
    case 600:
    case 610:
    case 621:
      icon[3] === 'd' ? svgPath = `partly-cloudy-day-snow.svg` : svgPath = `partly-cloudy-night-snow.svg`
      break;
    case 500:
    case 501:
    case 502:
    case 511:
      svgPath = 'rain.svg';
      break;
    case 520:
    case 522:
      icon[3] === 'd' ? svgPath = `rain.svg` : svgPath = `partly-cloudy-night-rain.svg`
      break;
    case 521:
      icon[3] === 'd' ? svgPath = `partly-cloudy-day-rain.svg` : svgPath = `partly-cloudy-night-rain.svg`
      break;
    case 300:
    case 301:
    case 302:
      svgPath = 'drizzle.svg';
      break;
    case 230:
    case 231:
    case 232:
    case 233:
      icon[3] === 'd' ? svgPath = `thunderstorms-day.svg` : svgPath = `thunderstorms-night.svg`
      break;
    case 202:
    case 201:
    case 200:
      icon[3] === 'd' ? svgPath = `thunderstorms-day-rain.svg` : svgPath = `thunderstorms-night-rain.svg`
      break
    default:
      break;
  }

  return `${url}${svgPath}`
}
