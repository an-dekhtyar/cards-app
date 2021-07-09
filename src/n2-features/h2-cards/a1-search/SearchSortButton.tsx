import {SortButton} from '../../../n1-main/m1-ui/Common/SortButton/SortButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {changeSearchParams} from '../../../n1-main/m2-bll/search-reducer';


export const SearchSortButton = () => {
    //state
    const dispatch = useDispatch()
    const packSort = useSelector<AppStoreType, number>(state => state.search.sortPacks);

    //functions

    const changePackSort = (sortValue: boolean) => {
        dispatch(changeSearchParams({sortPacks: sortValue ? 0 : 1}))
    }

    return (
        <SortButton sortValue={packSort === 0}
                    changeSortValue={changePackSort}/>
    )
}