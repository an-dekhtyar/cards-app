import SuperInputText from '../../../n1-main/m1-ui/Common/Input/Input';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {changeSearchParams, GETCardsPackTC} from '../../../n1-main/m2-bll/search-reducer';
import {DoubleRange} from '../../../n1-main/m1-ui/Common/DoubleRange/SuperDoubleRange';
import {SearchSortButton} from './SearchSortButton';


export const Search = () => {
    //state
    const dispatch = useDispatch();
    const packName = useSelector<AppStoreType, string>(state => state.search.packName);
    const min = useSelector<AppStoreType, number>(state => state.search.minCardsCount);
    const max = useSelector<AppStoreType, number>(state => state.search.maxCardsCount);
    const val1 = useSelector<AppStoreType, number>(state => state.search.curMin);
    const val2 = useSelector<AppStoreType, number>(state => state.search.curMax);

    //functions
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearchParams({packName: e.currentTarget.value}));
    }
    const onButtonClick = () => {
        dispatch(GETCardsPackTC((value) => {
        }))
    }
    const doubleRangeChange = (values: number[]) =>{
        dispatch(changeSearchParams({curMin: values[0], curMax: values[1]}))
    }

    return (
        <div>
            <SuperInputText value={packName}
                            placeholder={'Search...'}
                            onChange={onInputChange}/>
            <DoubleRange min={min}
                         max={max}
                         value={[val1, val2]}
                onChangeRange={doubleRangeChange}/>
            <Button onClick={onButtonClick}>
                Search
            </Button>
            <SearchSortButton/>
        </div>
    )
}