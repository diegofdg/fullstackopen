import React from 'react';

const Filter = ({ newFilter, handleChangeFilter }) => {
    return (        
        <div>
            filter shown with 
            <input 
                value={newFilter} 
                onChange={handleChangeFilter} 
            />
        </div>
    );
}

export default Filter;