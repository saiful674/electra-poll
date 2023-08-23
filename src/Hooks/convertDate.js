import getMyInfo from "./getMyInfo";

export function formatDateToInputValue(dateString) {

    const newUser = getMyInfo();
    const timeZone = newUser[0][0]?.timeFormat;

    // Extract the offset value from the timeZone string (e.g., "+6" from "UTC+6")
    const offset = parseInt(timeZone?.replace('UTC', ''), 10);
    console.log(offset);

    // Parse the UTC date string
    const utcDate = new Date(dateString);

    // Apply the offset to the UTC time
    let localDate = new Date(utcDate.getTime() + offset * 60 * 60 * 1000);
    if (timeZone?.includes('+')) {
        localDate = new Date(utcDate.getTime() - offset * 60 * 60 * 1000);
    }

    // Extract the year, month, day, hours, and minutes
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');

    // Return the formatted string
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

