import React, {useEffect} from 'react';
import {Search} from './Search';
import {useDispatch} from 'react-redux';
import {SearchPaginator} from './SearchPaginator';
import {SearchDoubleRange} from './SearchDoubleRange';
import {Packs} from '../../h1-auth/a3-profile/Packs';
import {changeSearchParams, GetPacksTC} from '../../../n1-main/m2-bll/packs-reducer';
import {MyAllToggle} from './MyAllToggle';
import {PageCountSelect} from './PageCountSelect';
import st from './SearchTable.module.css';
import {SearchTableHeader} from './SearchTableHeader';

export const SearchTable = () => {
    //state
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(changeSearchParams({user_id: undefined}))
        dispatch(GetPacksTC(true));
    }, [])


    return (
        <div className={st.container}>
            <div className={st.leftSection}>
                <MyAllToggle/>
                <SearchDoubleRange/>
            </div>
            <div className={st.rightSection}>
                <h2>Packs List</h2>
                <Search/>
                <SearchTableHeader/>
                <Packs/>
                <div className={st.pagination}>
                    <SearchPaginator/>
                    <PageCountSelect/>
                </div>
            </div>
        </div>
    )
}