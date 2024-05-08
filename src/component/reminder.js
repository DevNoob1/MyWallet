import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import '../style/reminder.css';

const Reminder = () => {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const { data, error } = await supabase
                    .from('bill')
                    .select('id, title, description, due, status');

                if (error) {
                    throw error;
                }

                if (data) {
                    setReminders(data);
                }
            } catch (error) {
                console.error('Error fetching reminders:', error.message);
            }
        };

        fetchReminders();
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'rgba(69, 170, 96, 0.8)'; // Soft green with dark tint (translucent)
            case 'upcoming':
                return 'rgba(176, 96, 213, 0.8)'; // Purple with dark tint (translucent)
            case 'pending':
                return 'rgba(217, 83, 79, 0.8)'; // Red with dark tint (translucent)
            default:
                return 'rgba(153, 153, 153, 0.8)'; // Default color with dark tint (translucent)
        }
    };

    const handleMarkAsCompleted = async (id) => {
        try {
            const { error } = await supabase
                .from('bill')
                .update({ status: 'completed' })
                .eq('id', id);

            if (error) {
                throw error;
            }

            // Update the local reminders state after successful update
            const updatedReminders = reminders.map((reminder) =>
                reminder.id === id ? { ...reminder, status: 'Completed' } : reminder
            );
            setReminders(updatedReminders);
        } catch (error) {
            console.error('Error marking reminder as completed:', error.message);
        }
    };

    // Calculate counts for each status
    const counts = reminders.reduce(
        (acc, reminder) => {
            acc[reminder.status.toLowerCase()]++;
            return acc;
        },
        { completed: 0, upcoming: 0, pending: 0 }
    );

    const statusLabels = [
        { label: `Completed (${counts.completed})`, status: 'completed' },
        { label: `Upcoming (${counts.upcoming})`, status: 'upcoming' },
        { label: `Pending (${counts.pending})`, status: 'pending' }
    ];

    return (
        <div className="ag-format-container">
            <Link to="/" className="custom-button1" style={{ marginBottom: '20px', top: '-50px', left: '10px' }}>
                ↩
            </Link>
            <div className="status-container">
                {statusLabels.map((item, index) => (
                    <div key={index} className="status-label" style={{ backgroundColor: getStatusColor(item.status), color: '#fff', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', marginRight: '10px', marginBottom: '10px' }}>
                        {item.label}
                    </div>
                ))}
            </div>
            <div className="ag-courses_box">
                {reminders.map((reminder, index) => (
                    <div className="ag-courses_item" key={index}>
                        <a href="#" className="ag-courses-item_link">
                            <div className="ag-courses-item_bg" style={{ backgroundColor: getStatusColor(reminder.status) }}></div>
                            <div className="ag-courses-item_title" style={{ fontSize: '26px', fontWeight: 'bold', textAlign: 'left', marginBottom: '4px' }}>
                                {reminder.title}
                            </div>
                            <div className="ag-courses-item_description" style={{ fontSize: '18px', textAlign: 'left', marginBottom: '4px' }}>
                                {reminder.description}
                            </div>
                            <div className="ag-courses-item_date-box" style={{ fontSize: '18px', textAlign: 'left', marginBottom: '4px' }}>
                                <span style={{ fontWeight: 'bold' }}>Due Date:</span> {new Date(reminder.due).toLocaleDateString()}
                            </div>
                        </a>
                        {!reminder.status.toLowerCase().includes('completed') && ( // Render button only if status is not completed
                            <button style={{ marginLeft: '8px', marginTop: '10px', cursor: 'pointer', backgroundColor: '#6EBB69', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }} onClick={() => handleMarkAsCompleted(reminder.id)}>
                                Completed
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reminder;
