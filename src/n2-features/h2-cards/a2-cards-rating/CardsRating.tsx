import React from "react";
import st from './CardsRating.module.css'




type RatingType = {
    rate: number

}

export const CardRating = (props: RatingType) => {

    return (
        <div>
            <Star selected={props.rate > 0} />
            <Star selected={props.rate > 1} />
            <Star selected={props.rate > 2} />
            <Star selected={props.rate > 3} />
            <Star selected={props.rate > 4} />
        </div>
    )

}

type StarPropsType = {
    selected:boolean

}

function Star(props: StarPropsType) {



    return(

        <span className={st.star}> {props.selected === true ? <b>★ </b> : "☆ "}  </span>
    )
}




type RatingType2 = {
    rate: number

}

export const CardRating2 = (props: RatingType2) => {

    let first = ''
    let second = ''
    let third = ''
    let fourth = ''
    let five = ''

    if (props.rate >= 0.5 && props.rate < 1) {
        first = 'half'
    } else if ( props.rate >= 1 ) {
        first = 'full'
    } else {
        first = 'empty'
    }

    if (props.rate >= 1.5 && props.rate < 2) {
        second = 'half'
    } else if ( props.rate >= 2 ) {
        second = 'full'
    } else {
        second = 'empty'
    }

    if (props.rate >= 2.5 && props.rate < 3) {
        third = 'half'
    } else if ( props.rate >= 3 ) {
        third = 'full'
    } else {
        third = 'empty'
    }

    if (props.rate >= 3.5 && props.rate < 4) {
        fourth = 'half'
    } else if ( props.rate >= 4 ) {
        fourth = 'full'
    } else {
        fourth = 'empty'
    }

    if (props.rate >= 4.5 && props.rate < 5) {
        five = 'half'
    } else if ( props.rate === 5 ) {
        five = 'full'
    } else {
        five = 'empty'
    }



    return (

        <div className={st.star2}>
            <Star2 selected={first}/>
            <Star2 selected={second} />
            <Star2 selected={third} />
            <Star2 selected={fourth} />
            <Star2 selected={five} />
        </div>
    )

}

type StarPropsType2 = {
    selected: string

}

function Star2(props: StarPropsType2) {



    return (
        <>
            {props.selected === 'full' ? <img src="https://img.icons8.com/material-outlined/24/000000/filled-star.png"/> : ''}
            {props.selected === 'half' ? <img src="https://img.icons8.com/material-outlined/24/000000/star-half-empty.png"/> : ''}
            {props.selected === 'empty' ? <img src="https://img.icons8.com/material-outlined/24/000000/star--v2.png"/> : ''}
        </>
    )
}

