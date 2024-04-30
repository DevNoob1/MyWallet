import React, { useState } from 'react';
import { supabase } from '../config/supabaseClient'; // Import Supabase client
import '../style/income.css';

const IncomeInput = () => {
    const [amount, setAmount] = useState('');
    const [source, setSource] = useState('');
    const [date, setDate] = useState('');
    const [newSource, setNewSource] = useState('');
    const [sources, setSources] = useState(["Source 1", "Source 2", "Source 3"]); // Initial sources list, you can modify as needed

    const handleSubmit = async () => {
        try {
            // Check if amount, source, and date are not empty
            if (!amount || !source || !date) {
                console.error('Please fill in all fields');
                return;
            }

            const { data, error } = await supabase
                .from('income')
                .insert([
                    { amount: parseFloat(amount), source, date }
                ]);

            if (error) {
                throw error;
            }

            console.log('Income added:', data);
            // Reset form
            setAmount('');
            setSource('');
            setDate('');
        } catch (error) {
            console.error('Error adding income:', error.message);
        }
    };

    const handleAddSource = () => {
        if (newSource.trim() !== '') {
            setSources([...sources, newSource]);
            setNewSource('');
        }
    };

    return (
        <div className="income-form">
            <label htmlFor="income-amount" className="input-label">Enter Income Amount:</label><br />
            <input type="number" id="income-amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field" /><br />
            <label htmlFor="income-source" className="input-label">Select Source:</label><br />
            <select id="income-source" value={source} onChange={(e) => setSource(e.target.value)} className="input-field">
                <option value="">-- Select --</option>
                {sources.map((src, index) => (
                    <option key={index} value={src}>{src}</option>
                ))}
            </select>
            <div className="new-source">
                <input type="text" value={newSource} onChange={(e) => setNewSource(e.target.value)} placeholder="Add New Source" className="input-field" />
                <button style={{
                    width: '50px'
                }} onClick={handleAddSource} className="add-source-button">+</button>
            </div>
            <label htmlFor="income-date" className="input-label">Select Date:</label><br />
            <input type="date" id="income-date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" /><br />
            <button onClick={handleSubmit} className="submit-button">Add Income</button>
        </div>
    );
};

export default IncomeInput;
