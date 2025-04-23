import { formatDate } from "./utils.js";

/**
 * 
 * @returns {string} - City name.
 */
export function getCityInput() 
{
    return document.getElementById("city").value.trim();
}

/**
 * Clear the weather forecast display divs.
 */
export function clearDisplay() 
{
    document.getElementById("today").innerHTML = "";
    document.getElementById("otherDays").innerHTML = "";
}

/**
 * Makes the divs that display the weather forecast visible.
 */
export function showElements() 
{
    document.getElementById("today").style.display = "block";
    document.getElementById("otherDays").style.display = "flex";
}

/**
 * Renders the current day's weather data on the screen.
 * 
 * @param {Object} data - Returns data from API.
 */
export function renderToday(data) 
{
    const todayDiv = document.getElementById("today");
    const today = data.forecast.forecastday[0];
    const currentTime = new Date(data.location.localtime);

    const cityTitle = document.createElement("h1");
    cityTitle.textContent = data.location.name;
    todayDiv.appendChild(cityTitle);

    let closestHourData = today.hour[0];
    let closestDiff = Math.abs(currentTime - new Date(closestHourData.time));

    for (let i = 1; i<today.hour.length; i++) 
    {
        const hourTime = new Date(today.hour[i].time);
        const diff = Math.abs(currentTime - hourTime);
        if (diff < closestDiff) 
        {
            closestDiff = diff;
            closestHourData = today.hour[i];
        }
    }

    const currentInfo = document.createElement("div");
    currentInfo.id = "current-info";

    const imgToday = document.createElement("img");
    imgToday.src = `https:${closestHourData.condition.icon}`;
    imgToday.alt = closestHourData.condition.text;

    const temp = document.createElement("h1");
    temp.id = "temperature";
    temp.textContent = `${Math.round(closestHourData.temp_c)}°C`;

    currentInfo.appendChild(imgToday);
    currentInfo.appendChild(temp);

    const description = document.createElement("p");
    description.id = "description";
    description.textContent = closestHourData.condition.text;

    const othersInfoClimate = document.createElement("div");
    othersInfoClimate.id = "details";

    const feelsLike = document.createElement("p");
    feelsLike.textContent = `Sensação térmica: ${Math.round(closestHourData.feelslike_c)}°C`;

    const humidity = document.createElement("p");
    humidity.textContent = `Umidade: ${closestHourData.humidity}%`;

    const pressure = document.createElement("p");
    pressure.textContent = `Pressão: ${closestHourData.pressure_mb} hPa`;

    othersInfoClimate.append(feelsLike, humidity, pressure);

    todayDiv.append(currentInfo, description, othersInfoClimate);
}

/**
 * Renders the forecast for the next 2 days.
 * 
 * @param {Object} data - Returns data from API.
 */
export function renderOtherDays(data) 
{
    const otherDaysDiv = document.getElementById("otherDays");
    const forecastDays = data.forecast.forecastday;

    const subTitle = document.createElement("h1");
    subTitle.textContent = "Previsão para os próximos 2 dias";
    subTitle.id = "title-others-weathers"
    otherDaysDiv.appendChild(subTitle);

    for (let i = 1; i<forecastDays.length; i++) 
    {
        const divDays = document.createElement("div");
        divDays.id = "div-days";

        const dayWeek = document.createElement("p");
        dayWeek.textContent = formatDate(forecastDays[i].date);

        const img = document.createElement("img");
        img.src = `https:${forecastDays[i].day.condition.icon}`;
        img.alt = forecastDays[i].day.condition.text;

        const tempText = document.createElement("p");
        tempText.textContent = `${Math.round(forecastDays[i].day.maxtemp_c)}°C / ${Math.round(forecastDays[i].day.mintemp_c)}°C`;

        const desc = document.createElement("p");
        desc.textContent = forecastDays[i].day.condition.text;
        desc.id = "others-temp";

        divDays.append(dayWeek, img, tempText, desc);
        otherDaysDiv.appendChild(divDays);
    }
}