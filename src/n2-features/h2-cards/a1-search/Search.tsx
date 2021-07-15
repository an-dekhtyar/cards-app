import {ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';

import {Input} from '../../../n1-main/m1-ui/Common/Input/Input';
import {changeSearchParams, GetPacksTC} from '../../../n1-main/m2-bll/packs-reducer';
import {ThunkAction} from 'redux-thunk';

type SearchPropsType = {
    getItems: () => void,
    getSearchParams: (value: string) => void
}


export const Search = () => {
    //state
    const dispatch = useDispatch();
    const packName = useSelector<AppStoreType, string>(state => state.packs.packName);


    //functions
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearchParams({packName: e.currentTarget.value}));
        dispatch(GetPacksTC(false))
    }

    return (
        <Input value={packName}
               placeholder={'Search...'}
               onChange={onInputChange}></Input>
    )
}