export function createNewDate(utc) {
    // Given a timeZone string like "UTC+4"
    const timeZone = "UTC+4";

    // 1. Parse the time zone offset from the string
    const offset = parseInt(timeZone.replace("UTC", ""), 10); // Extracts the "+4" and converts to an integer

    // 2. Create a date in local time
    const localDate = new Date();

    // 3. Adjust the date to account for the time zone offset
    // Note: getTimezoneOffset() returns the difference in minutes between local time and UTC.
    // If local time is UTC+2, then getTimezoneOffset() would return -120.
    localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset() + offset * 60);

    // 4. Now, localDate is adjusted to the desired time zone, and you can use it as you wish
    // To convert it to a UTC string:
    return localDate.toISOString();  // Outputs adjusted date in UTC format

}