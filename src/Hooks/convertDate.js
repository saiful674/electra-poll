import { useSelector } from "react-redux";

export function formatDateToInputValue(dateString) {

    const formData = useSelector(s => s.formData)
    const timeZone = formData.timeZone;

    // Parse the offset from the timezone string (e.g., "UTC+6" becomes 6)
    const offset = parseInt(timeZone.replace("UTC", ""), 10);

    // Parse the UTC date string into a Date object
    const utcDate = new Date(dateString);

    // Adjust the utcDate object by the offset (in hours)
    utcDate.setHours(utcDate.getHours() + offset);

    // Extract the year, month, day, hours, and minutes
    const year = utcDate.getFullYear();
    const month = String(utcDate.getMonth() + 1).padStart(2, '0');
    const day = String(utcDate.getDate()).padStart(2, '0');
    const hours = String(utcDate.getHours()).padStart(2, '0');
    const minutes = String(utcDate.getMinutes()).padStart(2, '0');

    // Return the formatted string
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
