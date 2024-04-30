import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import '../style/buttonStyles.css'; // Import the CSS file for button styles

const Overview = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [spendingData, setSpendingData] = useState([]);
    const [goalData, setGoalData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const incomeResult = await supabase.from('income').select('source, amount');
                setIncomeData(incomeResult.data || []);

                const spendingResult = await supabase.from('spending').select('category, amount');
                setSpendingData(spendingResult.data || []);

                const goalResult = await supabase.from('goal').select('goal, amount');
                setGoalData(goalResult.data || []);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ padding: '50px', fontFamily: 'Arial', display: 'flex' }}>
            <Link to="/" className="custom-button1" style={{ marginBottom: '20px', top: '-50px', left: '10px' }}>
                ↩
            </Link>

            <div className="fade-in" style={{ display: 'flex', marginTop: '50px', flexDirection: 'column', width: '50%  ' }}>
                <div style={{ marginRight: '20px', flex: '1', marginTop: '-50px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Income Table</h2>
                    <table className="fade-in active" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px', color: 'black', backgroundColor: '#444', borderRadius: '8px', padding: '15px' }}>
                        <thead style={{ backgroundColor: '#555', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Source</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomeData.map((item, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#555' : '#444' }}>
                                    <td style={{ padding: '15px', textAlign: 'left', color: 'white' }}>{item.source}</td>
                                    <td style={{ padding: '15px', textAlign: 'left', color: 'white' }}>{item.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="fade-in" style={{ flex: '1', width: '96%', marginTop: '40px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Spending Table</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px', color: 'black', backgroundColor: '#444', borderRadius: '8px', padding: '15px' }}>
                        <thead style={{ backgroundColor: '#555', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Category</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {spendingData.map((item, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#555' : '#444' }}>
                                    <td style={{ padding: '15px', textAlign: 'left', color: 'white' }}>{item.category}</td>
                                    <td style={{ padding: '15px', textAlign: 'left', color: 'white' }}>{item.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="fade-in" style={{ flex: '1' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Spending Table</h2>
                <table className="fade-in active" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px', color: 'black', backgroundColor: '#444', borderRadius: '8px', padding: '15px' }}>
                    <thead style={{ backgroundColor: '#555', color: 'white' }}>
                        <tr>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Goal</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {goalData.map((item, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#555' : '#444' }}>
                                <td style={{ padding: '15px', textAlign: 'left', color: 'white' }}>{item.goal}</td>
                                <td style={{ padding: '15px', textAlign: 'left', color: 'white' }}>{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Overview;
