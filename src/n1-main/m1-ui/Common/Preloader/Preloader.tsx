import React from 'react';
import styles from './../../Users/Users.module.css'
import preloader from "../../../../assets/images/preloader.svg";

export const Preloader=()=>{
    return(
        <div >
            <img src={preloader}/>
        </div>
    )
}