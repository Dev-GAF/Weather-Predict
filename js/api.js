/**
 * Makes a request to get weather data for a city.
 * 
 * @param {string} city - City name.
 * @returns {Promise<Object|undefined>} Object containing API data or undefined for some error.
 */
export async function getDataAPI(city)
{   
    const URL = `https://purple-sun-34a4.assumpcaojeter.workers.dev/?cidade=${encodeURIComponent(city)}&lang=pt_br&units=metric`;

    try 
    {
        const response = await fetch(URL);

        if (!response.ok)
            throw new Error(`Erro na requisição: ${response.statusText}`);

        const data = await response.json();    
        console.log(data);

        return data;
    } 
    catch (err) 
    {
        console.error("Error retrieving data. Check the name of city and try again", err);
        return;
    }
}