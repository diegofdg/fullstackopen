import React from 'react';

const Notification = ({ errorMessage }) => {
    if (errorMessage === null) {
        return null;
    } else {
        return (
            <div className="error">
                {errorMessage}
            </div>
        );
    }
}

export default Notification;