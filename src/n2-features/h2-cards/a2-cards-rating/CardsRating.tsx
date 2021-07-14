import React, {useState} from "react";




export type RatingValueType = 0 | 1 | 2 | 3 | 4 | 5
type RatingType = {
    rate: RatingValueType
    onClick:(rate: RatingValueType)=>void
}
export const CardRating = () => {


    return (
        <Rating rate={4} onClick={()=>{}}/>
    )
}
function Rating(props: RatingType) {

    const [rate, setRate] = useState<RatingValueType>(0)

    return (
        <div>
            <Star selected={props.rate > 0} onClick={()=>{props.onClick(1)}} />
            <Star selected={props.rate > 1} onClick={()=>{props.onClick(2)}} />
            <Star selected={props.rate > 2} onClick={()=>{props.onClick(3)}} />
            <Star selected={props.rate > 3} onClick={()=>{props.onClick(4)}} />
            <Star selected={props.rate > 4} onClick={()=>{props.onClick(5)}} />
        </div>
    )

}
type StarPropsType = {
    selected:boolean
    onClick:()=>void

}

function Star(props: StarPropsType) {



    return(

        <span onClick={()=>{props.onClick()}}> {props.selected === true ? <b>★ </b> : "☆ "}  </span>
    )
}

