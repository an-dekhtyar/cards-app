import sortUp from './../../../../assets/images/ascending-sort.png'
import sortDown from './../../../../assets/images/descending-sort.png'
import st from './SortButton.module.css';
type SortButtonPropsType = {
    sortValue: boolean
    changeSortValue: (value: boolean) => void
    active: boolean
}

export const SortButton = (props: SortButtonPropsType) => {


    const onButtonClick = () => {
        props.changeSortValue(!props.sortValue);
    }
    const className = `${st.container} ${props.active?st.active:''}`
    return (
        <div className={className} onClick={onButtonClick}>
            {props.sortValue ? <img src={sortUp} alt={''}/> : <img src={sortDown} alt={''}/>}
        </div>
    )
}