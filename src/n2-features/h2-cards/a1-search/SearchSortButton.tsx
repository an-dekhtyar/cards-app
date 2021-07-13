import {SortButton} from '../../../n1-main/m1-ui/Common/SortButton/SortButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {changeSearchParams, GetPacksTC} from '../../../n1-main/m2-bll/packs-reducer';


export const SearchSortButton = ({sortValueName}: { sortValueName: string }) => {
    //state
    const dispatch = useDispatch()
    const packSort = useSelector<AppStoreType, string>(state => state.packs.sortPacks);

    //functions

    const changePackSort = (sortValue: boolean) => {
        dispatch(changeSearchParams({sortPacks: sortValue ? `0${sortValueName}` : `1${sortValueName}`}))
        dispatch(GetPacksTC(false));
    }
    const active = packSort === `0${sortValueName}` || packSort ===`1${sortValueName}`;

    return (
        <SortButton sortValue={packSort === `0${sortValueName}`}
                    active={active}
                    changeSortValue={changePackSort}/>
    )
}