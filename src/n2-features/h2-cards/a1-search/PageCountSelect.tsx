import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../../n1-main/m2-bll/store';
import {changeSearchParams, GetPacksTC} from '../../../n1-main/m2-bll/packs-reducer';
import SuperSelect from '../../../n1-main/m1-ui/Common/Select/SuperSelect';
import {useMemo} from 'react';


export const PageCountSelect = () => {
    //state
    const dispatch = useDispatch();
    const pageCount = useSelector<AppStoreType, number>(state => state.packs.pageCount);


    const pageCountValues = useMemo(() => {
        return [7, 10, 15, 20];
    }, [])

    //functions

    const onPageChange = (value: string) => {
        dispatch(changeSearchParams({pageCount: Number(value)}));
        dispatch(GetPacksTC(false));
    }

    return (
        <div>
            Show <SuperSelect value={pageCount}
                         options={pageCountValues}
                         onChangeOption={onPageChange}/> Packs per Page
        </div>
    )
}

