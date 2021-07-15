import {useDispatch, useSelector} from 'react-redux';

import {useMemo} from 'react';
import {AppStoreType} from '../../../../n1-main/m2-bll/store';
import {changeCardSearchParamsAC, GetCardsThunk} from '../../../../n1-main/m2-bll/cards-reducer';
import SuperSelect from '../../../../n1-main/m1-ui/Common/Select/SuperSelect';


export const CardsPageCountSelect = () => {
    //state
    const dispatch = useDispatch();
    const pageCount = useSelector<AppStoreType, number>(state => state.cards.pageCount);
    const pack_id = useSelector<AppStoreType, string>(state => state.cards.pack._id);


    const pageCountValues = useMemo(() => {
        return [7, 10, 15, 20];
    }, [])

    //functions

    const onPageChange = (value: string) => {
        dispatch(changeCardSearchParamsAC({pageCount: Number(value)}));
        dispatch(GetCardsThunk(pack_id));
    }

    return (
        <div>
            Show <SuperSelect value={pageCount}
                         options={pageCountValues}
                         onChangeOption={onPageChange}/> Cards per Page
        </div>
    )
}

