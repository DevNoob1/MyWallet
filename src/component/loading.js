import React from 'react';
import '../style/loading.css'

const Loading = () => {
    return (
        <div className="loading">
            <svg width="100%" height="100%">
                <text x="50%" y="60%" textAnchor="middle" style={{ fontSize: '150px', fontWeight: 'bolder' }}>
                    My Wallet
                </text>
            </svg>        </div>
    );
};

export default Loading;
