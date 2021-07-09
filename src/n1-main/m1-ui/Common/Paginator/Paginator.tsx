import s from './Paginator.module.css';
import React, {useState} from 'react';


type PaginatorPropsType = {
    currentItem: number,
    itemCount: number,
    portionSize: number,
    onPageChanged: (page: number) => void
}

export const Paginator = (props: PaginatorPropsType) => {
    debugger
    const {
        currentItem,
        itemCount,
        portionSize
    } = props;

    const [currentPortion, setCurrentPortion]= useState<number>(1);

    const totalPortionCount = Math.ceil(itemCount / portionSize);
    const leftBorderItem = (currentPortion - 1) * portionSize + 1;
    const rightBorderItem = currentPortion * portionSize;

    let items = [];
    for (let i = leftBorderItem; i <= rightBorderItem; i++) {
        items.push(i);
    }

    const onPrevButtonClick = ()=>{
        setCurrentPortion(currentPortion-1)
    }
    const onNextButtonClick = ()=>{
        setCurrentPortion(currentPortion+1);
    }

    const pagesComponent = items.map(p => {
        const onClick = () => {
            props.onPageChanged(p);
        }
        return (
            <span key={p} className={`${p === currentItem ? s.currentItem : ''} ${s.item}`} onClick={onClick}>{p}</span>
        )
    });

    return (
        <div>
            {currentPortion!==1&&<button className={s.btn} onClick={onPrevButtonClick}>Prev</button>}
            {pagesComponent}
            {currentPortion!==totalPortionCount&&<button className={s.btn} onClick={onNextButtonClick}>Next</button>}
        </div>
    );
}