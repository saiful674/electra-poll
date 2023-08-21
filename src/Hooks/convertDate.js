export function formatDateToInputValue(dateString) {
    // Parse the UTC date string
    const utcDate = new Date(dateString);

    // Convert the UTC date to the local date
    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() / 60000);

    // Extract the year, month, day, hours, and minutes
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');

    // Return the formatted string
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
