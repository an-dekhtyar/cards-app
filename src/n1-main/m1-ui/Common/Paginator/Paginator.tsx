import s from './Paginator.module.css';
import React from 'react';


type PaginatorPropsType = {
    currentItem: number,
    itemCount: number,
    portionSize: number,
    onPageChanged: (page: number) => void
}

export const Paginator = (props: PaginatorPropsType) => {
    const {
        currentItem,
        itemCount,
        portionSize
    } = props;

    const totalPortionCount = Math.ceil(itemCount / portionSize);

    let items = [];
    let i = currentItem - 4;
    if (totalPortionCount - currentItem < 5) {
        i = i - (5 - totalPortionCount + currentItem);
    }
    while (items.length < 10 && i <= totalPortionCount) {
        if (items.length === 0 && currentItem > 5 && totalPortionCount > portionSize) {
            items.push(1)
        } else if (items.length === 9 && totalPortionCount - currentItem > 5 && totalPortionCount > portionSize) {
            items.push(totalPortionCount);
        } else if (i > 0) {
            items.push(i)
        }
        i++;
    }


    const onPrevButtonClick = () => {
        props.onPageChanged(currentItem - 1)
    }
    const onNextButtonClick = () => {
        props.onPageChanged(currentItem + 1)
    }

    const pagesComponent = items.map(p => {
        const onClick = () => {
            debugger;
            props.onPageChanged(p);
        }
        return (
            <>
                {totalPortionCount > 10 && totalPortionCount - currentItem > 5 && p === totalPortionCount && '...'}
                <span key={p} className={`${p === currentItem ? s.currentItem : ''} ${s.item}`}
                      onClick={onClick}>{p}</span>
                {currentItem > 5 && p === 1 && totalPortionCount > 10 && '...'}
            </>
        )
    });

    return (
        <div>
            {currentItem !== 1 && <button className={s.btn} onClick={onPrevButtonClick}>Prev</button>}
            {pagesComponent}
            {currentItem !== totalPortionCount &&
            <button className={s.btn} onClick={onNextButtonClick}>Next</button>}
        </div>
    );
}