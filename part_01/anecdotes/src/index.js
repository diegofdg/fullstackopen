import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const Anecdote = ({ text, votesCount }) => {
    return (
        <div>
            <p>
                {text}
            </p>
            <p>
                has {votesCount} votes
            </p>
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

const App = () => {
    const [selected, setSelected] = useState(0);
    const [allVotes, setAllVotes] = useState(Array(6).fill(0));

    const handleAnecdoteClick = () => {
      const arrayIndex = Math.floor(Math.random() * anecdotes.length);
      setSelected(arrayIndex);
    }

    const handleVoteClick = () => {      
        const newAllVotes = [...allVotes];
        newAllVotes[selected] += 1;
        setAllVotes(newAllVotes);
    }

    return (
        <div>
            <Anecdote
                text={anecdotes[selected]}
                votesCount={allVotes[selected]} 
            />
            <Button 
                onClick={handleVoteClick} 
                text="Vote" 
            />
            <Button
                onClick={handleAnecdoteClick}
                text="Next anecdote"
            />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));