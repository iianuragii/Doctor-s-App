function convertToActualTime(floatTime) {
    const hours = Math.floor(floatTime);
    const minutes = Math.round((floatTime - hours) * 60);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Pad with leading zero if necessary
    return `${formattedHours}:${formattedMinutes} ${period}`;
}

module.exports = { convertToActualTime};