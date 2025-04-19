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

async function shape() 
{
    const city = document.getElementById("city").value.trim();

    if (!city)
    {
        alert("Write the name of a city!");
        return;
    }

    const data = await getDataAPI(city)

    if (!data) return;

    const todayDiv = document.getElementById("today");
    const otherDaysDiv = document.getElementById("otherDays");

    todayDiv.innerHTML = "";
    otherDaysDiv.innerHTML = "";

    todayDiv.style.display = "block";

    const forecastDays = data.forecast.forecastday;
    
    // ---------- TODAY ----------
    const today = forecastDays[0];

    // Name of City
    const divCity = document.createElement("div");

    const titleCity = document.createElement("h1");
    titleCity.textContent = data.location.name;

    divCity.appendChild(titleCity)

    // IMG and Temperature
    const currentHour = new Date(data.location.localtime).getHours();

    const hourDataNow = today.hour.find(h => {
        const hour = new Date(h.time).getHours();
        return hour === currentHour;
    });

    const currentForecast = hourDataNow || today.hour[0]

    const currentInfo = document.createElement("div");
    currentInfo.id = "current-info";

    const img = document.createElement("img");
    img.src = `https:${currentForecast.condition.icon}`;
    img.alt = currentForecast.condition.text;

    const temp = document.createElement("h1");
    temp.id = "temperature";
    temp.textContent = `${currentForecast.temp_c}°C`;

    currentInfo.appendChild(img);
    currentInfo.appendChild(temp);

    const descriptionInfo = document.createElement("div");

    const description = document.createElement("p");
    description.id = "description"
    description.textContent = currentForecast.condition.text;

    descriptionInfo.appendChild(description);

    const othersInfoClimate = document.createElement("div");
    othersInfoClimate.id = "details"

    const feelsLike = document.createElement("p");
    feelsLike.textContent = `Feels Like: ${currentForecast.feelslike_c}°C`;

    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${currentForecast.humidity}%`;

    const pressure = document.createElement("p");
    pressure.textContent = `Pressure: ${currentForecast.pressure_mb} hPa`;

    othersInfoClimate.appendChild(feelsLike);
    othersInfoClimate.appendChild(humidity);
    othersInfoClimate.appendChild(pressure);

    todayDiv.appendChild(divCity);
    todayDiv.appendChild(currentInfo);
    todayDiv.appendChild(descriptionInfo);
    todayDiv.appendChild(othersInfoClimate);
}



