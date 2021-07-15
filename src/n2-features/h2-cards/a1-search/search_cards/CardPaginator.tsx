import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../../n1-main/m2-bll/store';
import {Paginator} from '../../../../n1-main/m1-ui/Common/Paginator/Paginator';
import {changeCardSearchParamsAC, GetCardsThunk} from '../../../../n1-main/m2-bll/cards-reducer';


export const CardPaginator = () => {
    //state
    const dispatch = useDispatch()
    const page = useSelector<AppStoreType, number>(state => state.cards.page);
    const cardsTotalCount = useSelector<AppStoreType, number>(state => state.cards.pack.cardsCount);
    const pageSize = useSelector<AppStoreType, number>(state => state.cards.pageCount);
    const pack_id = useSelector<AppStoreType, string>(state => state.cards.pack._id);

    //functions
    const onPageChanged = (page: number) => {
        dispatch(changeCardSearchParamsAC({page}));
        dispatch(GetCardsThunk(pack_id));
    }

    return(
        <Paginator currentItem={page}
                   itemCount={cardsTotalCount}
                   portionSize={pageSize}
                   onPageChanged={onPageChanged}/>
    )

}