import {useDispatch, useSelector} from 'react-redux';
import {Paginator} from '../../../n1-main/m1-ui/Common/Paginator/Paginator';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {changeSearchParams, GETCardsPackTC} from '../../../n1-main/m2-bll/search-reducer';


export const SearchPaginator = () => {
    //state
    const dispatch = useDispatch()
    const page = useSelector<AppStoreType, number>(state => state.search.page);
    const cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.search.cardPacksTotalCount);
    const pageSize = useSelector<AppStoreType, number>(state => state.search.pageCount);

    //functions
    const onPageChanged = (page: number) => {
        dispatch(changeSearchParams({page}))
        dispatch(GETCardsPackTC(false))
    }

    return(
        <Paginator currentItem={page}
                   itemCount={cardPacksTotalCount}
                   portionSize={pageSize}
                   onPageChanged={onPageChanged}/>
    )

}