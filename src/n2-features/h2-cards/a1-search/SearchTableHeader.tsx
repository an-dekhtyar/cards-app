import st from './SearchTable.module.css';
import {SearchSortButton} from './SearchSortButton';

export const SearchTableHeader = () => {
    //state
    return (
        <div>
            <div className={st.row}>
                <span>Name<SearchSortButton sortValueName={'name'}/></span>
                <span>Cards<SearchSortButton sortValueName={'cardsCount'}/></span>
                <span>Last Updated<SearchSortButton sortValueName={'updated'}/></span>
                <span>Created by<SearchSortButton sortValueName={'user_name'}/></span>
            </div>
        </div>
    )
}