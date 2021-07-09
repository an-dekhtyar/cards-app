import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {changeSearchParams, GETCardsPackTC} from '../../../n1-main/m2-bll/search-reducer';
import {DoubleRange} from '../../../n1-main/m1-ui/Common/DoubleRange/SuperDoubleRange';


export const SearchDoubleRange = () => {
    //state
    const dispatch = useDispatch();
    const min = useSelector<AppStoreType, number>(state => state.search.minCardsCount);
    const max = useSelector<AppStoreType, number>(state => state.search.maxCardsCount);
    const val1 = useSelector<AppStoreType, number>(state => state.search.curMin);
    const val2 = useSelector<AppStoreType, number>(state => state.search.curMax);

    //functions

    const doubleRangeChange = (values: number[]) => {
        dispatch(changeSearchParams({curMin: values[0], curMax: values[1]}))
        dispatch(GETCardsPackTC((value) => {
        }));
    }


    return (
        <div>
            <DoubleRange min={min}
                         max={max}
                         value={[val1, val2]}
                         onChangeRange={doubleRangeChange}/>
        </div>
    )
}