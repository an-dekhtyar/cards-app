

export const convertDate = (dataStr: string) => {
    const date = new Date(dataStr);
    const month = date.getMonth()>9?date.getMonth():`0${date.getMonth()}`;
    const day = date.getDate()>9?date.getDate():`0${date.getDate()}`;
    const year = date.getFullYear();

    return `${day}.${month}.${year}`
}