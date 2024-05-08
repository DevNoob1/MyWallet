import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import '../style/buttonStyles.css'; // Import the CSS file for button styles
import an from '../original-b4ba3ed029641da816ebb-unscreen.gif'
import and from '../original-82ac5887215a4314ef6f4e9ae71085bd-removebg.png'

const Overview = () => {


    return (
        <div style={{ padding: '50px', fontFamily: 'Arial' }}>
            <img src={and} alt="" style={{ height: '400px' }} />
            <br />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '200px' }}>
                <div style={{ width: '60%' }}>
                    <div className="summary" style={{ fontSize: '24px', lineHeight: '1.5', textAlign: 'left' }}>
                        <p>
                            Welcome to <b>My Wallet</b>, a personal finance management application designed to help you track your income, expenses, and financial goals.
                        </p><br />
                        <p><b>Tech Stack:</b> React, Supabase, Chart.js, CSS</p><br />
                        <p>~ Ayush Kumar Rai</p>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '40%' }}>
                    <Link to="/profile" className="custom-button" style={{ marginBottom: '20px' }}>
                        Go to Profile
                    </Link>
                    <Link to="/input" className="custom-button">
                        Input
                    </Link>
                    <Link to="/reminder" className="custom-button">
                        Bills
                    </Link>
                    <Link to="/table" className="custom-button" style={{ marginBottom: '20px' }}>
                        Tables
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Overview;
