
// Astronomy events data
const astronomyEvents = {
    '2024-03-06': [
        {
            title: 'Venus at Greatest Western Elongation',
            time: '04:00 UTC',
            description: 'Best time to view Venus in the morning sky',
            category: 'planetary',
            location: 'Worldwide'
        }
    ],
    '2024-03-09': [
        {
            title: 'New Moon',
            time: '09:00 UTC',
            description: 'Perfect night for deep sky observation',
            category: 'lunar',
            location: 'Worldwide'
        }
    ],
    '2024-03-14': [
        {
            title: 'Pi Day Meteor Shower',
            time: '23:59 UTC',
            description: 'Annual meteor shower with up to 20 meteors per hour',
            category: 'meteor',
            location: 'Northern Hemisphere'
        }
    ],
    '2024-03-20': [
        {
            title: 'March Equinox',
            time: '03:06 UTC',
            description: 'Equal day and night. Beginning of spring in Northern Hemisphere',
            category: 'seasonal',
            location: 'Worldwide'
        }
    ],
    '2024-03-25': [
        {
            title: 'Full Moon',
            time: '07:00 UTC',
            description: 'Worm Moon - Traditional name for March full moon',
            category: 'lunar',
            location: 'Worldwide'
        },
        {
            title: 'Penumbral Lunar Eclipse',
            time: '07:12 UTC',
            description: 'Subtle lunar eclipse visible from parts of Americas',
            category: 'eclipse',
            location: 'Americas'
        }
    ]
};

// Calendar functionality
document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.querySelector('.calendar-grid');
    const selectedEvents = document.querySelector('.selected-events');
    const currentMonth = new Date();
    
    function generateCalendar(date) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const startingDay = firstDay.getDay();
        
        // Clear existing calendar days
        while (calendar.children.length > 7) { // Keep the header row
            calendar.removeChild(calendar.lastChild);
        }
        
        // Add empty cells for days before the first of the month
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendar.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            // Add event indicator if events exist for this date
            if (astronomyEvents[dateString]) {
                dayElement.classList.add('has-event');
                const eventDot = document.createElement('span');
                eventDot.className = 'event-dot';
                dayElement.appendChild(eventDot);
            }
            
            // Add click event
            dayElement.addEventListener('click', () => showEvents(dateString));
            
            calendar.appendChild(dayElement);
        }
    }
    
    function showEvents(dateString) {
        const events = astronomyEvents[dateString] || [];
        
        if (events.length === 0) {
            selectedEvents.innerHTML = `
                <h3>Selected Date Events</h3>
                <p class="no-events">No events scheduled for this date</p>
            `;
            return;
        }
        
        const eventsHTML = events.map(event => `
            <div class="event-card">
                <div class="event-header">
                    <h4>${event.title}</h4>
                    <span class="event-time">${event.time}</span>
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-footer">
                    <span class="category-tag">${event.category}</span>
                    <span class="location-tag">${event.location}</span>
                </div>
            </div>
        `).join('');
        
        selectedEvents.innerHTML = `
            <h3>Selected Date Events</h3>
            ${eventsHTML}
        `;
    }
    
    // Initialize calendar
    generateCalendar(currentMonth);
    
    // Add navigation functionality
    document.querySelector('.nav-btn.prev').addEventListener('click', () => {
        currentMonth.setMonth(currentMonth.getMonth() - 1);
        generateCalendar(currentMonth);
    });
    
    document.querySelector('.nav-btn.next').addEventListener('click', () => {
        currentMonth.setMonth(currentMonth.getMonth() + 1);
        generateCalendar(currentMonth);
    });
});
