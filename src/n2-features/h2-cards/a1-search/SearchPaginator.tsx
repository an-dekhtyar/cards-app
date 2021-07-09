import {useDispatch, useSelector} from 'react-redux';
import {Paginator} from '../../../n1-main/m1-ui/Common/Paginator/Paginator';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {changeSearchParams} from '../../../n1-main/m2-bll/search-reducer';


export const SearchPaginator = () => {
    //state
    const dispatch = useDispatch()
    const page = useSelector<AppStoreType, number>(state => state.search.page);
    const pageCount = useSelector<AppStoreType, number>(state => state.search.pageCount);

    //functions
    const onPageChanged = (page: number) => {
        dispatch(changeSearchParams({page}))
    }

    return(
        <Paginator currentItem={page}
                   itemCount={pageCount}
                   portionSize={10}
                   onPageChanged={onPageChanged}/>
    )

}