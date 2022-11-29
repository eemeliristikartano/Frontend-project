import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import { API_URL } from '../constants';
import dayjs from 'dayjs';


export default function CalendarPage(props) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const response = await fetch(API_URL + 'gettrainings');
                const data = await response.json();
                setEvents(data);
            } catch (error) {

            }

        }
        getEvents();
    }, [props])


    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView='dayGridMonth'
                headerToolbar={{ center: 'dayGridMonth,timeGridWeek,timeGridDay' }}
                height='auto'
                timeZone='local'
                nowIndicator={true}
                firstDay={1}
                timeZoneParam='fi'
                eventTimeFormat={
                    {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }}
                views={{
                    timeGrid: {
                        dayHeaderContent: (args) => {
                            return dayjs(args.date).format('DD.MM') //Formats date in columns header.
                        },
                        slotLabelFormat: [
                            {
                                hour12: false,
                                hour: '2-digit',
                            }
                        ]
                    }

                }}
                //Events to calendar.
                events={events.map((event) => {
                    return ({
                        title: event.customer != null ? `${event.activity} / ${event.customer.firstname} ${event.customer.lastname}` : '',
                        start: event.date != null ? dayjs(event.date.substring(0, 23)).toISOString() : '',
                        end: event.date != null ? dayjs(event.date.substring(0, 23)).add(event.duration, 'minute').toISOString() : ''
                    })

                })}

            />



        </>
    );
}