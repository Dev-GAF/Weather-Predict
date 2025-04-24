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

    const now = new Date();
    const todayList = data.list; 

    let closest = todayList[0];
    let minDiff = Math.abs(now - new Date(closest.dt_txt));

    for (const forecast of todayList) 
    {
        const forecastTime = new Date(forecast.dt_txt);
        const diff = Math.abs(now - forecastTime);
        if (diff < minDiff) 
        {
            minDiff = diff;
            closest = forecast;
        }
    }

    const cityTitle = document.createElement("h1");
    cityTitle.textContent = data.city.name;
    todayDiv.appendChild(cityTitle);

    const currentInfo = document.createElement("div");
    currentInfo.id = "current-info";

    const imgToday = document.createElement("img");
    imgToday.src = `https://openweathermap.org/img/wn/${closest.weather[0].icon}@2x.png`;
    imgToday.alt = closest.weather[0].description;

    const temp = document.createElement("h1");
    temp.id = "temperature";
    temp.textContent = `${Math.round(closest.main.temp)}°C`;

    currentInfo.appendChild(imgToday);
    currentInfo.appendChild(temp);

    const description = document.createElement("p");
    description.id = "description";
    description.textContent = closest.weather[0].description;

    const othersInfoClimate = document.createElement("div");
    othersInfoClimate.id = "details";

    const feelsLike = document.createElement("p");
    feelsLike.textContent = `Sensação térmica: ${Math.round(closest.main.feels_like)}°C`;

    const humidity = document.createElement("p");
    humidity.textContent = `Umidade: ${closest.main.humidity}%`;

    const pressure = document.createElement("p");
    pressure.textContent = `Pressão: ${closest.main.pressure} hPa`;

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
    const todayList = data.list; 

    const subTitle = document.createElement("h1");
    subTitle.textContent = "Previsão para os próximos 4 dias";
    subTitle.id = "title-others-weathers";
    otherDaysDiv.appendChild(subTitle);

    const forecastsByDay = {};

    todayList.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        const day = date.toISOString().split('T')[0]; 

        if (!forecastsByDay[day]) 
        {
            forecastsByDay[day] = {
                maxTemp: forecast.main.temp_max,
                minTemp: forecast.main.temp_min,
                description: forecast.weather[0].description,
                icon: forecast.weather[0].icon,
            };
        } 
        else
        {
            forecastsByDay[day].maxTemp = Math.max(forecastsByDay[day].maxTemp, forecast.main.temp_max);
            forecastsByDay[day].minTemp = Math.min(forecastsByDay[day].minTemp, forecast.main.temp_min);
        }
    });

    const today = new Date().toISOString().split('T')[0];  
    const days = Object.keys(forecastsByDay)
        .filter(day => day !== today)  
        .slice(0, 4);  

    days.forEach(day => {
        const divDays = document.createElement("div");
        divDays.id = "div-days";

        const date = new Date(day);
        const formattedDate = formatDate(day);  

        const dayWeek = document.createElement("p");
        dayWeek.textContent = formattedDate;

        const img = document.createElement("img");
        img.src = `https://openweathermap.org/img/wn/${forecastsByDay[day].icon}@2x.png`;
        img.alt = forecastsByDay[day].description;

        const tempText = document.createElement("p");
        tempText.textContent = `${Math.round(forecastsByDay[day].maxTemp)}°C / ${Math.round(forecastsByDay[day].minTemp)}°C`;

        const desc = document.createElement("p");
        desc.textContent = forecastsByDay[day].description;
        desc.id = "others-temp";

        divDays.append(dayWeek, img, tempText, desc);
        otherDaysDiv.appendChild(divDays);
    });
}
