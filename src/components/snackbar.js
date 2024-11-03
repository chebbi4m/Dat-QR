// Snackbar.js
import React from 'react';

const Snackbar = () => {
    return (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-700 text-center">
                Made with love by Mohamed Chebbi <span className="text-red-500">&hearts;</span>
            </p>
        </div>
    );
};

export default Snackbar;
