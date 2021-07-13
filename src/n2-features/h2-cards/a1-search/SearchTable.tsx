import React, {useEffect} from 'react';
import {Search} from './Search';
import {changeSearchParams, GETCardsPackTC} from '../../../n1-main/m2-bll/search-reducer';
import {useDispatch} from 'react-redux';
import {SearchTablePacks} from './SearchTablePacks';
import {SearchPaginator} from './SearchPaginator';
import {SearchDoubleRange} from './SearchDoubleRange';
import { Packs } from '../../h1-auth/a3-profile/Packs';


export const SearchTable = () => {
    //state
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(changeSearchParams({user_id: undefined}))
        dispatch(GETCardsPackTC(true, {pageCount: 10}));
    }, [])


    return (
        <div>
            <Search/>
            <SearchDoubleRange/>
            <SearchTablePacks/>
            <Packs/>
            <SearchPaginator/>
        </div>
    )
}