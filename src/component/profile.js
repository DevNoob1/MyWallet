import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient'; // Import Supabase client
import '../style/Profile.css';
import boy from '../2150793943-removebg-preview.png';
import { Link } from 'react-router-dom';

import Lineg from './linegraph'
import Web from './webgraph.js'
import Input from './input.js'

import Goal from './financialGoals.js'
import List from './list.js'

import India from '../icons8-india-96.png';

const Profile = () => {
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        const fetchIncomeData = async () => {
            try {
                const { data: incomeData, error: incomeError } = await supabase
                    .from('income')
                    .select('amount');

                if (incomeError) {
                    throw incomeError;
                }

                // Calculate total income by summing income amounts
                const totalIncomeAmount = incomeData.reduce((acc, curr) => acc + curr.amount, 0);
                setTotalIncome(totalIncomeAmount);
            } catch (error) {
                console.error('Error fetching income data:', error.message);
            }
        };

        const fetchExpensesData = async () => {
            try {
                const { data: expensesData, error: expensesError } = await supabase
                    .from('spending')
                    .select('amount');

                if (expensesError) {
                    throw expensesError;
                }

                // Calculate total expenses by summing expense amounts
                const totalExpensesAmount = expensesData.reduce((acc, curr) => acc + curr.amount, 0);
                setTotalExpenses(totalExpensesAmount);
            } catch (error) {
                console.error('Error fetching expenses data:', error.message);
            }
        };

        fetchIncomeData();
        fetchExpensesData();
    }, []);

    useEffect(() => {
        // Calculate total balance by subtracting total expenses from total income
        const balance = totalIncome - totalExpenses;
        setTotalBalance(balance);
    }, [totalIncome, totalExpenses]);

    return (
        <>
            <Link to="/" className="custom-button1" style={{ marginBottom: '20px', top: '-50px', left: '10px' }}>
                ↩
            </Link>
            <div className='profile'>

                <div className='card'>
                    <div className='left-side'>
                        <div className='image-container'>
                            <img src='https://storage.googleapis.com/pai-images/8a004d48ae3346ad9db349e63a6fc0e4.jpeg' alt="Profile" className="profile-image" />
                        </div>
                        <div className='details'>
                            <h2>Ayush Kumar Rai</h2> <br />
                            abcd@gmail.com <br /> <br />
                            21, Male
                            <p style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                            }}>India<img src={India} alt="" style={{ height: '20px', }} /></p>
                        </div>
                    </div>
                    <div className='right-side'>

                        <div className='styled-box'>
                            <p>Total Balance :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                ${totalBalance}</p> {/* Display total balance */}
                        </div>
                        <div className='styled-box'>
                            <p>Total Income :&nbsp;&nbsp;&nbsp;&nbsp;
                                ${totalIncome}</p> {/* Display total income */}
                        </div>
                        <div className='styled-box'>
                            <p>Total Expenses :
                                ${totalExpenses}</p> {/* Display total expenses */}
                        </div>
                    </div>
                </div>
                <div className="finance">
                    <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
                        <Lineg />


                    </div>
                    <div style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '50px', marginLeft: '-20px' }}>

                        <div style={{ marginTop: '-80px' }}>
                            <List />
                        </div>
                        <div style={{ marginTop: '-80px', marginRight: '150px' }}>
                            <Web />
                        </div>
                    </div>

                </div>
            </div>

            <div style={{ marginTop: '200px' }}>

                <Goal />
            </div>

        </>
    );
}

export default Profile;
