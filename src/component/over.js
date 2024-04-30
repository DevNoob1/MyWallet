import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import '../style/buttonStyles.css'; // Import the CSS file for button styles

const Overview = () => {


    return (
        <div style={{ padding: '50px', fontFamily: 'Arial' }}>
            <div className="summary" style={{ marginTop: '50px', fontSize: '24px', lineHeight: '1.5', textAlign: 'left' }}>
                <p>
                    Welcome to My Wallet, a personal finance management application designed to help you track your income, expenses, and financial goals.
                </p>
                <p><b>Tech Stack:</b> React, Supabase, Chart.js, CSS</p>
                <p>~ Ayush Kumar Rai</p>
            </div><br /><br />
            <Link to="/profile" className="custom-button" style={{ marginBottom: '20px' }}>
                Go to Profile
            </Link> &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/table" className="custom-button" style={{ marginBottom: '20px' }}>
                Tables
            </Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/input" className="custom-button">
                Input
            </Link>
        </div>
    );
};

export default Overview;
