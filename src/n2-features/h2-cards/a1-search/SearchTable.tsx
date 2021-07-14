import React, {useEffect} from 'react';
import {Search} from './Search';
import {useDispatch} from 'react-redux';
import {SearchPaginator} from './SearchPaginator';
import {SearchDoubleRange} from './SearchDoubleRange';
import {Packs} from '../../h1-auth/a3-profile/Packs';
import {changeSearchParams, GetPacksTC} from '../../../n1-main/m2-bll/packs-reducer';
import {MyAllToggle} from './MyAllToggle';
import {PageCountSelect} from './PageCountSelect';


export const SearchTable = () => {
    //state
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(changeSearchParams({user_id: undefined}))
        dispatch(GetPacksTC(true, {pageCount: 10}));
    }, [])


    return (
        <div>
            <Search/>
            <SearchDoubleRange/>
            <MyAllToggle/>
            <Packs/>
            <SearchPaginator/>
            <PageCountSelect/>
        </div>
    )
}