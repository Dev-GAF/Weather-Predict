/**
 * Makes a request to get weather data for a city.
 * 
 * @param {string} city - City name.
 * @returns {Promise<Object|undefined>} Object containing API data or undefined for some error.
 */
async function getDataAPI(city)
{   
    const URL = `https://purple-sun-34a4.assumpcaojeter.workers.dev/?cidade=${encodeURIComponent(city)}`;

    try 
    {
        const response = await fetch(URL);
        const data = await response.json();    

        return data;
    } 
    catch (err) 
    {
        console.error("Error retrieving data. Check the name of city and try again", err);
        return;
    }
}

/**
 * 
 * @returns {string} - City name.
 */
function getCityInput() 
{
    return document.getElementById("city").value.trim();
}

/**
 * Clear the weather forecast display divs.
 */
function clearDisplay() 
{
    document.getElementById("today").innerHTML = "";
    document.getElementById("otherDays").innerHTML = "";
}

/**
 * Makes the divs that display the weather forecast visible.
 */
function showElements() 
{
    document.getElementById("today").style.display = "block";
    document.getElementById("otherDays").style.display = "flex";
}

/**
 * @param {string} dataString - Date in "YYYY/MM/DD" format.
 * @returns {string} Date formatted with weekday abbreviation and day number.
 */
function formatDate(dataString)
{
    const date = new Date(dataString + 'T00:00:00');
    const weekDay = date.toLocaleDateString('pt-BR', { 
        weekday: 'long'
    });
        
    const nameDay = weekDay.split("-")[0].trim();

    const shortenedDay = nameDay.slice(0, 3).toLowerCase();

    const numberDay = date.getDate().toString().padStart(2, '0');

    return `${shortenedDay}, ${numberDay}`;
}

/**
 * Main function: fetches city data, clears the screen, displays current and future data.
 */
async function shape() 
{
    const city = getCityInput();

    if (!city)
    {
        alert("Write the name of a city!");
        return;
    }

    const data = await getDataAPI(city)
    console.log(data);

    if (!data || !data.forecast || !data.forecast.forecastday) {
        alert("Invalid data returned from API.");
        return;
    }
        
    clearDisplay();
    showElements();

    renderToday(data);
    renderOtherDays(data);
}

/**
 * Renders the current day's weather data on the screen.
 * 
 * @param {Object} data - Returns data from API.
 */
function renderToday(data) 
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
function renderOtherDays(data) 
{
    const otherDaysDiv = document.getElementById("otherDays");
    const forecastDays = data.forecast.forecastday;

    const subTitle = document.createElement("h1");
    subTitle.textContent = "Previsão para os próximos 2 dias";
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

/**
 * Allows the use of the "Enter" key in the city field to search for the forecast.
 */
document.getElementById("city").addEventListener("keydown", function (event) {
    if (event.key === "Enter") 
        shape(); 
});


