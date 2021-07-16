import st from '../SearchTable.module.css';
import {CardSearchSortButton} from './CardSearchSortButton';
import {useSelector} from 'react-redux';
import {AppStoreType} from '../../../../n1-main/m2-bll/store';

export const CardSearchTableHeader = () => {
    //state
    const card_user_id = useSelector<AppStoreType, string>(state => state.cards.currentUserId);
    const user_id = useSelector<AppStoreType, string | null>(state => state.profile._id);
    const isMy = card_user_id === user_id;
    return (
        <div>
            <div className={st.row}>
                <span>Question<CardSearchSortButton sortValueName={'question'}/></span>
                <span>Answer<CardSearchSortButton sortValueName={'answer'}/></span>
                <span>Last Updated<CardSearchSortButton sortValueName={'updated'}/></span>
                <span>Grade<CardSearchSortButton sortValueName={'grade'}/></span>
                {isMy && <span>Actions</span>}
            </div>
        </div>
    )
}