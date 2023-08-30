export function toUTCDateString(dateStringLocal, timezoneString) {
    // Parse the local date string into a Date object
    const dateObject = new Date(dateStringLocal);

    // Convert the date object to its UTC representation
    const utcDate = new Date(
        dateObject.getUTCFullYear(),
        dateObject.getUTCMonth(),
        dateObject.getUTCDate(),
        dateObject.getUTCHours(),
        dateObject.getUTCMinutes(),
        dateObject.getUTCSeconds()
    );

    // Extract the offset from the timezone string (e.g., "UTC+4" becomes 4)
    const offset = parseInt(timezoneString.replace("UTC", ""), 10);

    // Adjust the UTC date by the offset (in hours)
    utcDate.setHours(utcDate.getHours() + offset);

    // Extract the components from the adjusted date
    const year = utcDate.getUTCFullYear();
    const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(utcDate.getUTCDate()).padStart(2, '0');
    const hours = String(utcDate.getUTCHours()).padStart(2, '0');
    const minutes = String(utcDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(utcDate.getUTCSeconds()).padStart(2, '0');

    // Format and return the adjusted date string
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}


