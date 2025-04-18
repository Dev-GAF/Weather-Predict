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

    const forecastDays = data.forecast.forecastday;

    const cityName = data.location.name;

    const divWeather = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = cityName;
    divWeather.appendChild(title);

    for (let i=0; i<forecastDays.length; i++)
    {
        const day = forecastDays[i];

        const dayContainer = document.createElement("div");

        const pTempMax = document.createElement("p");
        pTempMax.textContent = `Max Temp: ${day.day.maxtemp_c}°C`;

        const pTempMin = document.createElement("p");
        pTempMin.textContent = `Min Temp: ${day.day.mintemp_c}°C`;

        const pHumidity = document.createElement("p");
        pHumidity.textContent = `Humidity: ${day.day.avghumidity}%`;

        const pFeelsLike = document.createElement("p");
        pFeelsLike.textContent = `Feels Like: ${data.current.feelslike_c}°C`;

        const pPressure = document.createElement("p");
        pPressure.textContent = `Pressure: ${data.current.pressure_mb} hPa`;

        dayContainer.appendChild(pTempMax);
        dayContainer.appendChild(pTempMin);
        dayContainer.appendChild(pHumidity);
        dayContainer.appendChild(pFeelsLike);
        dayContainer.appendChild(pPressure);

        divWeather.appendChild(dayContainer);
    }

    const main = document.querySelector("main");
    main.innerHTML = ""; 
    main.appendChild(divWeather);
}



