import {useDispatch, useSelector} from 'react-redux';
import {Paginator} from '../../../n1-main/m1-ui/Common/Paginator/Paginator';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {changeSearchParams, GetPacksTC} from '../../../n1-main/m2-bll/packs-reducer';


export const SearchPaginator = () => {
    //state
    const dispatch = useDispatch()
    const page = useSelector<AppStoreType, number>(state => state.packs.page);
    const cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.packs.cardPacksTotalCount);
    const pageSize = useSelector<AppStoreType, number>(state => state.packs.pageCount);

    //functions
    const onPageChanged = (page: number) => {
        dispatch(changeSearchParams({page}))
        dispatch(GetPacksTC(false))
    }

    return(
        <Paginator currentItem={page}
                   itemCount={cardPacksTotalCount}
                   portionSize={pageSize}
                   onPageChanged={onPageChanged}/>
    )

}