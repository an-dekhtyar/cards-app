import React from 'react';
import {Button} from "../../n1-main/m1-ui/Common/Button/Button";
import {Checkbox} from "../../n1-main/m1-ui/Common/Checkbox/Checkbox";
import {Input} from '../../n1-main/m1-ui/Common/Input/Input';
import {CardRating} from "../h2-cards/a2-cards-rating/CardsRating";
import {CardRating2} from "../h2-cards/a2-cards-rating/CardsRating";

export const Test = () => (
    <div>
        <h1>TEST PAGE</h1>
        <Button children={"Button"}/>
        <Input/>
        <Checkbox/>
        <CardRating rate={3.9}/>
        <CardRating2 rate={3.9}/>
    </div>
);

