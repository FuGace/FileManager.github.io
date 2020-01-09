export const beautifyDate = (date) => {
        const dateObj = new Date(date);
        const month = new Array ("января", "февраля", "марта", "апреля", "мая", "июня",
                    "июля", "августа", "сентября", "октября", "ноября", "декабря");
        return `${dateObj.getDate()} ${month[dateObj.getMonth()]} ${dateObj.getFullYear()}г.`;
}