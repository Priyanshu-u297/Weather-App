const apiKey = "936ef5f0c52dc1b2e000bba99f531825";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-button");
const weatherInfo = document.querySelector("#weather-info");
const weatherIcon = document.querySelector("#weather-icon");
const errorMessage = document.querySelector("#error-message");

async function checkWeather(city) {
    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        document.querySelector("#city-name").innerHTML = data.name;
        document.querySelector("#temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
        document.querySelector("#wind-speed").innerHTML = data.wind.speed + " km/h";

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "clouds.png";
                break;

            case "Clear":
                weatherIcon.src = "clear.png";
                break;

            case "Rain":
                weatherIcon.src = "rain.png";
                break;

            case "Drizzle":
                weatherIcon.src = "drizzle.png";
                break;

            case "Mist":
                weatherIcon.src = "mist.png";
                break;

            case "Snow":
                weatherIcon.src = "snow.png";
                break;

            case "Haze":
                weatherIcon.src = "haze.png";
                break;

            case "Thunderstorm":
                weatherIcon.src = "thunderstorm.png";
                break;

            case "Squall":
                weatherIcon.src = "squalls.png";
                break;

            case "Smoke":
                weatherIcon.src = "smoke.png";
                break;

            case "Fog":
                weatherIcon.src = "fog.png";
                break;

            default:
                weatherIcon.src = "unknown.png";
        }

        // Show the weather info
        weatherInfo.classList.remove('hidden');
        weatherInfo.classList.add('show');
        weatherIcon.classList.add('show');
        document.querySelector(".temp").classList.add('show');
        document.querySelector(".city").classList.add('show');
        document.querySelector(".details").classList.add('show');

        // Hide the error message
        errorMessage.classList.add('hidden');
        errorMessage.classList.remove('show');

    } catch (error) {
        console.error(error);
        showError("Invalid city name. Please try again.");
    }
}

function showError(message) {
    errorMessage.innerHTML = message;
    errorMessage.classList.remove('hidden');
    errorMessage.classList.add('show');

    // Hide the weather info
    weatherInfo.classList.add('hidden');
    weatherInfo.classList.remove('show');
    weatherIcon.classList.remove('show');
    document.querySelector(".temp").classList.remove('show');
    document.querySelector(".city").classList.remove('show');
    document.querySelector(".details").classList.remove('show');
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

document.querySelector("#search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    checkWeather(searchBox.value);
});
