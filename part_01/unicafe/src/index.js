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
  
    return (
        <div>
            <h1>give feedback</h1>
            <button
                text="good"
                onClick={goodClick}
            >good
            </button>
            <button
                text="neutral"
                onClick={neutralClick}
            >neutral
            </button>
            <button
                text="bad"
                onClick={badClick}
            >bad
            </button>
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));