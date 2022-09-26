import { DateTime } from "luxon"

const API_KEY = "a37987a1eaa5df7a7e586c81911898ef"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType)
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })

    return fetch(url).then(res => res.json())
}

const formatCurrentWeather = (data) => {
    const {
        coord: { lon, lat },
        main: {
            feels_like,
            temp,
            temp_min,
            temp_max,
            humidity,
            pressure
        },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed, deg },
        visibility
    } = data

    const { main: details, description, icon } = weather[0]

    return { lon, lat, feels_like, temp, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, description, icon, speed, deg, visibility, pressure }
}

const formatForecastWeather = (data) => {
    let { timezone, hourly, daily } = data
    daily = daily.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, "ccc, dd LLL"),
            temp_min: d.temp.min,
            temp_max: d.temp.max,
            icon: d.weather[0].icon
        }
    })
    hourly = hourly.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            temp: d.temp,
            icon: d.weather[0].icon
        }
    })
    return { timezone, hourly, daily }
}

const formatToLocalTime = (secs, zone, format = "ccc, dd LLL' • ' hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)



const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather)

    const { lat, lon } = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData("onecall", {
        lat,
        lon,
        exclude: 'current,minutely,alerts',
        units: searchParams.units
    }).then(formatForecastWeather)

    return { ...formattedCurrentWeather, ...formattedForecastWeather }
}

const iconURLFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

const degToCompass = (deg) => {
    var val = Math.floor((deg / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

export default getFormattedWeatherData
export { formatToLocalTime, iconURLFromCode, degToCompass }