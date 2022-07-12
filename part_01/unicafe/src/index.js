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

    const Statistic = ({ text, value }) => {        
      const valueFixed = value.toFixed(2);            
      
      if (text === "average") {
          return (
              <p>{text} {valueFixed}</p>
          );
      }
      if (text === "positive") {
          return (
              <p>{text} {valueFixed} %</p>
          );
      }        
  
      return (
          <p>{text} {value}</p>
      );
  }
  
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
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));