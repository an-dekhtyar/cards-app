import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {DoubleRange} from '../../../n1-main/m1-ui/Common/DoubleRange/SuperDoubleRange';
import {changeSearchParams, GetPacksTC} from '../../../n1-main/m2-bll/packs-reducer';


export const SearchDoubleRange = () => {
    //state
    const dispatch = useDispatch();
    const min = useSelector<AppStoreType, number>(state => state.packs.minCardsCount);
    const max = useSelector<AppStoreType, number>(state => state.packs.maxCardsCount);
    const val1 = useSelector<AppStoreType, number>(state => state.packs.curMin);
    const val2 = useSelector<AppStoreType, number>(state => state.packs.curMax);

    //functions

    const doubleRangeChange = (values: number[]) => {
        dispatch(changeSearchParams({curMin: values[0], curMax: values[1]}))
        dispatch(GetPacksTC(false));
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