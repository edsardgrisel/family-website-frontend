import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/calendar`);
                setEvents(response.data.events);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleSelectSlot = async ({ start, end }) => {
        const title = window.prompt('New Event name');
        if (title) {
            const newEvent = { title, start, end };
            setEvents([...events, newEvent]);

            // Call the API to add the event to the database
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/calendar/add`, newEvent);
                console.log('Event added:', response.data);
            } catch (error) {
                console.error('Error adding event:', error);
            }
        }
    };

    const handleSelectEvent = async (event) => {
        const confirmDelete = window.confirm(`Do you want to delete the event '${event.title}'?`);
        if (confirmDelete) {
            try {
                await axios.delete(`${process.env.REACT_APP_SERVER_URL}/calendar/${event._id}`);
                setEvents(events.filter(e => e._id !== event._id));
                console.log('Event deleted');
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    return (
        <div style={{ height: '100vh' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                style={{ height: '100vh' }}
            />
        </div>
    );
};

export default CalendarPage;