import {Button} from '../Button/Button';
import {Simulate} from 'react-dom/test-utils';


type SortButtonPropsType = {
    sortValue: boolean
    changeSortValue: (value: boolean) => void
}

export const SortButton = (props: SortButtonPropsType) => {


    const onButtonClick = () => {
        props.changeSortValue(!props.sortValue);
    }

    return (
        <Button onClick={onButtonClick}>
            {props.sortValue ? '^' : '⌄'}
        </Button>
    )
}