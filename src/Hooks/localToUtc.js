export function toUTCDateString(dateStringUTC, timezoneString) {

    console.log(dateStringUTC, timezoneString);
    // Parse the UTC date string into a Date object
    const dateObject = new Date(dateStringUTC);

    // Extract the offset from the timezone string (e.g., "UTC+4" becomes 4)
    const offset = parseInt(timezoneString.replace("UTC", ""), 10);

    // Adjust the date object by the offset (in hours)
    dateObject.setHours(dateObject.getHours() + offset);

    // Format the adjusted date into the desired UTC format
    const year = dateObject.getUTCFullYear();
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const day = String(dateObject.getUTCDate()).padStart(2, '0');
    const hours = String(dateObject.getUTCHours()).padStart(2, '0');
    const minutes = String(dateObject.getUTCMinutes()).padStart(2, '0');
    const seconds = String(dateObject.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

