import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {changeSearchParams, GetPacksTC} from '../../../n1-main/m2-bll/packs-reducer';
import {DoubleRange} from '../../../n1-main/m1-ui/Common/DoubleRange/SuperDoubleRange';


export const MyAllToggle = () => {
    //state
    const dispatch = useDispatch();
    const isMy = useSelector<AppStoreType, boolean>(state=>!!state.packs.user_id);
    const userId = useSelector<AppStoreType, string | null>(state=>state.profile._id)

    //functions

    const onMyClick = () => {
        if(userId){
            dispatch(changeSearchParams({user_id: userId}));
        }
        dispatch(GetPacksTC(false));
    }

    const onAllClick = () => {
        dispatch(changeSearchParams({user_id: undefined}));
        dispatch(GetPacksTC(false));
    }

    return (
        <div>
            <span onClick={onMyClick}>My</span>
            <span onClick={onAllClick}>All</span>
        </div>
    )
}




