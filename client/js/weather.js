/* ==========================================
   KISAN MITHRA - WEATHER
========================================== */

// IMPORTANT:
// Do not use a real API key in frontend code
// for the final deployed website.
// We will move this to the backend later.

const apiKey = "26a313f3d746f26ab9a295bcaca610e3";


/* ==========================================
   LIVE DATE & TIME
========================================== */

function updateWeatherTime() {

    const dateTimeElement =
        document.getElementById("weatherDateTime");

    if (!dateTimeElement) return;

    const now = new Date();

    dateTimeElement.textContent =
        now.toLocaleString();

}

setInterval(updateWeatherTime, 1000);

updateWeatherTime();


/* ==========================================
   WEATHER SEARCH
========================================== */

async function getWeather() {

    const cityInput =
        document.getElementById("weatherCity");

    if (!cityInput) return;

    const city =
        cityInput.value.trim();

    if (city === "") {

        alert("Please enter a city name.");

        return;
    }


    const location =
        document.getElementById("weatherLocation");

    const temperature =
        document.getElementById("temperature");

    const condition =
        document.getElementById("weatherCondition");

    const humidity =
        document.getElementById("humidity");

    const wind =
        document.getElementById("windSpeed");

    const feelsLike =
        document.getElementById("feelsLike");

    const rain =
        document.getElementById("rainChance");

    const icon =
        document.getElementById("weatherIcon");


    /* Loading */

    location.textContent = "Loading...";

    temperature.textContent = "--°";

    condition.textContent =
        "Getting weather information...";


    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;


    try {

        const response =
            await fetch(url);

        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Unable to find this location."
            );

            location.textContent =
                "Location not found";

            return;
        }


        /* =========================
           LOCATION
        ========================= */

        location.textContent =
            `${data.name}, ${data.sys.country}`;


        /* =========================
           TEMPERATURE
        ========================= */

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;


        /* =========================
           CONDITION
        ========================= */

        condition.textContent =
            data.weather[0].description;


        /* =========================
           HUMIDITY
        ========================= */

        humidity.textContent =
            `${data.main.humidity}%`;


        /* =========================
           WIND
        ========================= */

        wind.textContent =
            `${data.wind.speed} m/s`;


        /* =========================
           FEELS LIKE
        ========================= */

        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;


        /* =========================
           RAIN
        ========================= */

        if (data.rain) {

            rain.textContent =
                "Rain detected";

        } else {

            rain.textContent =
                "No rain";

        }


        /* =========================
           WEATHER ICON
        ========================= */

        const weatherIconCode =
            data.weather[0].icon;

        icon.textContent =
            getWeatherEmoji(
                data.weather[0].main
            );


        /* =========================
           FARMING MESSAGE
        ========================= */

        updateFarmingMessage(
            data.weather[0].main,
            data.main.temp,
            data.main.humidity
        );

    }

    catch (error) {

        console.error(
            "Weather error:",
            error
        );

        alert(
            "Something went wrong while getting weather data."
        );

        location.textContent =
            "Unable to load weather";

    }

}


/* ==========================================
   WEATHER EMOJI
========================================== */

function getWeatherEmoji(weather) {

    switch (weather) {

        case "Clear":
            return "☀️";

        case "Clouds":
            return "☁️";

        case "Rain":
            return "🌧️";

        case "Drizzle":
            return "🌦️";

        case "Thunderstorm":
            return "⛈️";

        case "Snow":
            return "❄️";

        case "Mist":
        case "Fog":
        case "Haze":
            return "🌫️";

        default:
            return "🌤️";
    }

}


/* ==========================================
   FARMING MESSAGE
========================================== */

function updateFarmingMessage(
    weather,
    temperature,
    humidity
) {

    const message =
        document.getElementById(
            "weatherMessage"
        );

    if (!message) return;


    if (
        weather === "Rain" ||
        weather === "Drizzle"
    ) {

        message.textContent =
            "🌧️ Rain detected. Consider checking soil moisture before irrigation.";

    }

    else if (temperature > 35) {

        message.textContent =
            "🌡️ High temperature detected. Monitor crop water requirements.";

    }

    else if (humidity > 80) {

        message.textContent =
            "💧 High humidity detected. Keep an eye on possible fungal disease conditions.";

    }

    else {

        message.textContent =
            "🌱 Current weather conditions can help you plan irrigation and farm activities.";

    }

}