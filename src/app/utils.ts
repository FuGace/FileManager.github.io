export const beautifyDate = (date) => {
        const dateObj = new Date(date);
        return `${dateObj.getFullYear()}г. ${dateObj.getMonth() + 1} ${dateObj.getDate()}`;
}