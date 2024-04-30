import React, { useState } from 'react';
import '../style/input.css';
import { Link } from 'react-router-dom';
import Over from './over.js'

import IncomeForm from './IncomeForm.js';
import ExpenseForm from './ExpenseForm.js';

const Input = () => {
    const [choice, setChoice] = useState('income');

    const handleChoice = (chosen) => {
        setChoice(chosen);
    };

    return (
        <div className="input-container">
            <Link to="/" className="custom-button1" style={{ marginBottom: '20px', top: '-50px', left: '10px' }}>
                ↩
            </Link>
            <div className="sidebar">
                <h2>Please Choose:</h2>
                <button className={choice === 'income' ? 'active' : ''} onClick={() => handleChoice('income')}>Income</button>
                <button className={choice === 'expenses' ? 'active' : ''} onClick={() => handleChoice('expenses')}>Expenses</button>
            </div>
            <div className="form-container">
                {choice === 'income' ? <IncomeForm /> : <ExpenseForm />}
            </div>
        </div>
    );
};

export default Input;
