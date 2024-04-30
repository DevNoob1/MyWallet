import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { supabase } from '../config/supabaseClient'; // Import Supabase client

const AreaGraph = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('goal')
                    .select('month, goal, amount');

                if (error) {
                    throw error;
                }

                // Extracting data
                const labels = data.map(item => item.month);
                const goals = data.map(item => item.goal);
                const amounts = data.map(item => item.amount);

                // Chart configuration
                const chartConfig = {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Goal',
                                data: goals,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderWidth: 2,
                            },
                            {
                                label: 'Amount',
                                data: amounts,
                                borderColor: 'rgba(255, 99, 132, 1)',
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderWidth: 2,
                            }
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    color: 'white' // Set legend text color to white
                                }
                            },
                            title: {
                                display: true,
                                text: 'Monthly Goal vs Amount',
                                color: 'white' // Set title text color to white
                            },
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: 'white' // Set x-axis tick color to white
                                }
                            },
                            y: {
                                ticks: {
                                    color: 'white' // Set y-axis tick color to white
                                }
                            }
                        },
                    },
                };

                // Create chart instance
                const ctx = chartRef.current.getContext('2d');
                const chart = new Chart(ctx, chartConfig);

                // Store the chart instance in the ref
                chartRef.current.chart = chart;
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Financial Goals</h1> <br />
            <canvas ref={chartRef} style={{ background: 'black', color: 'white', padding: '20px' }} />
        </div>
    );
};

export default AreaGraph;
