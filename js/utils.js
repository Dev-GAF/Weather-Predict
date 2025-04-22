/**
 * @param {string} dataString - Date in "YYYY/MM/DD" format.
 * @returns {string} Date formatted with weekday abbreviation and day number.
 */
export function formatDate(dataString)
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