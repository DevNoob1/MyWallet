import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient'; // Import Supabase client
import '../style/linegraph.css'; // Import the CSS file
import Chart from 'chart.js/auto';

const LineGraph = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Expenses',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false,
                tension: 0.5,
                type: 'line', // Set type to line
                data: []
            },
            {
                label: 'Income',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
                tension: 0.5,
                type: 'bar', // Set type to bar
                data: []
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from 'income' table
                const { data: incomeData, error: incomeError } = await supabase
                    .from('income')
                    .select('*');

                if (incomeError) {
                    throw incomeError;
                }

                // Fetch data from 'spending' table
                const { data: spendingData, error: spendingError } = await supabase
                    .from('spending')
                    .select('*');

                if (spendingError) {
                    throw spendingError;
                }

                // Extracting data for the line graph (expenses)
                const labels = spendingData.map(item => item.date);
                const expenseAmounts = spendingData.map(item => item.amount);

                // Extracting data for the bar graph (income)
                const incomeAmounts = incomeData.map(item => item.amount);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            ...chartData.datasets[0],
                            data: expenseAmounts
                        },
                        {
                            ...chartData.datasets[1],
                            data: incomeAmounts
                        }
                    ]
                });

                // Draw chart
                drawChart(labels, expenseAmounts, incomeAmounts);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    const drawChart = (labels, expenseData, incomeData) => {
        const ctx = document.getElementById('myChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            ...chartData.datasets[0],
                            data: expenseData
                        },
                        {
                            ...chartData.datasets[1],
                            data: incomeData
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                        x: {
                            color: 'white' // Set x-axis label color to white
                        }
                    },
                    animation: {
                        duration: 500,
                        easing: 'linear'
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white' // Set legend label text color to white
                            }
                        }
                    }
                }

            });
        }
    };

    return (
        <div className="chart-container">
            <canvas id="myChart"></canvas>
        </div>
    );
};

export default LineGraph;
