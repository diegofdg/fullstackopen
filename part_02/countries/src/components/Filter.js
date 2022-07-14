import React from 'react';

const Filter = ({ newFilter, handleFilterChange, handleSearch }) => {
    return (
        <div>
            find countries
            <input
                value={newFilter}
                onChange={handleFilterChange}
            />
            <button
                onClick={handleSearch}
            >
                filter
            </button>
        </div>
    );
}
 
export default Filter;