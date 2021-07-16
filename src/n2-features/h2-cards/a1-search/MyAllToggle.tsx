import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {changeSearchParams, GetPacksTC} from '../../../n1-main/m2-bll/packs-reducer';
import st from './MyAllToggle.module.css';

export const MyAllToggle = () => {
    //state
    const dispatch = useDispatch();
    const isMy = useSelector<AppStoreType, boolean>(state => !!state.packs.user_id);
    const userId = useSelector<AppStoreType, string | null>(state => state.profile._id)

    //functions

    const onMyClick = () => {
        if (userId) {
            dispatch(changeSearchParams({user_id: userId}));
        }
        dispatch(GetPacksTC(true));
    }

    const onAllClick = () => {
        dispatch(changeSearchParams({user_id: undefined}));
        dispatch(GetPacksTC(true));
    }

    const myClassName = `${isMy ? st.active : ''}`
    const allClassName = `${!isMy ? st.active : ''}`

    return (
        <div>
            <h2>Show packs</h2>
            <div className={st.container}>
            <span className={myClassName}
                  onClick={onMyClick}>My</span>
                <span className={allClassName}
                      onClick={onAllClick}>All</span>
            </div>
        </div>

    )
}




