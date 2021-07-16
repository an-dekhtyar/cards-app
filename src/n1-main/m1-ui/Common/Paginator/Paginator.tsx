import s from './Paginator.module.css';
import React from 'react';
import leftArr from './../../../../assets/images/left-arrow.png';
import rightArr from './../../../../assets/images/right-arrow.png';

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
            props.onPageChanged(p);
        }
        return (
            <React.Fragment key={p}>
                {totalPortionCount > 10 && totalPortionCount - currentItem > 5 && p === totalPortionCount && '...'}
                <span className={`${p === currentItem ? s.currentItem : ''} ${s.item}`}
                      onClick={onClick}>{p}</span>
                {currentItem > 5 && p === 1 && totalPortionCount > 10 && '...'}
            </React.Fragment>
        )
    });

    return (
        <div className={s.container}>
            {currentItem !== 1 && <img src={leftArr} className={s.btn} onClick={onPrevButtonClick} alt={''}/>}
            {pagesComponent}
            {currentItem !== totalPortionCount &&
            <img src={rightArr} className={s.btn} onClick={onNextButtonClick} alt={''}/>}
        </div>
    );
}