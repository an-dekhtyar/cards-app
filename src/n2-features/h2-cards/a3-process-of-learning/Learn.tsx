import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {useState} from 'react';
import SuperRadio from '../../../n1-main/m1-ui/Common/Radio/SuperRadio';


export const Learn = () => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [value, setValue] = useState<string>('Did not know')
    const options = ['Did not know', 'Forgot', 'A lot of thoughts', 'Confused', 'Knew the answer']

    const onShowAnswerButtonClick = () => {
        setShowAnswer(true);
    }
    const onOptionChange = (option: string) => {
        setValue(option);
    }
    return (
        <div>
            <h2>Learn 'PackName'</h2>
            <p>Question: bla bla</p>
            {
                showAnswer && <p>Answer: bla bla</p>}
            {showAnswer && <div>
                <SuperRadio value={value}
                            options={options}
                            onChangeOption={onOptionChange}/>
            </div>}
            <Button>Cancel</Button>
            {!showAnswer ?
                <Button onClick={onShowAnswerButtonClick}>Show Answer</Button>
                :
                <Button onClick={onShowAnswerButtonClick}>Next</Button>}
        </div>
    )
}