import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {  
    const [ good, setGood ] = useState(0);
    const [ neutral, setNeutral ] = useState(0);
    const [ bad, setBad ] = useState(0);

    const goodClick = () => {          
        setGood(good + 1);
    };

    const neutralClick = () => {        
        setNeutral(neutral + 1);
    };

    const badClick = () => {        
        setBad(bad + 1);
    };

    const Header = ({ name }) => {
        return (
            <h1>
                {name}
            </h1>
        );
    }

    const Statistic = ({ text, value }) => {
        const valueFixed = value.toFixed(2);
        
        if (text === "average") {
            return (
                <tr>
                    <td>
                        {text}
                    </td>
                    <td>
                        {valueFixed}
                    </td>
                </tr>
            );
        }

        if (text === "positive") {
            return (
                <tr>
                    <td>
                        {text}
                    </td>
                    <td>
                        {valueFixed}%
                    </td>
                </tr>
            );
        }
    
        return (
            <tr>
                <td>
                    {text}
                </td>
                <td>
                    {value}
                </td>
            </tr>
        );
    }

    const Statistics = ({ good, neutral, bad }) => {
        if (good + bad + neutral === 0) {
            return (
                <div>
                    No feedback given
                </div>
            );
        }

        return (
            <div>
                <table>
                    <tbody>
                        <Statistic
                            text="good"
                            value={good}
                        />
                        <Statistic
                            text="neutral"
                            value={neutral}
                        />
                        <Statistic
                            text="bad"
                            value={bad}
                        />
                        <Statistic
                            text="all"
                            value={good + neutral + bad}
                        />
                        <Statistic
                            text="average"
                            value={(good * 1 + bad * - 1 ) / (good + neutral + bad)}
                        />
                        <Statistic
                            text="positive"
                            value={good * (100 / (good + neutral + bad))}
                        />
                    </tbody>
                </table>
            </div>
        );
    }

    const Button = ({ onClick, text }) => {
        return (
            <button
                onClick={onClick}
            >
                {text}
            </button>
        );
    }

    return (
        <div>
            <Header
                name='give feedback'
            />
            <Button
                onClick={goodClick}
                text='good'
            />
            <Button
                onClick={neutralClick}
                text='neutral'
            />
            <Button
                onClick={badClick}
                text='bad'
            />
            <Header
                name='statistics'
            />
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
            />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));