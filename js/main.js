import { getCityInput, clearDisplay, showElements } from "./dom.js";
import { getDataAPI  } from "./api.js";
import { renderToday, renderOtherDays } from "./dom.js";

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

    const data = await getDataAPI(city);

    if (!data || !data.list || !data.city) 
    {
        alert("Invalid data returned from API.");
        return;
    }

    clearDisplay();
    showElements();

    renderToday(data); 
    renderOtherDays(data); 
}

/**
 * Allows the use of the "Enter" key in the city field to search for the forecast.
 */
document.getElementById("city").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {  
        event.preventDefault();   
        shape(); 
    }
});

// Click the Button
document.getElementById('weather-form').addEventListener('submit', function (event) {
    event.preventDefault();  
    shape();  
});