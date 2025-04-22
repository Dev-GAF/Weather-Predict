/**
 * Makes a request to get weather data for a city.
 * 
 * @param {string} city - City name.
 * @returns {Promise<Object|undefined>} Object containing API data or undefined for some error.
 */
export async function getDataAPI(city)
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