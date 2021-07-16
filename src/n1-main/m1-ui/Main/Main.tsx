import React, {useEffect} from 'react';
import {Header} from '../Header/Header';
import {Routes} from '../Routes/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../m2-bll/store';
import {Preloader} from '../Common/Preloader/Preloader';
import {initializeApp} from '../../m2-bll/app-reducer';


export const Main = () => {

    const dispatch = useDispatch()
    const isInitialized = useSelector<AppStoreType, boolean>(state => state.app.isInitialized)

    useEffect(() => {
        if (!isInitialized) dispatch(initializeApp())
    }, [dispatch])

    if (!isInitialized) return <Preloader/>

    return <div>
        {/*<Header/>*/}

        <Routes/>
    </div>
};

