import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import '../style/list.css';

const WebGraph = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data, error } = await supabase
                    .from('spending')
                    .select('category, amount, image') // Include 'image' column in the select query
                    .order('amount', { ascending: false })
                    .limit(3);

                if (error) {
                    throw error;
                }

                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="web-graph-container" style={{ marginTop: '20px' }}>
            {categories.map((category, index) => (
                <div className="web-graph-card" key={index} style={{ display: 'flex', flexDirection: 'column', paddingTop: '20px', paddingLeft: '20px', paddingRight: '30px' }}>

                    {/* Render image if available */}
                    {category.image && (
                        <img src={category.image} alt={category.category} style={{ marginTop: '10px', maxWidth: '100%', height: 'auto' }} />
                    )} <br />
                    <b><p>Amount: ${category.amount}</p></b>
                </div>
            ))}
        </div>
    );
};

export default WebGraph;
