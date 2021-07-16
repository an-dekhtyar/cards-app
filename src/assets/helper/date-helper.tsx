
type DateHelperType = {
    date:string
}

export let DateHelper = (props:DateHelperType) => {
    let convertDate = new Date(props.date)
    let newDate = convertDate.toLocaleDateString()
    let dateArr = newDate.split('/').map(d => Number(d) < 10 ? `0${d}`: d);
    [dateArr[0], dateArr[1]] = [dateArr[1], dateArr[0]];
    let result = dateArr.join('.')
    return <span>
        {result}
        </span>
}