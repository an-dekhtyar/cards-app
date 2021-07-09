import {Button} from '../Button/Button';


type SortButtonPropsType = {
    sortValue: boolean
    changeSortValue: (value: boolean) => void
    active: boolean
}

export const SortButton = (props: SortButtonPropsType) => {


    const onButtonClick = () => {
        props.changeSortValue(!props.sortValue);
    }

    return (
        <Button onClick={onButtonClick} red={props.active}>
            {props.sortValue ? '^' : '⌄'}
        </Button>
    )
}