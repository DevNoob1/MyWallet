import React, { useState } from 'react';
import { supabase } from '../config/supabaseClient'; // Import Supabase client
import '../style/spending.css';

const ExpenseInput = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState(["Food", "Travel", "Rent"]); // Initial categories list, you can modify as needed

    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory);
        // Filter out the selected category from the categories list
        const filteredCategories = categories.filter(cat => cat !== selectedCategory);
        setCategories(filteredCategories);
    };

    const handleAddCategory = () => {
        const newCategory = prompt('Enter new category:');
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setCategory(newCategory);
        }
    };

    const handleSubmit = async () => {
        try {
            // Check if amount, category, and date are not empty
            if (!amount || !category || !date) {
                console.error('Please fill in all fields');
                return;
            }

            const { data, error } = await supabase
                .from('spending')
                .insert([
                    { amount: parseFloat(amount), category, date }
                ]);

            if (error) {
                throw error;
            }

            console.log('Expense added:', data);
            // Reset form
            setAmount('');
            setDescription('');
            setCategory('');
            setDate('');
        } catch (error) {
            console.error('Error adding expense:', error.message);
        }
    };

    return (
        <div className="expense-form">
            <label htmlFor="expense-amount" className="input-label">Enter Expense Amount:</label><br />
            <input type="number" id="expense-amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field" /><br />
            <label htmlFor="expense-description" className="input-label">Enter Description:</label><br />
            <input type="text" id="expense-description" value={description} onChange={(e) => setDescription(e.target.value)} className="input-field" /><br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <label className="input-label">Selected Category:</label><br />
                    <div>{category}</div><br />
                </div>
                <div>
                    <label style={{ textAlign: 'right' }} className="input-label">Select Category:</label><br />
                    <div className="category-container">
                        {categories.map((cat, index) => (
                            <div key={index} className="category-item" onClick={() => handleCategoryClick(cat)}>{cat}</div>
                        ))}
                        <div className="category-item add-category" onClick={handleAddCategory}>+</div>
                    </div>
                </div>
            </div>
            <label htmlFor="expense-date" className="input-label">Select Date:</label><br />
            <input type="date" id="expense-date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" /><br />
            <button onClick={handleSubmit} className="submit-button">Add Expense</button>
        </div>
    );
};

export default ExpenseInput;
