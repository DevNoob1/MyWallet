import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { supabase } from '../config/supabaseClient'; // Import Supabase client

const WebGraph = () => {
    const [sourceData, setSourceData] = useState([]);

    useEffect(() => {
        const fetchSourceData = async () => {
            try {
                const { data, error } = await supabase
                    .from('income')
                    .select('source, amount')
                    .order('amount', { ascending: false })
                    .limit(5); // Limit to the top 3 sources based on amount

                if (error) {
                    throw error;
                }

                if (data) {
                    setSourceData(data);
                }
            } catch (error) {
                console.error('Error fetching source data:', error.message);
            }
        };

        fetchSourceData();
    }, []);

    // Extract labels and data for the Doughnut chart
    const labels = sourceData.map(item => item.source);
    const dataValues = sourceData.map(item => item.amount);

    const data = {
        labels: labels, // Set labels to the source names
        datasets: [
            {
                label: 'Amount',
                data: dataValues, // Use amounts as data values
                backgroundColor: [
                    'rgba(139, 0, 0, 0.6)', // Red
                    'rgba(165, 42, 42, 0.6)', // Brown
                    'rgba(178, 34, 34, 0.6)', // Firebrick
                ],
                borderColor: [
                    'rgba(139, 0, 0, 1)',
                    'rgba(165, 42, 42, 1)',
                    'rgba(178, 34, 34, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{
            background: 'rgb(15, 15, 15)',
            borderRadius: '20px',
            width: '100%',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2%',
            marginTop: '200px'
        }}>
            <Doughnut data={data} />
        </div>
    );
};

export default WebGraph;
