import SuperInputText from '../../../n1-main/m1-ui/Common/Input/Input';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {ApiCardsPack} from '../../../API/ApiCardsPack';
import {changeSearchParams} from '../../../n1-main/m2-bll/search-reducer';


export const Search = () => {
    const dispatch = useDispatch();
    const packName = useSelector<AppStoreType, string>(state => state.search.packName);


    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearchParams({packName: e.currentTarget.value}));
    }
    const onButtonClick = () => {
        ApiCardsPack.GETCardsPack({packName})
            .then(res => console.log(res.data));
    }

    return (
        <div>
            <SuperInputText value={packName}
                            placeholder={'Search...'}
                            onChange={onInputChange}/>

            <Button onClick={onButtonClick}>
                Search
            </Button>
        </div>
    )
}