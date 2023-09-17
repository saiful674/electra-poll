export function createNewDate(utc) {
    // Parse the time zone offset from the string
    const offset = parseInt(utc.replace("UTC", ""), 10);

    // Create a date in local time
    const localDate = new Date();

    // Adjust the date to account for the time zone offset
    localDate.setHours(localDate.getHours() + offset);

    // Return adjusted date in ISO format
    return localDate.toISOString();
}