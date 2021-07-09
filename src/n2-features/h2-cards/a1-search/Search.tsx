import SuperInputText from '../../../n1-main/m1-ui/Common/Input/Input';
import {ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {changeSearchParams, GETCardsPackTC} from '../../../n1-main/m2-bll/search-reducer';


export const Search = () => {
    //state
    const dispatch = useDispatch();
    const packName = useSelector<AppStoreType, string>(state => state.search.packName);


    //functions
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearchParams({packName: e.currentTarget.value}));
        dispatch(GETCardsPackTC(false))
    }

    return (
        <SuperInputText value={packName}
                        placeholder={'Search...'}
                        onChange={onInputChange}/>
    )
}