import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../../n1-main/m2-bll/store';
import {changeCardSearchParamsAC, GetCardsThunk} from '../../../../n1-main/m2-bll/cards-reducer';
import {SortButton} from '../../../../n1-main/m1-ui/Common/SortButton/SortButton';



export const SearchSortButton = ({sortValueName}: { sortValueName: string }) => {
    //state
    const dispatch = useDispatch()
    const packSort = useSelector<AppStoreType, string>(state => state.packs.sortPacks);
    const pack_id = useSelector<AppStoreType, string>(state => state.cards.pack._id);

    //functions

    const changePackSort = (sortValue: boolean) => {
        dispatch(changeCardSearchParamsAC({sortCards: sortValue ? `0${sortValueName}` : `1${sortValueName}`}))
        dispatch(GetCardsThunk(pack_id));
    }
    const active = packSort === `0${sortValueName}` || packSort ===`1${sortValueName}`;

    return (
        <SortButton sortValue={packSort === `0${sortValueName}`}
                    active={active}
                    changeSortValue={changePackSort}/>
    )
}