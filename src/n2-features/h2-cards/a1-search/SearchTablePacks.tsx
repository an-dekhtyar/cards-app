import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {userType} from '../../h1-auth/a3-profile/Profile';
import st from './SearchTable.module.css';
import {SearchSortButton} from './SearchSortButton';

export const SearchTablePacks = () => {
    //state
    const dispatch = useDispatch();
    const cardPacks = useSelector<AppStoreType, Array<userType>>(state => state.search.cardPacks);

    const mappedCardPacks = cardPacks.map(pack => {
        return (
            <div className={st.row} key={pack._id}>
                <span>{pack.name}</span>
                <span>{pack.cardsCount}</span>
                <span>{pack.updated}</span>
                <span>{pack.user_name}</span>
            </div>
        )
    })

    return (
        <div>
            <div className={st.row}>
                <span>Name<SearchSortButton sortValueName={'name'}/></span>
                <span>Cards<SearchSortButton sortValueName={'cardsCount'}/></span>
                <span>Last Updated<SearchSortButton sortValueName={'updated'}/></span>
                <span>Created by<SearchSortButton sortValueName={'user_name'}/></span>
            </div>
            {mappedCardPacks}
        </div>
    )
}