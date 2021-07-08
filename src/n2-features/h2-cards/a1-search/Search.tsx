import SuperInputText from '../../../n1-main/m1-ui/Common/Input/Input';
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {useState} from 'react';


export const Search = () => {

    const [searchText, setSearchText] = useState<string>('')

    const onButtonClick = () => {

    }

    return (
        <div>
            <SuperInputText value={searchText}
                            onChangeText={setSearchText}/>
            <Button onClick={onButtonClick}>
                Search
            </Button>
        </div>
    )
}