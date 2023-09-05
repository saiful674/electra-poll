export function toUTCDateString(dateStringLocal, timezoneString) {
    // Parse the local date string into a Date object
    const dateObject = new Date(dateStringLocal);

    // Extract the offset from the timezone string (e.g., "UTC+4" becomes 4)
    const offset = parseInt(timezoneString.replace("UTC", ""), 10);

    // Adjust the date object by the offset (in hours)
    dateObject.setHours(dateObject.getHours() + offset);

    // Extract the components from the adjusted date
    const year = dateObject.getUTCFullYear();
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getUTCDate()).padStart(2, '0');
    const hours = String(dateObject.getUTCHours()).padStart(2, '0');
    const minutes = String(dateObject.getUTCMinutes()).padStart(2, '0');
    const seconds = String(dateObject.getUTCSeconds()).padStart(2, '0');

    // Format and return the adjusted date string
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}



